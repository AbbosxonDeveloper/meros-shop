import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { CategoriesEntity } from "./categories.entity"
import { CatalogsEntity } from "./catalogs.entity"

@Entity({
  name: "subcategories",
})
export class SubCategoriesEntity {
  @PrimaryGeneratedColumn("uuid")
  subcategory_id: string

  @Column({
    type: "character varying",
    unique: true,
    length: 46,
  })
  subcategory_title: string

  @OneToMany(() => CatalogsEntity, (catalogs) => catalogs.subcategory)
  catalogs: CatalogsEntity

  @ManyToOne(() => CategoriesEntity, (categories) => categories.subcategories, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: CategoriesEntity[]
}
