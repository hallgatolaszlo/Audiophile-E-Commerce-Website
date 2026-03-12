package main

import (
	"database/sql"
	"log"
	"sort"
)

func getProducts() ([]Product, error) {
	query := `
	SELECT 
		p.id, p.slug, p.name,
		i.id, i.item, i.quantity,
		rp.id, rp.slug, rp.name
	FROM Products p
	LEFT JOIN IncludedJoins ij ON ij.product_id = p.id
	LEFT JOIN Included i ON i.id = ij.included_id
	LEFT JOIN ProductJoins pj ON pj.product1_id = p.id
	LEFT JOIN Products rp ON rp.id = pj.product2_id
	ORDER BY p.id
	`

	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	products := map[int]*Product{}

	for rows.Next() {
		var (
			pID, incID, relID sql.NullInt64
			slug, name        string
			incItem           sql.NullString
			incQty            sql.NullInt64
			relSlug, relName  sql.NullString
		)

		err := rows.Scan(
			&pID, &slug, &name,
			&incID, &incItem, &incQty,
			&relID, &relSlug, &relName,
		)
		if err != nil {
			log.Fatal(err)
		}

		p, exists := products[int(pID.Int64)]
		if !exists {
			p = &Product{
				ID:   int(pID.Int64),
				Slug: slug,
				Name: name,
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

		if relID.Valid {
			exists := false
			for _, item := range p.Related {
				if item.ID == int(relID.Int64) {
					exists = true
					break
				}
			}
			if !exists {
				p.Related = append(p.Related, RelatedProduct{
					ID:   int(relID.Int64),
					Slug: relSlug.String,
					Name: relName.String,
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
