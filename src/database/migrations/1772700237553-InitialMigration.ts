import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1772700237553 implements MigrationInterface {
    name = 'InitialMigration1772700237553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nationalId" character varying(50) NOT NULL, "name" character varying(255) NOT NULL, "dateOfBirth" date NOT NULL, "hireDate" date NOT NULL, "grossSalary" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "employerId" uuid, CONSTRAINT "UQ_c761681a4195bebbd8a37c33432" UNIQUE ("nationalId"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8c7b6425560b798d7cfc0fedb" ON "employees" ("employerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c761681a4195bebbd8a37c3343" ON "employees" ("nationalId") `);
        await queryRunner.query(`CREATE TABLE "contribution_lines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grossSalary" numeric(12,2) NOT NULL, "pensionAmount" numeric(12,2) NOT NULL, "medicalAmount" numeric(12,2) NOT NULL, "maternityAmount" numeric(12,2) NOT NULL, "total" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "employeeId" uuid, "declarationId" uuid, CONSTRAINT "UQ_adc7d5a013abf79d8566527e0de" UNIQUE ("employeeId", "declarationId"), CONSTRAINT "PK_2152e6ee06d6a6631f1899ed398" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_82fad5b7bdd1c93eebee2cc999" ON "contribution_lines" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be368ef8b0d1870185e493d095" ON "contribution_lines" ("declarationId") `);
        await queryRunner.query(`CREATE TABLE "declarations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymentNumber" character varying(50) NOT NULL, "period" character varying(7) NOT NULL, "status" "public"."declarations_status_enum" NOT NULL DEFAULT 'draft', "submittedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "employerId" uuid, CONSTRAINT "UQ_e81be22d5c4d86bf81957973ba6" UNIQUE ("employerId", "period"), CONSTRAINT "UQ_4177ea7be26171b75449a03dc53" UNIQUE ("paymentNumber"), CONSTRAINT "PK_5130900b6f081acc9852743532e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2de167dbe23b90269bb71da87" ON "declarations" ("employerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4177ea7be26171b75449a03dc5" ON "declarations" ("paymentNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9b1a2a21326686e12b1548c38" ON "declarations" ("period") `);
        await queryRunner.query(`CREATE INDEX "IDX_1206142e4d049a06da27076aba" ON "declarations" ("status") `);
        await queryRunner.query(`CREATE TABLE "employers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "tin" character varying(50) NOT NULL, "sector" character varying(100), "registrationDate" date NOT NULL, "status" "public"."employers_status_enum" NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ddca441565747fd3c0a4e614d3f" UNIQUE ("tin"), CONSTRAINT "PK_f2c1aea3e8d7aa3c5fba949c97d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8fa37b8799c5f295beb391a0cc" ON "employers" ("registrationDate") `);
        await queryRunner.query(`CREATE INDEX "IDX_368eb013319db2a84dce696163" ON "employers" ("status") `);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_d8c7b6425560b798d7cfc0fedb8" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution_lines" ADD CONSTRAINT "FK_82fad5b7bdd1c93eebee2cc999d" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution_lines" ADD CONSTRAINT "FK_be368ef8b0d1870185e493d0957" FOREIGN KEY ("declarationId") REFERENCES "declarations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "declarations" ADD CONSTRAINT "FK_b2de167dbe23b90269bb71da875" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "declarations" DROP CONSTRAINT "FK_b2de167dbe23b90269bb71da875"`);
        await queryRunner.query(`ALTER TABLE "contribution_lines" DROP CONSTRAINT "FK_be368ef8b0d1870185e493d0957"`);
        await queryRunner.query(`ALTER TABLE "contribution_lines" DROP CONSTRAINT "FK_82fad5b7bdd1c93eebee2cc999d"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_d8c7b6425560b798d7cfc0fedb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_368eb013319db2a84dce696163"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8fa37b8799c5f295beb391a0cc"`);
        await queryRunner.query(`DROP TABLE "employers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1206142e4d049a06da27076aba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9b1a2a21326686e12b1548c38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4177ea7be26171b75449a03dc5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2de167dbe23b90269bb71da87"`);
        await queryRunner.query(`DROP TABLE "declarations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be368ef8b0d1870185e493d095"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82fad5b7bdd1c93eebee2cc999"`);
        await queryRunner.query(`DROP TABLE "contribution_lines"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c761681a4195bebbd8a37c3343"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8c7b6425560b798d7cfc0fedb"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
