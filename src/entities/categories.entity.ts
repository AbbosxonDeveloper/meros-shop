import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { SubCategoriesEntity } from "./subcategories.entity"

@Entity({
  name: "categories",
})
export class CategoriesEntity {
  @PrimaryGeneratedColumn("uuid")
  category_id: string

  @Column({
    type: "character varying",
    unique: true,
    length: 36,
  })
  category_title: string

  @OneToMany(() => SubCategoriesEntity, (subcategories) => subcategories.category)
  subcategories: SubCategoriesEntity[]
}
