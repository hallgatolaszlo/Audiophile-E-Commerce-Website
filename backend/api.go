package main

import (
	"database/sql"
	"log"
	"sort"
)

func getProducts() ([]Product, error) {
	query := `
	SELECT
		p.id,
		p.slug,
		p.name,
		p.name_medium,
		p.name_short,
		p.category,
		p.new,
		p.price,
		p.description,
		p.features,
		i.id,
		i.item,
		i.quantity,
		rp.id,
		rp.slug,
		rp.name,
		rp.name_medium,
		rp.name_short,
		rp.category,
		rp.new,
		rp.price,
		rp.description,
		rp.features
	FROM
		Products p
	LEFT JOIN IncludedJoins ij ON
		ij.product_id = p.id
	LEFT JOIN Included i ON
		i.id = ij.included_id
	LEFT JOIN ProductJoins pj ON
		pj.product1_id = p.id
	LEFT JOIN Products rp ON
		rp.id = pj.product2_id
	ORDER BY
		p.id;`

	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	return handleProductQuery(rows)
}

func getProductsByCategory(category string) ([]Product, error) {
	query := `
	SELECT
		p.id,
		p.slug,
		p.name,
		p.name_medium,
		p.name_short,
		p.category,
		p.new,
		p.price,
		p.description,
		p.features,
		i.id,
		i.item,
		i.quantity,
		rp.id,
		rp.slug,
		rp.name,
		rp.name_medium,
		rp.name_short,
		rp.category,
		rp.new,
		rp.price,
		rp.description,
		rp.features
	FROM
		Products p
	LEFT JOIN IncludedJoins ij ON
		ij.product_id = p.id
	LEFT JOIN Included i ON
		i.id = ij.included_id
	LEFT JOIN ProductJoins pj ON
		pj.product1_id = p.id
	LEFT JOIN Products rp ON
		rp.id = pj.product2_id
	WHERE p.category = ?
	ORDER BY
		p.id;
	`

	rows, err := db.Query(query, category)
	if err != nil {
		log.Fatal(err)
	}
	return handleProductQuery(rows)
}

func getProductBySlug(slug string) (*Product, error) {
	query := `
	SELECT
		p.id,
		p.slug,
		p.name,
		p.name_medium,
		p.name_short,
		p.category,
		p.new,
		p.price,
		p.description,
		p.features,
		i.id,
		i.item,
		i.quantity,
		rp.id,
		rp.slug,
		rp.name,
		rp.name_medium,
		rp.name_short,
		rp.category,
		rp.new,
		rp.price,
		rp.description,
		rp.features
	FROM
		Products p
	LEFT JOIN IncludedJoins ij ON
		ij.product_id = p.id
	LEFT JOIN Included i ON
		i.id = ij.included_id
	LEFT JOIN ProductJoins pj ON
		pj.product1_id = p.id
	LEFT JOIN Products rp ON
		rp.id = pj.product2_id
	WHERE  p.slug = ?
	ORDER BY
		p.id;
	`

	rows, err := db.Query(query, slug)
	if err != nil {
		log.Fatal(err)
	}
	results, err := handleProductQuery(rows)
	if err != nil {
		log.Fatal(err)
	}
	if len(results) == 1 {
		return &results[0], nil
	}
	return nil, sql.ErrNoRows
}

func handleProductQuery(rows *sql.Rows) ([]Product, error) {
	defer rows.Close()

	products := map[int]*Product{}

	for rows.Next() {
		var (
			pID, incID, rpID                                                                 sql.NullInt64
			slug, name, nameMedium, nameShort, category, description, features               string
			price                                                                            int
			new                                                                              bool
			incItem                                                                          sql.NullString
			incQty                                                                           sql.NullInt64
			rpSlug, rpName, rpNameMedium, rpNameShort, rpCategory, rpDescription, rpFeatures sql.NullString
			rpPrice                                                                          sql.NullInt64
			rpNew                                                                            sql.NullBool
		)

		err := rows.Scan(
			&pID, &slug, &name, &nameMedium, &nameShort, &category, &new, &price, &description, &features,
			&incID, &incItem, &incQty,
			&rpID, &rpSlug, &rpName, &rpNameMedium, &rpNameShort, &rpCategory, &rpNew, &rpPrice, &rpDescription, &rpFeatures,
		)
		if err != nil {
			log.Fatal(err)
		}

		p, exists := products[int(pID.Int64)]
		if !exists {
			p = &Product{
				ID:          int(pID.Int64),
				Slug:        slug,
				Name:        name,
				NameMedium:  nameMedium,
				NameShort:   nameShort,
				Category:    category,
				Description: description,
				Features:    features,
				Price:       price,
				New:         new,
				Included:    []IncludedItem{},
				Related:     []Product{},
			}
			products[p.ID] = p
		}

		if incID.Valid {
			exists := false
			for _, item := range p.Included {
				if item.ID == int(incID.Int64) {
					exists = true
					break
				}
			}
			if !exists {
				p.Included = append(p.Included, IncludedItem{
					ID:       int(incID.Int64),
					Item:     incItem.String,
					Quantity: int(incQty.Int64),
				})
			}
		}

		if rpID.Valid {
			exists := false
			for _, item := range p.Related {
				if item.ID == int(rpID.Int64) {
					exists = true
					break
				}
			}
			if !exists {
				p.Related = append(p.Related, Product{
					ID:          int(rpID.Int64),
					Slug:        rpSlug.String,
					Name:        rpName.String,
					NameMedium:  rpNameMedium.String,
					NameShort:   rpNameShort.String,
					Category:    rpCategory.String,
					Description: rpDescription.String,
					Features:    rpFeatures.String,
					Price:       int(rpPrice.Int64),
					New:         bool(rpNew.Bool),
				})
			}
		}

	}
	var result []Product
	for _, p := range products {
		result = append(result, *p)
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].ID < result[j].ID
	})

	return result, nil
}
