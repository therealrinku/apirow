import pg from "pg";

const db = new pg.Client(process.env.DB_URL);

db.connect()
  .then(() => console.log("Connected to Robojson db."))
  .catch(() => console.log("Robojson won't let me connect."));

export default db;
