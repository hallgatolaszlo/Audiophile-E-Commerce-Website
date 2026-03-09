-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2026 at 04:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `audiophile`
--

-- --------------------------------------------------------

--
-- Table structure for table `included`
--

CREATE TABLE `included` (
  `id` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `item` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `included`
--

INSERT INTO `included` (`id`, `quantity`, `item`) VALUES
(1, 2, 'Earphone unit'),
(2, 6, 'Multi-size earplugs'),
(3, 1, 'User manual'),
(4, 1, 'USB-C charging cable'),
(5, 1, 'Travel pouch'),
(6, 1, 'Headphone unit'),
(7, 2, 'Replacement earcups'),
(8, 1, '3.5mm 5m audio cable'),
(9, 1, 'Travel bag'),
(10, 2, 'Speaker unit'),
(11, 2, 'Speaker cloth panel'),
(12, 1, '3.5mm 7.5m audio cable'),
(13, 1, '7.5m optical cable'),
(14, 1, '3.5mm 10m audio cable'),
(15, 1, '10m optical cable');

-- --------------------------------------------------------

--
-- Table structure for table `includedjoins`
--

CREATE TABLE `includedjoins` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `included_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `includedjoins`
--

INSERT INTO `includedjoins` (`product_id`, `included_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 3),
(2, 6),
(2, 7),
(2, 8),
(3, 3),
(3, 6),
(3, 7),
(3, 8),
(4, 3),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(5, 3),
(5, 10),
(5, 11),
(5, 12),
(5, 13),
(6, 3),
(6, 10),
(6, 11),
(6, 14),
(6, 15);

-- --------------------------------------------------------

--
-- Table structure for table `productjoins`
--

CREATE TABLE `productjoins` (
  `product1_id` int(10) UNSIGNED NOT NULL,
  `product2_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productjoins`
--

INSERT INTO `productjoins` (`product1_id`, `product2_id`) VALUES
(1, 2),
(1, 3),
(1, 6),
(2, 3),
(2, 4),
(2, 6),
(3, 2),
(3, 4),
(3, 6),
(4, 2),
(4, 3),
(4, 6),
(5, 2),
(5, 3),
(5, 6),
(6, 2),
(6, 3),
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `name`) VALUES
(1, 'yx1-earphones', 'YX1 Wireless Earphones'),
(2, 'xx59-headphones', 'XX59 Headphones'),
(3, 'xx99-mark-one-headphones', 'XX99 Mark I Headphones'),
(4, 'xx99-mark-two-headphones', 'XX99 Mark II Headphones'),
(5, 'zx7-speaker', 'ZX7 Speaker'),
(6, 'zx9-speaker', 'ZX9 Speaker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `included`
--
ALTER TABLE `included`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `includedjoins`
--
ALTER TABLE `includedjoins`
  ADD PRIMARY KEY (`product_id`,`included_id`),
  ADD KEY `includedjoins_included_id_foreign` (`included_id`);

--
-- Indexes for table `productjoins`
--
ALTER TABLE `productjoins`
  ADD PRIMARY KEY (`product1_id`,`product2_id`),
  ADD KEY `productjoins_product2_id_foreign` (`product2_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `included`
--
ALTER TABLE `included`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `includedjoins`
--
ALTER TABLE `includedjoins`
  ADD CONSTRAINT `includedjoins_included_id_foreign` FOREIGN KEY (`included_id`) REFERENCES `included` (`id`),
  ADD CONSTRAINT `includedjoins_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `productjoins`
--
ALTER TABLE `productjoins`
  ADD CONSTRAINT `productjoins_product1_id_foreign` FOREIGN KEY (`product1_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `productjoins_product2_id_foreign` FOREIGN KEY (`product2_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
