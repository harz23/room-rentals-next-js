import { SessionUser, Id } from "../types";
import ApiService from "./ApiService";

export default class RoomService {
  public static post(input: any) {

    return ApiService.post("/api/rentable/rooms", input);
  }
}
