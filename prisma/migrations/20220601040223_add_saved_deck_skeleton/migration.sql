/*
  Warnings:

  - Added the required column `skeleton` to the `SavedDeck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedDeck" ADD COLUMN     "skeleton" JSONB NOT NULL;
