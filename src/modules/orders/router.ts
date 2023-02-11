import { Router } from "express"
import OrdersController from "./controller"
import checkToken from "../../middleware/checkToken"
import { CreateOrder } from "../../middleware/joi_validate"
import validation from "../../middleware/validation"

export default Router()
  .get("/orders/get", checkToken, OrdersController.GET)
  .post("/orders/create", checkToken, validation(CreateOrder), OrdersController.POST)
  .delete("/orders/delete/:id", checkToken, OrdersController.DELETE)
