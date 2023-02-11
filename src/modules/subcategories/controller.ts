import { datasource } from "../../config/orm.config"
import { SubCategoriesEntity } from "../../entities/subcategories.entity"
import { Request, Response, NextFunction } from "express"
import { ErrorHandle } from "../../lib/errorHandle"

export default new (class SubCategoriesController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subcategories: SubCategoriesEntity[] = await datasource.getRepository(SubCategoriesEntity).find()

      res.status(200).json({ status: 200, data: subcategories })
    } catch (error) {
      next(error)
    }
  }

  async FINDONE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const subcategory = await datasource.getRepository(SubCategoriesEntity).findOneBy({ subcategory_id: id })

      res.status(200).json({ status: 200, data: subcategory })
    } catch (error) {
      next(error)
    }
  }

  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, id } = req.body
      const {
        raw: [raw],
      } = await datasource
        .getRepository(SubCategoriesEntity)
        .createQueryBuilder()
        .insert()
        .into(SubCategoriesEntity)
        .values({ subcategory_title: title, category: id })
        .returning(["subcategory_title"])
        .execute()

      if (!raw) {
        res.status(403).json({ status: 403, message: "wrong title or id" })
        throw new ErrorHandle(403, "wrong title or id")
      }

      res.status(201).json({
        status: <number>201,
        message: <string>"created",
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
      const {
        raw: [raw],
      } = await datasource
        .getRepository(SubCategoriesEntity)
        .createQueryBuilder()
        .update("subcategories")
        .set({ subcategory_title: title })
        .where("subcategory_id = :id", { id })
        .returning("subcategory_title")
        .execute()

      if (!raw) {
        res.status(403).json({ status: 403, message: "wrong title or id" })
        throw new ErrorHandle(403, "wrong title or id")
      }

      res.status(201).json({
        status: <number>201,
        message: <string>"updated",
        data: raw,
      })
    } catch (error) {
      next(error)
    }
  }

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const findSubcategory = await datasource.getRepository(SubCategoriesEntity).findOneBy({ subcategory_id: id })

      if (!findSubcategory) {
        res.status(403).json({ status: 403, message: "subcategory not found" })
        throw new ErrorHandle(403, "subcategory not found")
      }
      const {
        raw: [raw],
      } = await datasource
        .getRepository(SubCategoriesEntity)
        .createQueryBuilder()
        .delete()
        .from("subcategories")
        .where("subcategory_id =:id", { id })
        .execute()

      res.status(201).json({
        status: <number>201,
        message: <string>"deleted",
        // data: raw
      })
    } catch (error) {
      next(error)
    }
  }
})()
