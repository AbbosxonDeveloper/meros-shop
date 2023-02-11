import * as redis from "redis"
import dotenv from "dotenv"
import { ErrorHandle } from "../lib/errorHandle"

dotenv.config()

export default async () => {
  try {
    const client = redis.createClient({ url: String(process.env.REDIS_URL ?? "redis://127.0.0.1:6379") })

    client.on("error", (error): void => {
      console.log("Error")
      throw new ErrorHandle(422, error)
    })

    client.on("connect", (): void => console.log("Redis Connected"))
    await client.connect()
    return client
  } catch (error) {
    console.log("Redis Error")
  }
}
