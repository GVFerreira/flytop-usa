-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "departure_date" DATETIME NOT NULL,
    "return_date" DATETIME NOT NULL,
    "flight_company" TEXT NOT NULL,
    "departure_airport" TEXT NOT NULL,
    "destination_airport" TEXT NOT NULL,
    "flight_stopover" BOOLEAN NOT NULL,
    "airport_stopover" TEXT NOT NULL
);
