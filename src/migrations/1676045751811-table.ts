import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676045751811 implements MigrationInterface {
    name = 'table1676045751811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "UQ_e241f8cf326316585fe7f5f7f3c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "UQ_e241f8cf326316585fe7f5f7f3c" UNIQUE ("comment_title")`);
    }

}
