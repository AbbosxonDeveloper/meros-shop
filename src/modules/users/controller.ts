import { Request, Response, NextFunction } from "express"
import { datasource } from "../../config/orm.config"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandle } from "../../lib/errorHandle"
import jwt from "../../lib/jwt"

class UsersController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await datasource.getRepository(UsersEntity).find()
      // .createQueryBuilder('users')
      // .getMany()

      res.status(200).json({ status: 200, data: users })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async GETUSER(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.headers
      const verification: any = jwt.verify(token)

      console.log(verification)

      const findUser = await datasource.getRepository(UsersEntity).find({
        relations: {
          comments: true,
        },
        where: { user_id: verification.user_id },
      })

      res.status(200).json({ status: 200, data: findUser })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async LOGIN(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, password, phone } = req.body
      const user = await datasource.getRepository(UsersEntity).findOneBy({ name, password })

      if (!user) {
        res.status(401).send("wrong registration")
        throw new ErrorHandle(401, "wrong registration")
      }

      console.log(user)
      res.status(201).send({
        status: 201,
        message: "login",
        data: user,
        token: jwt.sign({ user_id: user.user_id }),
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async SIGNUP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, password, email, phone } = req.body
      const {
        raw: [raw],
      } = await datasource
        .getRepository(UsersEntity)
        .createQueryBuilder()
        .insert()
        .into(UsersEntity)
        .values({ name, password, email, phone })
        .returning(["name", "password", "email", "phone"])
        .execute()

      if (!raw) {
        res.status(401).send("wrong registration")
        throw new ErrorHandle(401, "wrong registration")
      }

      console.log(raw)
      res.status(201).send({
        status: 201,
        message: "created",
        data: raw,
        token: jwt.sign({ user_id: raw.user_id }),
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default new UsersController()
