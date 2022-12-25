import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index";

export default async function getTokenData(req: NextApiRequest, res: NextApiResponse) {
  const query = `SELECT token from tokens WHERE token = '${req.body.token}'`;
  await db
    .query(query)
    .then((dbRes) => {
      if (dbRes.rowCount < 1) return res.status(401).send({ message: "Invalid Token" });

      const innerQuery = `SELECT * FROM data WHERE key = '${req.body.token}'`;

      db.query(innerQuery)
        .then((dbRes) => {
          if (dbRes.rowCount < 1) return res.status(200).json({ data: "" });
          const data = dbRes.rows[0].data;
          res.status(200).json({ data });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch(() => {
      res.status(401).json({ message: "Invalid Token" });
    });
}
