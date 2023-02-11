import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675758036166 implements MigrationInterface {
    name = 'table1675758036166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategories" ("subcategory_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subcategory_title" character varying(46) NOT NULL, "categoriesCategoryId" uuid, CONSTRAINT "PK_4ee1ca1b5f9bde9c995002007f9" PRIMARY KEY ("subcategory_id"))`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_6c0db00b0b7cd617ce3840286c4" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_6c0db00b0b7cd617ce3840286c4"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
    }

}
