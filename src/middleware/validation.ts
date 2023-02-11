import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { ErrorHandle } from "../lib/errorHandle"

export default (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body)
      if (error) {
        next(res.json({ message: error.message }))
      }
      next()
    } catch (error: unknown) {
      next(new ErrorHandle(500, error as string))
    }
  }
}
