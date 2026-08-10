// Utility to generate and download database_schema.sql for XAMPP / phpMyAdmin

export const DATABASE_SCHEMA_SQL = `-- ====================================================================
-- ACADEMIA_OS / COLLEGE PORTAL DATABASE SCHEMA
-- Compatible with MySQL / MariaDB (XAMPP / phpMyAdmin)
-- Note: This file contains table creation statements without dummy data.
-- ====================================================================

CREATE DATABASE IF NOT EXISTS \`college_portal\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`college_portal\`;

-- --------------------------------------------------------------------
-- 1. Table structure for \`admin_credentials\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`admin_credentials\`;
CREATE TABLE \`admin_credentials\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`role\` VARCHAR(20) DEFAULT 'SUPER_ADMIN',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 2. Table structure for \`colleges\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`colleges\`;
CREATE TABLE \`colleges\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`collage_name\` VARCHAR(255) NOT NULL,
  \`state\` VARCHAR(100) NOT NULL,
  \`district\` VARCHAR(100) NOT NULL,
  \`branch\` VARCHAR(150) NOT NULL,
  \`fees\` DECIMAL(10,2) NOT NULL,
  \`ranking\` INT(11) NOT NULL,
  \`address\` TEXT NOT NULL,
  \`placement\` TEXT NOT NULL,
  \`image\` VARCHAR(500) DEFAULT NULL,
  \`merit_list_pdf\` VARCHAR(255) DEFAULT NULL,
  \`university_type\` ENUM('Government', 'Private', 'Semi-Government') NOT NULL DEFAULT 'Private',
  \`is_autonomous\` ENUM('Yes', 'No') NOT NULL DEFAULT 'No',
  \`description\` TEXT DEFAULT NULL,
  \`established_year\` INT(4) DEFAULT NULL,
  \`accreditation\` VARCHAR(100) DEFAULT NULL,
  \`highest_package\` VARCHAR(50) DEFAULT NULL,
  \`average_package\` VARCHAR(50) DEFAULT NULL,
  \`facilities\` TEXT DEFAULT NULL,
  \`cutoff_general\` DECIMAL(5,2) DEFAULT NULL,
  \`contact_email\` VARCHAR(100) DEFAULT NULL,
  \`contact_phone\` VARCHAR(50) DEFAULT NULL,
  \`website_url\` VARCHAR(255) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 3. Table structure for \`branch_fees\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`branch_fees\`;
CREATE TABLE \`branch_fees\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`college_id\` INT(11) NOT NULL,
  \`branch_name\` VARCHAR(150) NOT NULL,
  \`tuition_fee\` DECIMAL(10,2) NOT NULL,
  \`development_fee\` DECIMAL(10,2) DEFAULT 0.00,
  \`total_fee\` DECIMAL(10,2) NOT NULL,
  \`seats\` INT(11) NOT NULL DEFAULT 60,
  PRIMARY KEY (\`id\`),
  KEY \`fk_branch_college\` (\`college_id\`),
  CONSTRAINT \`fk_branch_college\` FOREIGN KEY (\`college_id\`) REFERENCES \`colleges\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 4. Table structure for \`cutoff_marks\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`cutoff_marks\`;
CREATE TABLE \`cutoff_marks\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`college_id\` INT(11) NOT NULL,
  \`branch\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(20) NOT NULL DEFAULT 'GOPEN',
  \`round1_percentile\` DECIMAL(5,2) NOT NULL,
  \`round2_percentile\` DECIMAL(5,2) DEFAULT NULL,
  \`round3_percentile\` DECIMAL(5,2) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_cutoff_college\` (\`college_id\`),
  CONSTRAINT \`fk_cutoff_college\` FOREIGN KEY (\`college_id\`) REFERENCES \`colleges\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 5. Table structure for \`student_documents\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`student_documents\`;
CREATE TABLE \`student_documents\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`student_email\` VARCHAR(100) NOT NULL,
  \`document_name\` VARCHAR(255) NOT NULL,
  \`file_type\` VARCHAR(50) NOT NULL,
  \`file_size\` VARCHAR(50) NOT NULL,
  \`file_path\` VARCHAR(500) NOT NULL,
  \`uploaded_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 6. Table structure for \`saved_colleges\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`saved_colleges\`;
CREATE TABLE \`saved_colleges\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`student_email\` VARCHAR(100) NOT NULL,
  \`college_id\` INT(11) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`unique_user_college\` (\`student_email\`, \`college_id\`),
  KEY \`fk_saved_college\` (\`college_id\`),
  CONSTRAINT \`fk_saved_college\` FOREIGN KEY (\`college_id\`) REFERENCES \`colleges\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 7. Table structure for \`inquiries\`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`inquiries\`;
CREATE TABLE \`inquiries\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`college_id\` INT(11) NOT NULL,
  \`applicant_name\` VARCHAR(150) NOT NULL,
  \`applicant_email\` VARCHAR(100) NOT NULL,
  \`applicant_phone\` VARCHAR(20) NOT NULL,
  \`course_branch\` VARCHAR(150) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`fk_inquiry_college\` (\`college_id\`),
  CONSTRAINT \`fk_inquiry_college\` FOREIGN KEY (\`college_id\`) REFERENCES \`colleges\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export function downloadDatabaseSchemaSql() {
  const blob = new Blob([DATABASE_SCHEMA_SQL], { type: 'text/sql' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'database_schema.sql';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
