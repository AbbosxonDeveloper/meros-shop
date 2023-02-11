import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { SubCategoriesEntity } from "./subcategories.entity"
import { ProductsEntity } from "./products.entity"

@Entity({
  name: "catalogs",
})
export class CatalogsEntity {
  @PrimaryGeneratedColumn("uuid")
  catalog_id: string

  @Column({
    type: "character varying",
    unique: true,
    length: 46,
  })
  catalog_title: string

  @OneToMany(() => ProductsEntity, (products) => products.catalog)
  products: ProductsEntity[]

  @ManyToOne(() => SubCategoriesEntity, (subcategories) => subcategories.catalogs, {
    cascade: true,
    onDelete: "CASCADE",
  })
  subcategory: SubCategoriesEntity[]
}
