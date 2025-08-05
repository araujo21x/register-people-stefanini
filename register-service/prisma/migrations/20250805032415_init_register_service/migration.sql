-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "public"."users" (
    "_id" UUID NOT NULL,
    "email" VARCHAR(225) NOT NULL,
    "password" VARCHAR(225) NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "last_name" VARCHAR(225) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."people" (
    "_id" UUID NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "gender" "public"."Gender",
    "email" VARCHAR(225),
    "birthday" VARCHAR(10) NOT NULL,
    "place_birth" VARCHAR(100),
    "nationality" VARCHAR(100),
    "cpf" VARCHAR(11) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
    "_id" UUID NOT NULL,
    "street" VARCHAR(225) NOT NULL,
    "number" VARCHAR(10) NOT NULL DEFAULT 'N/A',
    "complement" VARCHAR(225),
    "neighborhood" VARCHAR(225) NOT NULL,
    "city" VARCHAR(225) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "zip_code" VARCHAR(8) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "people_id" UUID NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_people_id_key" ON "public"."addresses"("people_id");

-- AddForeignKey
ALTER TABLE "public"."people" ADD CONSTRAINT "people_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "public"."people"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
