import Joi from "joi"

export const CreateProduct = Joi.object({
  product_title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  catalog_id: Joi.string().required(),
  title: Joi.string(),
  author: Joi.string(),
  language: Joi.string(),
  gender: Joi.string(),
  season: Joi.string(),
  brand: Joi.string(),
  material: Joi.string(),
})

export const CreateOrder = Joi.object({
  product_id: Joi.string().required(),
  count: Joi.number(),
})

export const UpdateProduct = Joi.object({
  product_title: Joi.string().max(50),
  price: Joi.number(),
  gender: Joi.valid("male", "female"),
  language: Joi.string(),
  description: Joi.string(),
  catalog: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  season: Joi.string(),
  brand: Joi.string(),
  material: Joi.string(),
})
