import pg from "pg";

const db = new pg.Client(process.env.DB_URL);

db.connect()
  .then(() => console.log("Connected to Roboshare db."))
  .catch(() => console.log("Roboshare won't let me connect."));

export default db;
