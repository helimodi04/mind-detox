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

            for (const row of results) {
                // Create an array of values that we intend to insert.
                const valuesToInsert = [
                    row['Age'] || null,
                    row['Choose your gender'] || null,
                    row['Course'] || null,
                    row['Your current year of Study'] || null,
                    row['What is your CGPA?'] || null,
                    row['Marital status'] || null,
                    row['Do you have Anxiety?'] || null,
                    row['Do you have Depression?'] || null,
                    row['Do you have Panic attack?'] || null,
                    row['Did you seek any specialist for a treatment?'] || null
                ];

                // --- NEW DEBUGGING LINE ---
                // This will show us exactly what is being sent to the database for each row.
                console.log('Attempting to insert:', valuesToInsert);

                try {
                    // Use the 'valuesToInsert' array in the query.
                    await connection.execute(query, valuesToInsert);
                } catch (error) {
                    console.error('❌ Error inserting this row:', error);
                }
            }

            console.log('🚀 Data import completed successfully!');
            await connection.end();
        });
}

importData();