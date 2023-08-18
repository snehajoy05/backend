import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDepartmentid1692262724382 implements MigrationInterface {
    name = 'AddedDepartmentid1692262724382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department_id" TO "department"`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "department" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_a927eecda70146bdf59674d9394" FOREIGN KEY ("department") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_a927eecda70146bdf59674d9394"`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "department" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department" TO "department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
