import { NextFunction, Request, Response } from "express"
import { datasource } from "../../config/orm.config"
import { ProductsEntity } from "../../entities/products.entity"
import redisConfig from "../../config/redis.config"
import { CommentsEntity } from "../../entities/comments.entity"
import { ErrorHandle } from "../../lib/errorHandle"
import jwt from "../../lib/jwt"

export default new (class CommentsController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await redisConfig()
      const cacheComments: string | null | undefined = await client?.get("allComments")
      // let getuser = client?.get("username")
      // console.log(await getuser);
      if (!cacheComments) {
        const comments: CommentsEntity[] = await datasource.getRepository(CommentsEntity).find({
          relations: {
            comment_user: true,
            product: true,
          },
        })

        await client?.setEx("allComments", 20, JSON.stringify(comments))
        res.status(200).json(<CommentsEntity[]>comments)
      } else {
        res.status(200).json(JSON.parse(cacheComments))
      }
    } catch (error: unknown) {
      next(error)
    }
  }

  async GETBYPRODUCT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await redisConfig()
      const { id } = req.result as any
      const cacheComments: string | null | undefined = await client?.get("ProductComments")
      // let getuser = client?.get("username")
      // console.log(await getuser);
      if (!cacheComments) {
        const comments = await datasource.getRepository(CommentsEntity).find({
          relations: {
            comment_user: true,
            product: true,
          },
          where: { product: id },
        })

        await client?.setEx("ProductComments", 20, JSON.stringify(comments))
        res.status(200).json(comments)
      } else {
        res.status(200).json(JSON.parse(cacheComments))
      }
    } catch (error: unknown) {
      next(error)
    }
  }
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, product_id } = req.body
      const { token } = req.headers
      const { user_id }: any = jwt.verify(token)

      const {
        raw: [raw],
      } = await datasource
        .getRepository(CommentsEntity)
        .createQueryBuilder()
        .insert()
        .into(CommentsEntity)
        .values({ comment_title: title, product: product_id, comment_user: user_id })
        .returning("*")
        .execute()

      if (!raw) {
        res.status(400).json({ status: 400, message: "wrong title or id" })
        throw new ErrorHandle(400, "wrong title or id")
      }
      res.status(201).json({
        status: <number>201,
        message: <string>"created",
        data: raw,
      })
    } catch (error: unknown) {
      next(error)
    }
  }

  async PUT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body
      const { id } = req.params

      const findComment = await datasource.getRepository(CommentsEntity).find({ where: { comment_id: id } })

      if (!findComment) {
        res.status(400).json({ status: <number>400, message: <string>"comment doesn't exist" })
      }
      console.log(findComment)

      const {
        raw: [raw],
      } = await datasource
        .getRepository(CommentsEntity)
        .createQueryBuilder()
        .update("comments")
        .set({ comment_title: title })
        .where({ comment_id: id })
        .returning("*")
        .execute()

      if (!raw) {
        res.status(400).json({ status: 400, message: "wrong title or id" })
        throw new ErrorHandle(400, "wrong title or id")
      }
      res.status(201).json({
        status: <number>201,
        message: <string>"updated",
        data: raw,
      })
    } catch (error: unknown) {
      next(error)
    }
  }
  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body
      const { id } = req.params
      const { token } = req.headers
      const verify: any = jwt.verify(token)

      const findComment = await datasource.getRepository(CommentsEntity).find({ where: { comment_id: id } })

      if (!findComment) {
        res.status(400).json({ status: <number>400, message: <string>"comment doesn't exist" })
      }
      console.log(findComment)

      const {
        raw: [raw],
      } = await datasource
        .getRepository(CommentsEntity)
        .createQueryBuilder()
        .delete()
        .from("comments")
        .where({ comment_id: id, comment_user: verify.user_id })
        .execute()

      res.status(201).json({
        status: <number>201,
        message: <string>"deleted",
        data: raw,
      })
    } catch (error: unknown) {
      next(error)
    }
  }
})()
