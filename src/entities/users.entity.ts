import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CommentsEntity } from "./comments.entity"
import { OrdersEntity } from "./orders.entity"

@Entity({
  name: "users",
})
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string

  @Column({
    type: "character varying",
    length: 46,
  })
  name: string

  @Column({
    type: "character varying",
    length: 36,
  })
  password: string

  @Column({
    type: "character varying",
    unique: true,
    length: 150,
  })
  email: string

  @Column({
    type: "character varying",
    unique: true,
    length: 15,
  })
  phone: string

  @OneToMany(() => CommentsEntity, (comments) => comments.comment_user)
  comments: CommentsEntity[]
  @OneToMany(() => OrdersEntity, (orders) => orders.order_user)
  orders: OrdersEntity[]
}
