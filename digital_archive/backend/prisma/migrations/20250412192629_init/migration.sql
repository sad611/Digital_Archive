-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preservationDate" TIMESTAMP(3) NOT NULL,
    "preservationStatus" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "documentOrigin" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "keywords" TEXT[],
    "ownerId" INTEGER NOT NULL,
    "archivematicaSipId" TEXT,
    "archivematicaAipId" TEXT,
    "storagePath" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
