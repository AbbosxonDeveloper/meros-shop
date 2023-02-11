import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676010976207 implements MigrationInterface {
    name = 'table1676010976207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "author" character varying(60)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "language" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying(35)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "gender" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "season" character varying(25)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying(25)`);
        await queryRunner.query(`ALTER TABLE "products" ADD "material" character varying(28)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "material"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "season"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

}
