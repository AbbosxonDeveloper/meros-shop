import { NextFunction, Request, Response } from "express"
import { ErrorHandle } from "../lib/errorHandle"
import { datasource } from "../config/orm.config"
import { UsersEntity } from "../entities/users.entity"
import jwt from "../lib/jwt"

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { token } = req.headers

    if (!token) {
      next(new ErrorHandle(400, "You don't have a token"))
      throw new ErrorHandle(400, "You don't have a token")
    }
    const verify: any = jwt.verify(token)
    const findUser = await datasource.getRepository(UsersEntity).findOneBy({ user_id: verify.user_id })
    if (!findUser) {
      next(new ErrorHandle(400, "Invalid token"))
      throw new ErrorHandle(400, "Invalid token")
    }
    next()
  } catch (error) {
    next(error)
  }
}
