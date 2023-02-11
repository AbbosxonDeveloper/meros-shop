import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676103181529 implements MigrationInterface {
    name = 'table1676103181529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_title" character varying(36) NOT NULL, CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1" UNIQUE ("category_title"), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "subcategories" ("subcategory_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subcategory_title" character varying(46) NOT NULL, "categoryCategoryId" uuid, CONSTRAINT "UQ_0f8577ed0e120eb3b88db304297" UNIQUE ("subcategory_title"), CONSTRAINT "PK_4ee1ca1b5f9bde9c995002007f9" PRIMARY KEY ("subcategory_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "count" integer DEFAULT '1', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "orderUserUserId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(46) NOT NULL, "password" character varying(36) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(15) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment_title" character varying(36) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "commentUserUserId" uuid, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_title" character varying(100) NOT NULL, "description" character varying(300) NOT NULL, "price" integer NOT NULL, "author" character varying(60), "language" character varying(30), "title" character varying(35), "gender" character varying(10), "season" character varying(25), "brand" character varying(25), "material" character varying(28), "catalogCatalogId" uuid, CONSTRAINT "UQ_246038d1c47c99f7d844620d798" UNIQUE ("product_title"), CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "catalogs" ("catalog_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "catalog_title" character varying(46) NOT NULL, "subcategorySubcategoryId" uuid, CONSTRAINT "UQ_ba9a685de0f9fa564bffe205087" UNIQUE ("catalog_title"), CONSTRAINT "PK_ac5e241ce7d55e50b80d200d800" PRIMARY KEY ("catalog_id"))`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_e77accfbb437800cf46b58814fb" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2e26cc8b8401d0f9555b3b74f08" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d357b127ff32548b4d489e1ac40" FOREIGN KEY ("orderUserUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2f667f9aac724c602061e472014" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_62d227134c4aa0c012d64059033" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_492e21869cfeb5774b51ac60f5f" FOREIGN KEY ("catalogCatalogId") REFERENCES "catalogs"("catalog_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "catalogs" ADD CONSTRAINT "FK_ec2dcd8e9115ac83dec8d8a9f32" FOREIGN KEY ("subcategorySubcategoryId") REFERENCES "subcategories"("subcategory_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "catalogs" DROP CONSTRAINT "FK_ec2dcd8e9115ac83dec8d8a9f32"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_492e21869cfeb5774b51ac60f5f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_62d227134c4aa0c012d64059033"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2f667f9aac724c602061e472014"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d357b127ff32548b4d489e1ac40"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2e26cc8b8401d0f9555b3b74f08"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_e77accfbb437800cf46b58814fb"`);
        await queryRunner.query(`DROP TABLE "catalogs"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
