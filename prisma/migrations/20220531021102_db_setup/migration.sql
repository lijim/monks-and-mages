-- CreateTable
CREATE TABLE "User" (
    "uid" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "SavedDeck" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userUid" VARCHAR(255) NOT NULL,

    CONSTRAINT "SavedDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guests" TEXT[],
    "winningGuests" TEXT[],

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayedGames" (
    "A" TEXT NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_WonGames" (
    "A" TEXT NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayedGames_AB_unique" ON "_PlayedGames"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayedGames_B_index" ON "_PlayedGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WonGames_AB_unique" ON "_WonGames"("A", "B");

-- CreateIndex
CREATE INDEX "_WonGames_B_index" ON "_WonGames"("B");

-- AddForeignKey
ALTER TABLE "SavedDeck" ADD CONSTRAINT "SavedDeck_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayedGames" ADD CONSTRAINT "_PlayedGames_A_fkey" FOREIGN KEY ("A") REFERENCES "GameResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayedGames" ADD CONSTRAINT "_PlayedGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WonGames" ADD CONSTRAINT "_WonGames_A_fkey" FOREIGN KEY ("A") REFERENCES "GameResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WonGames" ADD CONSTRAINT "_WonGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
