import { Router } from "express"
import CategoriesController from "./controller"
import checkToken from "../../middleware/checkToken"

export default Router()
  .get("/categories/get", checkToken, CategoriesController.GET)
  .get("/categories/get/:id", checkToken, CategoriesController.FINDONE)
  .post("/categories/create", CategoriesController.POST)
  .put("/categories/update/:id", CategoriesController.PUT)
  .delete("/categories/delete/:id", CategoriesController.DELETE)
