// Basic API route with key authentication pulled from env variable
import fetch from "node-fetch";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { number, message, API_KEY } = req.body;

  if (API_KEY !== process.env.API_KEY) {
    res.status(401).json({ name: "Unauthorized" });
    return;
  }

  const url = `http://${process.env.SERVER_PORT}/cgi-bin/sendsms?smsc=http-link&username=${process.env.SERVER_USERNAME}&password=${process.env.PASSWORD}&from=${process.env.FROM}&to=${number}&text=${message}`;
  console.log(url);
  fetch(url);

  res.status(200).json({ message: "Message Sent" });
}
