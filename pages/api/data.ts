import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index";

export default async function getData(req: NextApiRequest, res: NextApiResponse) {
  //
  const auth = req.headers.authorization?.split(" ") || [];

  if (!auth?.length || auth[0] !== "BASIC" || !auth[1]) {
    return res.status(401).send({ error: "Validation Failed" });
  }

  const query = `SELECT token from tokens WHERE token = '${auth[1]}'`;

  await db
    .query(query)
    .then((dbRes) => {
      if (dbRes.rowCount < 1) return res.status(401).send({ message: "Invalid Token" });

      const innerQuery = `SELECT * FROM data WHERE key = '${auth[1]}'`;

      db.query(innerQuery)
        .then((dbRes) => {
          dbRes.rowCount > 0
            ? res.status(200).json({ data: JSON.parse(dbRes.rows[0].data) })
            : res.status(200).json({ data: "" });
        })
        .catch((err) => {
          res.status(401).json({ error: "Invalid Token" });
        });
    })
    .catch((err) => {
      res.status(401).json({ error: "Invalid Token" });
    });
}
