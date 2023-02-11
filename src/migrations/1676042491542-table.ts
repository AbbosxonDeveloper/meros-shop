import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676042491542 implements MigrationInterface {
    name = 'table1676042491542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment_title" character varying(36) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "commentUserUserId" uuid, CONSTRAINT "UQ_e241f8cf326316585fe7f5f7f3c" UNIQUE ("comment_title"), CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2f667f9aac724c602061e472014" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_62d227134c4aa0c012d64059033" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_62d227134c4aa0c012d64059033"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2f667f9aac724c602061e472014"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
