import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676051124789 implements MigrationInterface {
    name = 'table1676051124789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2f667f9aac724c602061e472014"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2f667f9aac724c602061e472014" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2f667f9aac724c602061e472014"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2f667f9aac724c602061e472014" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
