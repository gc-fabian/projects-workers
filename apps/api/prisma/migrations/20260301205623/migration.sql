/*
  Warnings:

  - A unique constraint covering the columns `[name,clientName,startDate]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "projects_name_clientName_startDate_key" ON "projects"("name", "clientName", "startDate");
