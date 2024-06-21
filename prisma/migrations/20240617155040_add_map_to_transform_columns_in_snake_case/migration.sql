/*
  Warnings:

  - You are about to drop the column `airportStopover` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirport` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `departureDate` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAirport` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `flightCompany` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `flightStopover` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `regularValue` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_airport` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_dates` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_airport` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flight_company` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular_price` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `return_dates` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "regular_price" REAL NOT NULL,
    "departure_dates" TEXT NOT NULL,
    "return_dates" TEXT NOT NULL,
    "flight_company" TEXT NOT NULL,
    "departure_airport" TEXT NOT NULL,
    "destination_airport" TEXT NOT NULL,
    "flight_stopver" BOOLEAN,
    "airport_stopover" TEXT,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "destinations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("id", "name") SELECT "id", "name" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("expires", "id") SELECT "expires", "id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
