-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "alcohol" BOOLEAN NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
