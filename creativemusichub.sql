-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2025 at 02:50 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creativemusichub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'admin', 'password123', 'admin@example.com', '2025-03-17 17:50:47');

-- --------------------------------------------------------

--
-- Table structure for table `biodata`
--

CREATE TABLE `biodata` (
  `id` int NOT NULL,
  `item_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int NOT NULL,
  `question_id` varchar(255) DEFAULT NULL,
  `answer_id` varchar(255) DEFAULT NULL,
  `question_en` varchar(255) DEFAULT NULL,
  `answer_en` text NOT NULL,
  `question_sd` varchar(255) DEFAULT NULL,
  `answer_sd` text,
  `status` enum('Published','Archived') DEFAULT 'Archived',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question_id`, `answer_id`, `question_en`, `answer_en`, `question_sd`, `answer_sd`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Apa itu CMH dan bagaimana cara kerjanya?', 'CreativeMusicHub (CMH) adalah platform untuk menciptakan musik dengan bantuan AI. Pengguna dapat mengunggah lirik, memilih genre, dan mendapatkan lagu yang dibuat secara otomatis.', 'What is CMH and how does it work?', 'CreativeMusicHub (CMH) is a platform for creating music with AI assistance. Users can upload lyrics, choose a genre, and get an automatically generated song.', 'Naon ari CMH sareng kumaha carana?', 'CreativeMusicHub (CMH) nyaéta platform pikeun nyieun musik ngagunakeun AI. Pangguna tiasa ngunggahkeun lirik, milih genre, sareng nampi lagu anu dijieun sacara otomatis.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(2, 'Apakah saya perlu keahlian musik untuk menggunakan CMH?', 'Tidak perlu! CMH dirancang untuk semua orang, baik pemula maupun profesional. Teknologi AI kami akan membantu dalam proses pembuatan musik.', 'Do I need musical skills to use CMH?', 'No, you don\'t! CMH is designed for everyone, from beginners to professionals. Our AI technology will assist in the music creation process.', 'Naha abdi peryogi kapinteran musik pikeun nganggo CMH?', 'Henteu peryogi! CMH dirarancang pikeun sadayana, ti nu nembe dugi ka profesional. Téknologi AI urang bakal ngabantosan dina prosés nyieun musik.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(3, 'Jenis musik apa saja yang bisa dibuat dengan CMH?', 'CMH mendukung berbagai genre musik seperti pop, rock, jazz, EDM, dan masih banyak lagi.', 'What types of music can be created with CMH?', 'CMH supports various music genres such as pop, rock, jazz, EDM, and many more.', 'Jenis musik naon waé anu tiasa dijieun ku CMH?', 'CMH ngadukung rupa-rupa genre musik sapertos pop, rock, jazz, EDM, sareng seueur deui.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(4, 'Bagaimana cara mengubah lirik menjadi lagu?', 'Anda hanya perlu mengunggah lirik, memilih genre, dan CMH akan secara otomatis menghasilkan musik yang sesuai dengan lirik tersebut.', 'How do I turn lyrics into a song?', 'Simply upload your lyrics, select a genre, and CMH will automatically generate music that matches the lyrics.', 'Naon cara nanggo lirik jadi lagu?', 'Sampeyan cuma perlu ngunggah lirik, milih genre, sareng CMH bakal nampi lagu anu sesuai karo lirik katon.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(5, 'Apakah saya bisa memilih genre musik tertentu?', 'Ya! CMH menyediakan berbagai pilihan genre musik yang dapat Anda pilih sesuai dengan preferensi Anda.', 'Can I choose a specific music genre?', 'Yes! CMH offers various genre options that you can choose based on your preference.', 'Naha abdi bisa milih genre musik?', 'Iya! CMH ngadukung rupa-rupa genre musik anu bisa dipilih katon kana preferensi sampeyan.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(6, 'Berapa lama waktu yang dibutuhkan untuk membuat musik?', 'Proses pembuatan musik biasanya memakan waktu beberapa menit, tergantung pada kompleksitas lirik dan pemilihan instrumen.', 'How long does it take to create music?', 'The music creation process usually takes a few minutes, depending on the complexity of the lyrics and instrument selection.', 'Naon waktu anu diperyogi pikeun nyieun musik?', 'Proses nyieun musik biasana ngarasakakeun waktu beberapa menit, tergantung kana kompleksitas lirik sareng pemilihan instrumen.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(7, 'Apakah musik yang dihasilkan bisa digunakan secara komersial?', 'Ya, musik yang dihasilkan melalui CMH bisa digunakan secara komersial. Namun, pastikan untuk membaca ketentuan penggunaan terlebih dahulu.', 'Can the generated music be used commercially?', 'Yes, music created through CMH can be used commercially. However, please review the terms of use first.', 'Naha musik anu dihasilkeun ku CMH bisa dipakekeun karo komersial?', 'Iya, musik anu dihasilkeun ku CMH bisa dipakekeun karo komersial. Tapi, pastikeun nanggo ketentuan penggunaan dina awal.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47'),
(8, 'Bagaimana jika saya mengalami masalah saat membuat musik?', 'Anda dapat menghubungi tim dukungan kami melalui email atau WhatsApp yang tersedia di halaman kontak.', 'What if I encounter issues while creating music?', 'You can contact our support team via email or WhatsApp, available on the contact page.', 'Naha abdi ngarasakakeun masalah nanggo nyieun musik?', 'Sampeyan bisa kontak tim dukungan kami ku email atawa WhatsApp, anu tersedia di halaman kontak.', 'Published', '2025-03-17 17:50:47', '2025-03-17 17:50:47');

-- --------------------------------------------------------

--
-- Table structure for table `footer`
--

CREATE TABLE `footer` (
  `id` int NOT NULL,
  `address_id` text,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `instagram_name` varchar(255) DEFAULT NULL,
  `instagram_link` varchar(255) DEFAULT NULL,
  `website_name` varchar(255) DEFAULT NULL,
  `website_link` varchar(255) DEFAULT NULL,
  `product1_name_id` varchar(255) DEFAULT NULL,
  `product1_link_id` varchar(255) DEFAULT NULL,
  `product2_name_id` varchar(255) DEFAULT NULL,
  `product2_link_id` varchar(255) DEFAULT NULL,
  `product3_name_id` varchar(255) DEFAULT NULL,
  `product3_link_id` varchar(255) DEFAULT NULL,
  `product4_name_id` varchar(255) DEFAULT NULL,
  `product4_link_id` varchar(255) DEFAULT NULL,
  `privacy_policy_id` varchar(255) DEFAULT NULL,
  `terms_of_use_id` varchar(255) DEFAULT NULL,
  `sitemap_id` varchar(255) DEFAULT NULL,
  `address_en` text,
  `product1_name_en` varchar(255) DEFAULT NULL,
  `product1_link_en` varchar(255) DEFAULT NULL,
  `product2_name_en` varchar(255) DEFAULT NULL,
  `product2_link_en` varchar(255) DEFAULT NULL,
  `product3_name_en` varchar(255) DEFAULT NULL,
  `product3_link_en` varchar(255) DEFAULT NULL,
  `product4_name_en` varchar(255) DEFAULT NULL,
  `product4_link_en` varchar(255) DEFAULT NULL,
  `privacy_policy_en` varchar(255) DEFAULT NULL,
  `terms_of_use_en` varchar(255) DEFAULT NULL,
  `sitemap_en` varchar(255) DEFAULT NULL,
  `address_sd` text,
  `product1_name_sd` varchar(255) DEFAULT NULL,
  `product1_link_sd` varchar(255) DEFAULT NULL,
  `product2_name_sd` varchar(255) DEFAULT NULL,
  `product2_link_sd` varchar(255) DEFAULT NULL,
  `product3_name_sd` varchar(255) DEFAULT NULL,
  `product3_link_sd` varchar(255) DEFAULT NULL,
  `product4_name_sd` varchar(255) DEFAULT NULL,
  `product4_link_sd` varchar(255) DEFAULT NULL,
  `privacy_policy_sd` varchar(255) DEFAULT NULL,
  `terms_of_use_sd` varchar(255) DEFAULT NULL,
  `sitemap_sd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `footer`
--

INSERT INTO `footer` (`id`, `address_id`, `phone`, `email`, `instagram_name`, `instagram_link`, `website_name`, `website_link`, `product1_name_id`, `product1_link_id`, `product2_name_id`, `product2_link_id`, `product3_name_id`, `product3_link_id`, `product4_name_id`, `product4_link_id`, `privacy_policy_id`, `terms_of_use_id`, `sitemap_id`, `address_en`, `product1_name_en`, `product1_link_en`, `product2_name_en`, `product2_link_en`, `product3_name_en`, `product3_link_en`, `product4_name_en`, `product4_link_en`, `privacy_policy_en`, `terms_of_use_en`, `sitemap_en`, `address_sd`, `product1_name_sd`, `product1_link_sd`, `product2_name_sd`, `product2_link_sd`, `product3_name_sd`, `product3_link_sd`, `product4_name_sd`, `product4_link_sd`, `privacy_policy_sd`, `terms_of_use_sd`, `sitemap_sd`) VALUES
(1, 'Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Kota Bandung, Jawa Barat 40286', '+62 822-9560-3115', 'yukmari2211@gmail.com', 'Instagram', 'https://www.instagram.com/yukmaridotcom', 'Website', 'https://www.yuk-mari.com/', 'Buat Musik melalui Lyric', '/musik-lyric', 'Buat Musik Instrumen', '/musik-instrument', 'Buat Sound Effect', '/sound-effect', 'Portofolio', '/portfolio', 'Kebijakan Privasi', 'Ketentuan Penggunaan', 'Peta Situs', 'Komplek Bandung Indah Raya, Block C13/No.17, Mekarjaya Village, Rancasari District, Bandung City, West Java 40286', 'Create Music through Lyrics', '/musik-lyric', 'Create Instrumental Music', '/musik-instrument', 'Create Sound Effects', '/sound-effect', 'Portfolio', '/portfolio', 'Privacy Policy', 'Terms of Use', 'Sitemap', 'Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Dayeuh Bandung, Jawa Kulon 40286', 'Nyieun Musik ti Lirik', '/musik-lyric', 'Nyieun Musik Instrumen', '/musik-instrument', 'Nyieun Efek Sora', '/sound-effect', 'Portofolio', '/portfolio', 'Kawijakan Privasi', 'Katangtuan Pamakean', 'Peta Situs');

-- --------------------------------------------------------

--
-- Table structure for table `headers`
--

CREATE TABLE `headers` (
  `id` int NOT NULL,
  `position` int DEFAULT NULL,
  `content_en` varchar(255) DEFAULT NULL,
  `content_id` varchar(255) DEFAULT NULL,
  `content_sd` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `headers`
--

INSERT INTO `headers` (`id`, `position`, `content_en`, `content_id`, `content_sd`, `path`, `parent_id`) VALUES
(1, 1, 'Home', 'Beranda', 'Utama', '/', NULL),
(2, 2, 'Product', 'Produk', NULL, '/product', NULL),
(3, 3, 'Support', 'Dukungan', NULL, '/support', NULL),
(4, 4, 'Portfolio', 'Portofolio', NULL, '/portfolio', NULL),
(5, 1, 'Create Music from Lyrics', 'Buat Musik melalui Lirik', NULL, '/musik-lyric', 2),
(6, 2, 'Create Instrumental Music', 'Buat Musik Instrumen', NULL, '/musik-instrument', 2),
(7, 3, 'Create Sound Effect', 'Buat Efek Suara', NULL, '/sound-effect', 2),
(8, 1, 'Contact Us', 'Hubungi Kami', NULL, '/support', 3),
(9, 2, 'Instagram', 'Instagram', NULL, 'https://www.instagram.com/yukmaridotcom', 3);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`) VALUES
(3, 'efek-suara'),
(2, 'instrumen'),
(1, 'lirik');

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `genre` enum('Accoustic','Dubstep','Jazz','Pop','Progressive','Sundanese') NOT NULL,
  `link` varchar(2083) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `name`, `genre`, `link`) VALUES
(1, 'Dapoer Catering SR', 'Accoustic', 'https://api.soundcloud.com/tracks/2046389160'),
(2, 'Goyobod Laris', 'Dubstep', 'https://api.soundcloud.com/tracks/2046389153'),
(3, 'Dimsum by Inmons Fix', 'Jazz', 'https://api.soundcloud.com/tracks/2046389164'),
(4, 'Bubuk Cabe Pa Abdul', 'Pop', 'https://api.soundcloud.com/tracks/2046390272'),
(5, 'Aku Baru', 'Progressive', 'https://api.soundcloud.com/tracks/2046389156'),
(6, 'Hudang Hese', 'Sundanese', 'https://api.soundcloud.com/tracks/2046389168');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int NOT NULL,
  `count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `count`) VALUES
(1, 47);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `biodata`
--
ALTER TABLE `biodata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer`
--
ALTER TABLE `footer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headers`
--
ALTER TABLE `headers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `biodata`
--
ALTER TABLE `biodata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `footer`
--
ALTER TABLE `footer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `headers`
--
ALTER TABLE `headers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `biodata`
--
ALTER TABLE `biodata`
  ADD CONSTRAINT `biodata_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
