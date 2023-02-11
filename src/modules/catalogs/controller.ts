import { NextFunction, Request, Response } from "express"
import { datasource } from "../../config/orm.config"
import { CatalogsEntity } from "../../entities/catalogs.entity"
import { ErrorHandle } from "../../lib/errorHandle"

export default new (class CatalogsController {
  async GET(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const catalogs: CatalogsEntity[] = await datasource
        .getRepository(CatalogsEntity)
        .createQueryBuilder("catalogs")
        .leftJoinAndSelect("catalogs.products", "products")
        .getMany()
      // .find()

      res.status(200).json({ status: 200, data: catalogs })
    } catch (error) {
      next(error)
    }
  }

  async GETONE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const findCatalog = await datasource
        .getRepository(CatalogsEntity)
        .createQueryBuilder("catalogs")
        .leftJoinAndSelect("catalogs.products", "products")
        .where({ catalog_id: id })
        .getOne()
      // .findOneBy({catalog_id: id})

      res.status(200).json({ status: 200, data: findCatalog })
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
        .getRepository(CatalogsEntity)
        .createQueryBuilder()
        .insert()
        .into(CatalogsEntity)
        .values({ catalog_title: title, subcategory: id })
        .returning(["catalog_title"])
        .execute()

      if (!raw) {
        res.status(403).json({ status: 403, message: "wrong title or id" })
        throw new ErrorHandle(403, "wrong title or id")
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
      const findCatalog = await datasource.getRepository(CatalogsEntity).findOneBy({ catalog_id: id })

      if (!findCatalog) {
        res.status(403).send("catalog not found")
        throw new ErrorHandle(403, "catalog not found")
      }

      const {
        raw: [raw],
      } = await datasource
        .getRepository(CatalogsEntity)
        .createQueryBuilder()
        .update("catalogs")
        .set({ catalog_title: title })
        .where({ catalog_id: id })
        .returning(["catalog_title"])
        .execute()

      res.status(201).json({
        status: 201,
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
      const findCatalog = await datasource.getRepository(CatalogsEntity).findOneBy({ catalog_id: id })

      if (!findCatalog) {
        res.status(403).send("catalog not found")
        throw new ErrorHandle(403, "catalog not found")
      }

      const {
        raw: [raw],
      } = await datasource.createQueryBuilder().delete().from("catalogs").where("catalog_id = :id", { id }).execute()

      res.status(204).json({
        status: 204,
        message: "deleted",
      })
    } catch (error) {
      next(error)
    }
  }
})()
