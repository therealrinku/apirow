import { NextApiRequest, NextApiResponse } from "next";

export default async function GenerateToken(req: NextApiRequest, res: NextApiResponse) {
   console.log(req.body.line_items, req.body.contact_email, req.body.line_items[0].properties, "log");
   res.status(200).json({ working: true });
}
