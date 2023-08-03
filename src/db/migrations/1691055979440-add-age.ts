import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAge1691055979440 implements MigrationInterface {
    name = 'AddAge1691055979440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
    }

}
