import { NextApiRequest, NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import db from "../../db";
import { Id } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
    res.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED });
    return;
  }

  if (typeof req.body !== "number") {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ error: ReasonPhrases.BAD_REQUEST });
    return;
  }

  const data = await db.read();

  const idStarredRoom: number = req.body
  const userStarredRooms = data.sessionUser.starredRooms;

  const index = userStarredRooms.indexOf(idStarredRoom);
  index === -1 ? userStarredRooms.unshift(idStarredRoom): userStarredRooms.splice(index, 1)

  await db.write();
  
  res.status(StatusCodes.CREATED);
  res.json(idStarredRoom);
}
