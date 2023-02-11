import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676002754000 implements MigrationInterface {
    name = 'table1676002754000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "category_title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "category_title" DROP NOT NULL`);
    }

}
