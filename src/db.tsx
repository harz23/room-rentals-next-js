import { Low, JSONFile } from "lowdb";
import path from "path";
import { DbData } from "./types";

const dbPath = path.join(process.cwd(), "db.json");
const adapter = new JSONFile<DbData>(dbPath);
const lowDb = new Low(adapter);

const db = {
  async read() {
    await lowDb.read();

    if (!lowDb.data) {
      throw new Error("No seed data found");
    }

    return lowDb.data;
  },

  async write() {
    await lowDb.write();
  }
};

export default db;
