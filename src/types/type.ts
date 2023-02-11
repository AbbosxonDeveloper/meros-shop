import express from "express"

declare global {
  namespace Express {
    export interface Request {
      result: {
        id?: string
        title?: string
        price?: string
        email?: string
        password?: string
        user_id?: string
        product_id?: string
      }
    }
  }
}
