// import_data.js (Updated Code)

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

async function importData() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'mind_detox_db'
        });
        console.log('✅ Successfully connected to the database.');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return;
    }

    const results = [];
    const filePath = path.join(__dirname, 'mental_health_data.csv');

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log('✅ CSV file read successfully. Starting data import...');
            
            const query = `
                INSERT INTO student_mental_health 
                (age, gender, course, year_of_study, cgpa, marital_status, anxiety, depression, panic_attack, treatment) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            // REPLACE your old 'for' loop with this entire block

           // REPLACE your old 'for' loop with this entire block

for (const row of results) {
    // We map the actual CSV headers (e.g., 'academic_year') to the values.
    const valuesToInsert = [
        row['age'] || null,
        row['gender'] || null,
        row['major'] || null, // Note: I'm assuming CSV 'major' maps to your 'course' column
        row['academic_year'] || null,
        row['cgpa'] || null,
        row['marital_status'] || null,
        row['anxiety'] || null,
        row['depression'] || null,
        row['panic_attack'] || null,
        row['treatment'] || null
    ];

    try {
        await connection.execute(query, valuesToInsert);
    } catch (error) {
        // We log the values that failed to help with debugging.
        console.error('❌ Error inserting this row:', valuesToInsert, error);
    }
}

            console.log('🚀 Data import completed successfully!');
            await connection.end();
        });
}

importData();