import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675624672420 implements MigrationInterface {
    name = 'table1675624672420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone" TO "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "phone"`);
    }

}
