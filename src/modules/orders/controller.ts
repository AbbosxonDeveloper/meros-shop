import { NextFunction, Request, Response } from "express"
import { datasource } from "../../config/orm.config"
import { ProductsEntity } from "../../entities/products.entity"
import redisConfig from "../../config/redis.config"
import { CommentsEntity } from "../../entities/comments.entity"
import { ErrorHandle } from "../../lib/errorHandle"
import jwt from "../../lib/jwt"
import { OrdersEntity } from "../../entities/orders.entity"

export default new (class OrdersController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await redisConfig()
      const cacheOrders: string | null | undefined = await client?.get("allOrders")
      // let getuser = client?.get("username")
      // console.log(await getuser);
      if (!cacheOrders) {
        const orders: OrdersEntity[] = await datasource.getRepository(OrdersEntity).find({
          relations: {
            order_user: true,
            product: true,
          },
        })

        await client?.setEx("allOrders", 20, JSON.stringify(orders))
        res.status(200).json(<OrdersEntity[]>orders)
      } else {
        res.status(200).json(JSON.parse(cacheOrders))
      }
    } catch (error: unknown) {
      next(error)
    }
  }

  async GETBYUSER(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.headers
      const verify: any = jwt.verify(token)
      const orders: OrdersEntity[] = await datasource.getRepository(OrdersEntity).find({
        relations: {
          order_user: true,
          product: true,
        },
        where: { order_user: verify.user_id },
      })

      res.status(200).json({ status: <number>200, data: orders })
    } catch (error: unknown) {
      next(error)
    }
  }
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { product_id, count } = req.body
      const { token } = req.headers
      const { user_id }: any = jwt.verify(token)

      const {
        raw: [raw],
      } = await datasource
        .getRepository(OrdersEntity)
        .createQueryBuilder()
        .insert()
        .into(OrdersEntity)
        .values({ product: product_id, order_user: user_id, count: count || 1 })
        .returning("*")
        .execute()

      if (!raw) {
        res.status(400).json({ status: 400, message: "wrong id" })
        throw new ErrorHandle(400, "wrong id")
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

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body
      const { id } = req.params
      const { token } = req.headers
      const verify: any = jwt.verify(token)

      const findComment = await datasource.getRepository(OrdersEntity).find({ where: { order_id: id } })

      if (!findComment) {
        res.status(400).json({ status: <number>400, message: <string>"comment doesn't exist" })
      }
      console.log(findComment)

      const {
        raw: [raw],
      } = await datasource
        .getRepository(OrdersEntity)
        .createQueryBuilder()
        .delete()
        .from("orders")
        .where({ order_id: id })
        .execute()

      res.status(201).json({
        status: <number>201,
        message: <string>"deleted",
      })
    } catch (error: unknown) {
      next(error)
    }
  }
})()
