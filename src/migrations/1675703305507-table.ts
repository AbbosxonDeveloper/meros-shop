import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675703305507 implements MigrationInterface {
    name = 'table1675703305507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1" UNIQUE ("category_title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_05a875ee1b73fb62b24a6c5f0d1"`);
    }

}
