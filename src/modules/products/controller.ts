import { NextFunction, Request, Response } from "express";
import { datasource } from "../../config/orm.config";
import { ProductsEntity } from "../../entities/products.entity";
import redisConfig from "../../config/redis.config";

export default new class ProductsController {
    async GET(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const client = await redisConfig()
            const cashProduct: string | null | undefined | Date = await client?.get('allProducts') 
            // let getuser = client?.get("username")
            // console.log(await getuser);
            if(!cashProduct){
                const products= await datasource
                .getRepository(ProductsEntity)
                .find()

                await client?.setEx("allProducts", 20, JSON.stringify(products))
                res.status(200).json({
                    status: <number>200,
                    data: products 
                })
            }else {
                res.status(200).json({
                    status: <number>200,
                    data: JSON.parse(cashProduct)
                })
            }

        } catch (error: unknown) {
            next(error)
        }
    }

    async GETBYID(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {id} = req.params
            const products = await datasource
            .getRepository(ProductsEntity)
            .findOneBy({product_id: id})
            if(!products){
                res.json([])
            }
            
            res.status(200).json({status:200, data:products})
        } catch (error: unknown) {
            next(error)
        }
    }

    async POST(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const { product_title, price, description, author,catalog_id, language, title,gender,season,brand,material} = req.body
            const Values:Object = {
                product_title,
                price,
                description,
                catalog: catalog_id,
                title: title || null,
                author: author || null,
                language: language || null,
                gender: gender || null,
                season: season || null,
                brand: brand || null,
                material: material ||null
            }
            const {raw: [raw]} = await datasource
            .getRepository(ProductsEntity)
            .createQueryBuilder()
            .insert()
            .into(ProductsEntity)
            .values(Values)
            .execute()

            
            res.status(201).json({
                status:<number>201,
                message: <string>"created",
                data: <Object>Values
            })
        } catch (error: unknown) {
            next(error)
        }
    }
    async UPDATE(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const { product_title, price, description, author, language, title,gender,season,brand,material} = req.body
            const {id} = req.params
            const findProduct = await datasource.getRepository(ProductsEntity).findOneBy({product_id: id})
            if(!findProduct){
                res.status(401).json({status:<number>401, message: "product not found"})
            }
            const Values:Object = {
                product_title: product_title || findProduct?.product_title,
                price: price || findProduct?.price,
                description: description || findProduct?.description,
                author: author || null || findProduct?.author,
                language: language || null || findProduct?.language,
                gender: gender || null || findProduct?.gender,
                season: season || null || findProduct?.season,
                brand: brand || null || findProduct?.brand,
                material: material ||null || findProduct?.material
            }
            const {raw: [raw]} = await datasource
            .getRepository(ProductsEntity)
            .createQueryBuilder()
            .update('products')
            .set(Values)
            .where({product_id:id})
            .execute()

            
            res.status(201).json({
                status: <number>201,
                message: <string>"updated",
                data: <Object>Values
            })
        } catch (error: unknown) {
            next(error)
        }
    }
    async DELETE(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const {id} = req.params
            const findProduct = await datasource.getRepository(ProductsEntity).findOneBy({product_id: id})
            if(!findProduct){
                res.status(400).json({status:<number>400, message: "product not found"})
            }
            
            const {raw: [raw]} = await datasource
            .getRepository(ProductsEntity)
            .createQueryBuilder()
            .delete()
            .from('products')
            .where({product_id:id})
            .execute()

            
            res.status(201).json({
                status: <number>201,
                message: <string>"deleted"
            })
        } catch (error: unknown) {
            next(error)
        }
    }

    // async GETPOPULAR(req:Request,res:Response,next:NextFunction):Promise<void>{
    //     try {
            
    //     } catch (error:unknown) {
    //        next(error)
    //     }
    // }
}