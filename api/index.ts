import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({
    message:
      "Use /[owner]/[repo] to get a Vercel deployment badge for your github repository!",
  });
}
