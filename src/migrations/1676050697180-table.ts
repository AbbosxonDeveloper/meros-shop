import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676050697180 implements MigrationInterface {
    name = 'table1676050697180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_62d227134c4aa0c012d64059033"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_62d227134c4aa0c012d64059033" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_62d227134c4aa0c012d64059033"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_62d227134c4aa0c012d64059033" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
