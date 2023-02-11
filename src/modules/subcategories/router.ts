import { Router } from "express"
import SubCategoriesController from "./controller"
import checkToken from "../../middleware/checkToken"

export default Router()
  .get("/subcategories/get", checkToken, SubCategoriesController.GET)
  .get("/subcategories/get/:id", checkToken, SubCategoriesController.FINDONE)
  .post("/subcategories/create", SubCategoriesController.POST)
  .put("/subcategories/update/:id", SubCategoriesController.PUT)
  .delete("/subcategories/delete/:id", SubCategoriesController.DELETE)
