-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Destination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "departure_date" DATETIME NOT NULL,
    "return_date" DATETIME NOT NULL,
    "flight_company" TEXT NOT NULL,
    "departure_airport" TEXT NOT NULL,
    "destination_airport" TEXT NOT NULL,
    "flight_stopover" BOOLEAN,
    "airport_stopover" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Destination" ("airport_stopover", "createdAt", "departure_airport", "departure_date", "destination_airport", "flight_company", "flight_stopover", "id", "name", "return_date", "value") SELECT "airport_stopover", "createdAt", "departure_airport", "departure_date", "destination_airport", "flight_company", "flight_stopover", "id", "name", "return_date", "value" FROM "Destination";
DROP TABLE "Destination";
ALTER TABLE "new_Destination" RENAME TO "Destination";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
