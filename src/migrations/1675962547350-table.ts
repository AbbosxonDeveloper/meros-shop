import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675962547350 implements MigrationInterface {
    name = 'table1675962547350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_title" character varying(100) NOT NULL, "price" character varying(34) NOT NULL, "catalogCatalogId" uuid, CONSTRAINT "UQ_246038d1c47c99f7d844620d798" UNIQUE ("product_title"), CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "category_title"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "category_title" character varying(36)`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1" UNIQUE ("category_title")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_492e21869cfeb5774b51ac60f5f" FOREIGN KEY ("catalogCatalogId") REFERENCES "catalogs"("catalog_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_492e21869cfeb5774b51ac60f5f"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "category_title"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "category_title" character varying(184) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1" UNIQUE ("category_title")`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
