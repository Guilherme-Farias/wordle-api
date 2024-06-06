-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL,
    "word" VARCHAR(5) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "words_date_key" ON "words"("date");
