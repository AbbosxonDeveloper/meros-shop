import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675622912747 implements MigrationInterface {
    name = 'table1675622912747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(150)`);
    }

}
