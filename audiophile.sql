-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2026 at 10:41 AM
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
  `name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `features` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `name`, `category`, `new`, `price`, `description`, `features`) VALUES
(1, 'yx1-earphones', 'YX1 Wireless Earphones', 'earphones', 1, 599, 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.', 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\\n\\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.'),
(2, 'xx59-headphones', 'XX59 Headphones', 'headphones', 0, 899, 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.', 'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\\n\\nMore than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.'),
(3, 'xx99-mark-one-headphones', 'XX99 Mark I Headphones', 'headphones', 0, 1750, 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.', 'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.\\n\\nFrom the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is includes with a balanced gold connector.'),
(4, 'xx99-mark-two-headphones', 'XX99 Mark II Headphones', 'headphones', 1, 2999, 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.', 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.\\n\\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.'),
(5, 'zx7-speaker', 'ZX7 Speaker', 'speakers', 0, 3500, 'Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.', 'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\\n\\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.'),
(6, 'zx9-speaker', 'ZX9 Speaker', 'speakers', 1, 4500, 'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.', 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).\\n\\nDiscover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.');

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
