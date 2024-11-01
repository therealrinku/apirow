import { NextApiRequest, NextApiResponse } from "next";

export default async function GenerateToken(req: NextApiRequest, res: NextApiResponse) {
   console.log(JSON.stringify(req.body), "webhook log stringified");
   res.status(200).json({ working: true });
}
