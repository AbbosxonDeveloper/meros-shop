import UsersController from "./controller"
import { Router } from "express"

export default Router()
  .get("/users/get", UsersController.GET)
  .get("/users/account", UsersController.GETUSER)
  .post("/users/signup", UsersController.SIGNUP)
  .post("/users/login", UsersController.LOGIN)
