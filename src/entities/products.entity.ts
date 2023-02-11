import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { CatalogsEntity } from "./catalogs.entity"
import { CommentsEntity } from "./comments.entity"
import { OrdersEntity } from "./orders.entity"

@Entity({
  name: "products",
})
export class ProductsEntity {
  @PrimaryGeneratedColumn("uuid")
  product_id: string

  @Column({
    type: "character varying",
    unique: true,
    length: 100,
  })
  product_title: string

  @Column({
    type: "character varying",
    length: 300,
  })
  description: string

  @Column({
    type: "integer",
  })
  price: number

  @Column({
    type: "character varying",
    nullable: true,
    length: 60,
  })
  author: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 30,
  })
  language: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 35,
  })
  title: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 10,
  })
  gender: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 25,
  })
  season: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 25,
  })
  brand: string

  @Column({
    type: "character varying",
    nullable: true,
    length: 28,
  })
  material: string

  @ManyToOne(() => CatalogsEntity, (catalog) => catalog.products, {
    cascade: true,
    onDelete: "CASCADE",
  })
  catalog: CatalogsEntity[]

  @OneToMany(() => CommentsEntity, (comments) => comments.comment_user)
  comments: CommentsEntity[]
  @OneToMany(() => OrdersEntity, (orders) => orders.product)
  orders: OrdersEntity[]
}
