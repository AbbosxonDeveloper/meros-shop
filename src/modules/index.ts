import { Router } from "express"
import usersRouter from "./users/router"
import categoriesRouter from "./categories/router"
import subcategoriesRouter from "./subcategories/router"
import catalogsRouter from "./catalogs/router"
import productsRouter from "./products/router"
import commentsRouter from "./comments/router"
import ordersRouter from "./orders/router"

export default Router().use(
  usersRouter,
  categoriesRouter,
  subcategoriesRouter,
  catalogsRouter,
  productsRouter,
  commentsRouter,
  ordersRouter,
)
