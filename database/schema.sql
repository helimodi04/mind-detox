CREATE TABLE student_mental_health (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT,
    gender VARCHAR(20),
    course VARCHAR(100),
    year_of_study VARCHAR(20),
    cgpa VARCHAR(20),
    marital_status VARCHAR(10),
    anxiety VARCHAR(10),
    depression VARCHAR(10),
    panic_attack VARCHAR(10),
    treatment VARCHAR(10)
);

-- Users table for authentication and verification
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add verification and username columns
ALTER TABLE users 
ADD COLUMN is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN verification_token VARCHAR(255);

ALTER TABLE users 
ADD COLUMN username VARCHAR(50) UNIQUE NOT NULL;