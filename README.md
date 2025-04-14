<div align="center">
    <img src="https://cdn-icons-png.flaticon.com/128/136/136525.png" alt="Logo" width="80" height="80">
    <h3>apirow</h3>
    <p>minimal web app for testing frontend UI with data until your backend api is ready!</p>
</div>

## Features

✨ Minimal and simple UI

🔥 Add json or raw data and fetch it on the frontend in just 2 minutes!

🔥 Use api key to access your data, so no one else can sneak it


## Technologies Used
<img src="https://img.shields.io/badge/rowanjs-000000?style=for-the-badge&logo=javascript&logoColor=green"/>
<img src="https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript&logoColor=yellow"/>
<img src="https://img.shields.io/badge/postgres-000000?style=for-the-badge&logo=postgresql&logoColor=blue"/>

## Development

To run this project locally, follow these steps:

1. Clone the repository.
   ```bash
   git clone https://github.com/therealrinku/apirow.git

2. Install the dependencies.
   ```bash
   yarn install
   
3. Get your postgres setup and add connection string to .env(name is DB_URL) . I got my postgreSQL setup from elephantSQL.com

4. Run the database/createTables.js script in the database directory for creating the required database tables
   ```bash
   node createTables.js
   
5. Run the project.
   ```bash
   yarn run dev
