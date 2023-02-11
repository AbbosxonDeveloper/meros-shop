import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm"
import { ProductsEntity } from "./products.entity"
import { UsersEntity } from "./users.entity"

@Entity({
  name: "orders",
})
export class OrdersEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string

  @CreateDateColumn()
  createdAt: Date

  @Column({
    nullable: true,
    type: "integer",
    default: 1,
  })
  count: number

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => ProductsEntity, (products) => products.orders, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  product: ProductsEntity[]

  @ManyToOne(() => UsersEntity, (users) => users.orders, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order_user: UsersEntity[]
}
