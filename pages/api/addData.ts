import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index";

export default function addData(req: NextApiRequest, res: NextApiResponse) {
  const query = `INSERT INTO data(data,key) VALUES('${req.body.data}','${req.body.key}') ON CONFLICT(key) DO UPDATE SET data='${req.body.data}'`;

  db.query(query)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}
