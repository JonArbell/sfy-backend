-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_visitor_id_fkey";

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
