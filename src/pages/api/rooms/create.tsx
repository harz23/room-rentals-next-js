import { NextApiRequest, NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import db from "../../../db";
import { Room, Id } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
    res.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED });
    return;
  }

  if (typeof req.body !== "object") {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ error: ReasonPhrases.BAD_REQUEST });
    return;
  }

  var urlPattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=!]*).jpg!d/gi);

  if(typeof req.body.title !== "string" && req.body.title === "" || 
     typeof req.body.description !== "string" && req.body.description === "" || 
     typeof req.body.imageUrl !== "string" && req.body.imageUrl === "" ||
     !urlPattern.test(req.body.imageUrl)) {
      
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: ReasonPhrases.BAD_REQUEST });
      return;
    }

  const data = await db.read();

  const cabin: Room= {
    "id": data.rooms.length as number,
    "featured": req.body.featured as boolean,
    "owner": {
      "id": req.body.owner.id as number,
      "firstName": req.body.owner.firstName as string,
      "lastName": req.body.owner.lastName as string,
      "portraitUrl": req.body.owner.portraitUrl as string
    },
    "type": "rentable",
    "title": req.body.title as string,
    "description": req.body.description as string,
    "heroUrl": req.body.imageUrl as string
  }

  data.rooms.unshift(cabin)

  await db.write();
  
  res.status(StatusCodes.CREATED);
  res.json(cabin);
}