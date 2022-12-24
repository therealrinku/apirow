import pg from "pg";

const db = new pg.Client(process.env.DB_URL);

db.connect()
  .then(() => console.log("Connected to nerd dev db."))
  .catch(() => console.log("Nerd dev is nerdy. it won't let me connect."));

export default db;
