import { NextApiRequest, NextApiResponse } from "next";

export default async function GenerateToken(req: NextApiRequest, res: NextApiResponse) {
   console.log(req.body, "webhook log");
   res.status(200).json({ working: true });
}
