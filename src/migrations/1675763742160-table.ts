import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675763742160 implements MigrationInterface {
    name = 'table1675763742160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_6c0db00b0b7cd617ce3840286c4"`);
        await queryRunner.query(`ALTER TABLE "subcategories" RENAME COLUMN "categoriesCategoryId" TO "categoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_e77accfbb437800cf46b58814fb" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_e77accfbb437800cf46b58814fb"`);
        await queryRunner.query(`ALTER TABLE "subcategories" RENAME COLUMN "categoryCategoryId" TO "categoriesCategoryId"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_6c0db00b0b7cd617ce3840286c4" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
