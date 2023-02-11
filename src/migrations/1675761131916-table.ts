import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675761131916 implements MigrationInterface {
    name = 'table1675761131916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "UQ_0f8577ed0e120eb3b88db304297" UNIQUE ("subcategory_title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "UQ_0f8577ed0e120eb3b88db304297"`);
    }

}
