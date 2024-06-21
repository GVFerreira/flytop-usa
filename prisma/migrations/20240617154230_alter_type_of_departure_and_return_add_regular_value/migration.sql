/*
  Warnings:

  - You are about to drop the column `airport_stopover` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `departure_airport` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `departure_date` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `destination_airport` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `flight_company` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `flight_stopover` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `return_date` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `destinations` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureAirport` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationAirport` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightCompany` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regularValue` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDate` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "regularValue" REAL NOT NULL,
    "departureDate" TEXT NOT NULL,
    "returnDate" TEXT NOT NULL,
    "flightCompany" TEXT NOT NULL,
    "departureAirport" TEXT NOT NULL,
    "destinationAirport" TEXT NOT NULL,
    "flightStopover" BOOLEAN,
    "airportStopover" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "destinations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("id", "name", "value") SELECT "id", "name", "value" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
