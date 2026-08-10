-- ============================================================
-- MHT-CET Engineering College Portal MySQL Database Dump for XAMPP
-- Import this SQL file into XAMPP phpMyAdmin (http://localhost/phpmyadmin)
-- Created By Vaibhav Dangle
-- ============================================================

CREATE DATABASE IF NOT EXISTS `college_portal_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `college_portal_db`;

-- ------------------------------------------------------------
-- Table structure for `colleges`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `colleges`;
CREATE TABLE `colleges` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `collage_name` VARCHAR(255) NOT NULL,
  `state` VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
  `district` VARCHAR(100) NOT NULL,
  `branch` VARCHAR(255) NOT NULL,
  `fees` INT NOT NULL,
  `ranking` INT NOT NULL,
  `address` TEXT NOT NULL,
  `placement` VARCHAR(255) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `merit_list_pdf` VARCHAR(255) DEFAULT 'college_merit_list.pdf',
  `university_type` ENUM('Government', 'Private', 'Semi-Government') DEFAULT 'Private',
  `is_autonomous` ENUM('Yes', 'No') DEFAULT 'Yes',
  `established_year` INT DEFAULT 2005,
  `accreditation` VARCHAR(100) DEFAULT 'NAAC Grade A',
  `highest_package` VARCHAR(100) DEFAULT '20.0 LPA',
  `average_package` VARCHAR(100) DEFAULT '5.5 LPA',
  `facilities` TEXT,
  `cutoff_general` FLOAT DEFAULT 88.5,
  `contact_email` VARCHAR(150),
  `contact_phone` VARCHAR(50),
  `website_url` VARCHAR(255),
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data for `colleges`
INSERT INTO `colleges` (`id`, `collage_name`, `state`, `district`, `branch`, `fees`, `ranking`, `address`, `placement`, `image`, `university_type`, `is_autonomous`, `established_year`, `accreditation`, `highest_package`, `average_package`, `cutoff_general`, `contact_email`, `contact_phone`, `website_url`, `description`) VALUES
(1, 'KK Wagh Institute of Engineering Education & Research', 'Maharashtra', 'Nashik', 'Computer Engineering', 90000, 1, 'Hirabai Haridas Vidyanagari, Amrutdham, Panchavati, Nashik, Maharashtra 422003', '92% Placed | Max 22.5 LPA | Avg 5.8 LPA', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', 'Private', 'Yes', 1984, 'NAAC Grade A+', '22.5 LPA', '5.8 LPA', 92.4, 'kkwieer@kkwagh.edu.in', '+91 253 2512876', 'https://kkwagh.edu.in', 'Premier autonomous engineering institute in North Maharashtra with state-of-the-art AI labs and strong industry tie-ups.'),
(2, 'MET Institute of Engineering', 'Maharashtra', 'Nashik', 'Information Technology', 85000, 2, 'Bhujbal Knowledge City, Adgaon, Nashik, Maharashtra 422003', '88% Placed | Max 18.0 LPA | Avg 5.2 LPA', 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1000', 'Private', 'Yes', 2006, 'NAAC Grade A', '18.0 LPA', '5.2 LPA', 89.1, 'principal_ioe@met.edu', '+91 253 2303515', 'https://metbhujbalknowledgecity.ac.in', 'Modern campus equipped with high-performance computing labs, incubation center, and vibrant student clubs.'),
(3, 'Government College of Engineering, Karad', 'Maharashtra', 'Satara', 'Computer Science & Engineering', 24000, 3, 'Vidyanagar, Karad, Satara, Maharashtra 415124', '95% Placed | Max 24.0 LPA | Avg 6.5 LPA', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', 'Government', 'Yes', 1960, 'NBA Accredited', '24.0 LPA', '6.5 LPA', 96.8, 'principal@gcekarad.ac.in', '+91 2164 271713', 'https://gcekarad.ac.in', 'Prestigious government autonomous college known for low fees, stellar placements, and top GATE results.'),
(4, 'NDMVP College of Engineering (KBTCOE)', 'Maharashtra', 'Nashik', 'Computer Engineering', 88000, 4, 'Udoji Maratha Boarding Campus, Gangapur Road, Nashik, Maharashtra 422013', '85% Placed | Max 16.0 LPA | Avg 4.8 LPA', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000', 'Private', 'No', 1999, 'NAAC Grade A', '16.0 LPA', '4.8 LPA', 87.5, 'principal@kbtcoe.org', '+91 253 2571439', 'https://kbtcoe.org', 'Centrally located engineering campus offering quality technical education and extensive industrial training.'),
(5, 'Sandip Institute of Technology & Research Centre', 'Maharashtra', 'Nashik', 'Artificial Intelligence & Data Science', 95000, 5, 'Trimbak Road, Mahiravani, Nashik, Maharashtra 422213', '89% Placed | Max 20.0 LPA | Avg 5.0 LPA', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000', 'Private', 'Yes', 2008, 'NAAC Grade A', '20.0 LPA', '5.0 LPA', 88.2, 'principal@sitrc.sandipfoundation.org', '+91 2594 222551', 'https://sitrc.sandipfoundation.org', 'Sprawling 200-acre green campus with advanced robotics, IoT, and cloud computing infrastructure.');

-- ------------------------------------------------------------
-- Table structure for `branch_fees`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `branch_fees`;
CREATE TABLE `branch_fees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT NOT NULL,
  `branch_name` VARCHAR(255) NOT NULL,
  `tuition_fee` INT NOT NULL,
  `development_fee` INT NOT NULL,
  `total_fee` INT NOT NULL,
  `seats` INT NOT NULL DEFAULT 60,
  FOREIGN KEY (`college_id`) REFERENCES `colleges`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `branch_fees` (`college_id`, `branch_name`, `tuition_fee`, `development_fee`, `total_fee`, `seats`) VALUES
(1, 'Computer Engineering', 76500, 13500, 90000, 120),
(1, 'Information Technology', 72250, 12750, 85000, 60),
(1, 'Artificial Intelligence & Data Science', 78200, 13800, 92000, 60),
(2, 'Information Technology', 72250, 12750, 85000, 120),
(2, 'Computer Engineering', 74800, 13200, 88000, 60);

-- ------------------------------------------------------------
-- Table structure for `cap_cutoffs`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `cap_cutoffs`;
CREATE TABLE `cap_cutoffs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT NOT NULL,
  `branch` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `round1_percentile` FLOAT NOT NULL,
  `round2_percentile` FLOAT NOT NULL,
  `round3_percentile` FLOAT NOT NULL,
  FOREIGN KEY (`college_id`) REFERENCES `colleges`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cap_cutoffs` (`college_id`, `branch`, `category`, `round1_percentile`, `round2_percentile`, `round3_percentile`) VALUES
(1, 'Computer Engineering', 'GOPEN', 94.2, 93.0, 92.4),
(1, 'Computer Engineering', 'OBC', 91.5, 90.2, 89.5),
(1, 'Computer Engineering', 'SC', 82.0, 80.5, 79.2),
(2, 'Information Technology', 'GOPEN', 90.8, 89.5, 88.9),
(2, 'Information Technology', 'OBC', 88.0, 86.8, 85.9);
