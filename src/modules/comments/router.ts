import { Router } from "express"
import CommentsController from "./controller"
import checkToken from "../../middleware/checkToken"

export default Router()
  .get("/comments/get", checkToken, CommentsController.GET)
  .post("/comments/create", checkToken, CommentsController.POST)
  .put("/comments/update/:id", checkToken, CommentsController.PUT)
  .delete("/comments/delete/:id", checkToken, CommentsController.DELETE)
