/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imagePath` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Image_destinationId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

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
    "category_id" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "destinations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("airport_stopover", "category_id", "created_at", "departure_airport", "departure_dates", "destination_airport", "flight_company", "flight_stopver", "id", "name", "price", "regular_price", "return_dates", "updated_at") SELECT "airport_stopover", "category_id", "created_at", "departure_airport", "departure_dates", "destination_airport", "flight_company", "flight_stopver", "id", "name", "price", "regular_price", "return_dates", "updated_at" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
