# Robojson

Roboshare is a simple service for adding json data and fetching it in the frontend.
RECOMMENDED TO USE ONLY FOR TESTING, don't use in the production applications

## Features

- **Add Data:** Add any data json or text
- **Fetch that same data:** Fetch the custom data added through our rest API just by using data token.
- **Amazing for development purposes:** No-need to google for your specific mock data requirements anymore, just add any type of custom data you want and test your frontend application

## Technologies Used

- **Next.js:** Robust React framework for building the front end.
- **PostgreSQL database:** For storing all the data.
- **Vercel:** For hosting the website

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed
- Firebase account for file storage setup

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/therealrinku/roboshare.git

2. Install the dependencies.
   ```bash
   yarn install
   
3. Get your postgres setup and add connection string to .env(name is DB_URL) . I got my postgreSQL setup from elephantSQL.com

4. Run the database/createTables.js script in the database directory for creating the required database tables(data, tokens)
 ```bash
   node createTables.js

5. Run the project.
   ```bash
   yarn run dev
