-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "destinationId" TEXT NOT NULL,
    CONSTRAINT "Image_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_destinationId_key" ON "Image"("destinationId");
