import { Router } from "express"
import ProductsController from "./controller"
import checkToken from "../../middleware/checkToken"
import validation from "../../middleware/validation"
import { CreateProduct, UpdateProduct } from "../../middleware/joi_validate"

export default Router()
  .get("/products/get", checkToken, ProductsController.GET)
  .get("/products/get/:id", ProductsController.GETBYID)
  .post("/products/create", validation(CreateProduct), ProductsController.POST)
  .patch("/products/update/:id", validation(UpdateProduct), ProductsController.UPDATE)
  .delete("/products/delete/:id", ProductsController.DELETE)
