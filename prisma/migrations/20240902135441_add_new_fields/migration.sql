/*
  Warnings:

  - Added the required column `description` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);
INSERT INTO "new_Character" ("id", "name") SELECT "id", "name" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE TABLE "new_Comic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "publishedDate" TEXT NOT NULL
);
INSERT INTO "new_Comic" ("id", "title") SELECT "id", "title" FROM "Comic";
DROP TABLE "Comic";
ALTER TABLE "new_Comic" RENAME TO "Comic";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
