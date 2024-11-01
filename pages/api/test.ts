import { NextApiRequest, NextApiResponse } from "next";

export default async function GenerateToken(req: NextApiRequest, res: NextApiResponse) {
   console.log(req.body.line_items, req.body.shipping_address, "webhook log line items1");
   res.status(200).json({ working: true });
}
