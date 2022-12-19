import { Id } from "../types";
import ApiService from "./ApiService";

export default class StarService {
  public static post(input: Id) {
    return ApiService.post("/api/rooms/rentable/star", input);
  }
}
