import { Router } from "express"
import CatalogsController from "./controller"
import checkToken from "../../middleware/checkToken"

export default Router()
  .get("/catalogs/get", checkToken, CatalogsController.GET)
  .get("/catalogs/get/:id", checkToken, CatalogsController.GET)
  .post("/catalogs/create", CatalogsController.POST)
  .put("/catalogs/update/:id", CatalogsController.PUT)
  .delete("/catalogs/delete/:id", CatalogsController.DELETE)
