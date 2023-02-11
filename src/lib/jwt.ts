import Jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const jwtkey = process.env.JWTKEY ?? "e1qqo90cn"

export default {
  sign: (payload) => Jwt.sign(payload, jwtkey),
  verify: (token) => Jwt.verify(token, jwtkey),
}
