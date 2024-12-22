<div align="center">
    <img src="https://cdn-icons-png.flaticon.com/128/136/136525.png" alt="Logo" width="80" height="80">
    <h3>robojson</h3>
    <p>minimal web app for testing frontend UI with data until your backend api is ready!</p>
</div>

## Features

✨ Minimal and simple UI

🔥 Add json or raw data and fetch it on the frontend in just 2 minutes!

🔥 Use api key to access your data, so no one else can sneak it

## Headshots
<img width="1371" alt="Screenshot 2024-12-22 at 08 47 35" src="https://github.com/user-attachments/assets/c64ffce9-8b88-4a77-8498-d9d58681856e" />


## Technologies Used
<img src="https://img.shields.io/badge/next-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/postgres-000000?style=for-the-badge&logo=postgresql&logoColor=blue"/>
<img src="https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=blue"/>

## Development

To run this project locally, follow these steps:

1. Clone the repository.
   ```bash
   git clone https://github.com/therealrinku/robojson.git

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
