import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676093812206 implements MigrationInterface {
    name = 'table1676093812206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "count" integer DEFAULT '1', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "orderUserUserId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2e26cc8b8401d0f9555b3b74f08" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d357b127ff32548b4d489e1ac40" FOREIGN KEY ("orderUserUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d357b127ff32548b4d489e1ac40"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2e26cc8b8401d0f9555b3b74f08"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(34) NOT NULL`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
