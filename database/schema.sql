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