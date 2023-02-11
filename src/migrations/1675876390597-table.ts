import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675876390597 implements MigrationInterface {
    name = 'table1675876390597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "catalogs" ("subcategory_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "catalog_title" character varying(46) NOT NULL, "subcategorySubcategoryId" uuid, CONSTRAINT "UQ_ba9a685de0f9fa564bffe205087" UNIQUE ("catalog_title"), CONSTRAINT "PK_8378ff51e02d01c779a1b125bbc" PRIMARY KEY ("subcategory_id"))`);
        await queryRunner.query(`ALTER TABLE "catalogs" ADD CONSTRAINT "FK_ec2dcd8e9115ac83dec8d8a9f32" FOREIGN KEY ("subcategorySubcategoryId") REFERENCES "subcategories"("subcategory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "catalogs" DROP CONSTRAINT "FK_ec2dcd8e9115ac83dec8d8a9f32"`);
        await queryRunner.query(`DROP TABLE "catalogs"`);
    }

}
