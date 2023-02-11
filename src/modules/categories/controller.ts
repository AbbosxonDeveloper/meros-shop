import { NextFunction, Request, Response } from "express"
import { datasource } from "../../config/orm.config"
import { CategoriesEntity } from "../../entities/categories.entity"
import { ErrorHandle } from "../../lib/errorHandle"

export default new (class CategoriesController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await datasource
        .getRepository(CategoriesEntity)
        .createQueryBuilder("categories")
        .leftJoinAndSelect("categories.subcategories", "subcategories")
        .getMany()

      res.status(200).json({ status: 200, data: categories })
    } catch (error) {
      next(error)
    }
  }

  async FINDONE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const category = await datasource
        .getRepository(CategoriesEntity)
        .createQueryBuilder("categories")
        .leftJoinAndSelect("categories.subcategories", "subcategories")
        .where({ category_id: id })
        .getOne()

      // const sign = jwt.sign('')
      // const verify = jwt.verify()
      // console.log(sign,verify);

      res.status(200).json({ status: 200, data: category })
    } catch (error) {
      next(error)
    }
  }

  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body
      const {
        raw: [raw],
      } = await datasource
        .getRepository(CategoriesEntity)
        .createQueryBuilder()
        .insert()
        .into(CategoriesEntity)
        .values({ category_title: title })
        .returning(["title"])
        .execute()

      if (!raw) {
        res.status(401).send("wrong title")
        throw new ErrorHandle(401, "wrong title")
      }

      res.status(201).json({
        status: 201,
        message: "created",
        data: raw,
      })
    } catch (error) {
      next(error)
    }
  }

  async PUT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const { title } = req.body

      const isCategory = await datasource.getRepository(CategoriesEntity).findOneBy({ category_id: id })

      if (!isCategory) {
        res.status(403).send("category not found")
        throw new ErrorHandle(403, "category not found")
      }

      const {
        raw: [raw],
      } = await datasource
        .createQueryBuilder()
        .update("categories")
        .set({ category_title: title })
        .where("category_id = :id", { id })
        .execute()

      res.status(200).send({
        status: 200,
        message: "updated",
        data: raw,
      })
    } catch (error) {
      next(error)
    }
  }

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const findCategory = await datasource.getRepository(CategoriesEntity).findOneBy({ category_id: id })

      if (!findCategory) {
        res.status(403).send("category not found")
        throw new ErrorHandle(403, "category not found")
      }
      const {
        raw: [raw],
      } = await datasource.createQueryBuilder().delete().from("categories").where("category_id = :id", { id }).execute()

      res.status(200).send({
        status: 200,
        message: "deleted",
        data: raw,
      })
    } catch (error) {
      next(error)
    }
  }
})()
