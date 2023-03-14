import { getLogger } from "@/logging/log-util";
import db from "../../libs/dbConfig";

export default async function save(req, res) {
  const logger = getLogger("save");

  const body = req.body;
  const result = await new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO userdata (userid, data) VALUES (?) ON DUPLICATE KEY UPDATE userid=?, data=?;",
      [[body.userId, body.data], body.userId, body.data],
      (err) => {
        if (err) return reject(logger.error(err.message));
        logger.info(`${body.userId}'s Data is saved`);
        return resolve({
          success: true,
          msg: "저장이 완료됐습니다",
        });
      }
    );
  });
  res.json(result);
}
