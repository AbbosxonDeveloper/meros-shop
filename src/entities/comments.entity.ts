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
  name: "comments",
})
export class CommentsEntity {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string

  @Column({
    type: "character varying",
    length: 36,
  })
  comment_title: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => ProductsEntity, (products) => products.comments, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  product: ProductsEntity[]

  @ManyToOne(() => UsersEntity, (users) => users.comments, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  comment_user: UsersEntity[]
}
