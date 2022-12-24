import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index";

export default async function GenerateToken(req: NextApiRequest, res: NextApiResponse) {
  const query = `INSERT INTO tokens DEFAULT VALUES returning token`;
  await db
    .query(query)
    .then((dbRes) => {
      res.status(200).json({ token: dbRes.rows[0]?.token });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}
