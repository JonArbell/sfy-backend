-- CreateIndex
CREATE INDEX "url_access_expiration_date_idx" ON "url_access"("expiration_date");

-- CreateIndex
CREATE INDEX "url_access_url_id_idx" ON "url_access"("url_id");

-- CreateIndex
CREATE INDEX "urls_original_idx" ON "urls"("original");

-- CreateIndex
CREATE INDEX "urls_short_idx" ON "urls"("short");

-- CreateIndex
CREATE INDEX "urls_user_id_idx" ON "urls"("user_id");

-- CreateIndex
CREATE INDEX "user_profiles_full_name_idx" ON "user_profiles"("full_name");

-- CreateIndex
CREATE INDEX "user_profiles_email_idx" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_user_id_idx" ON "user_profiles"("user_id");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "visitors_ip_address_idx" ON "visitors"("ip_address");

-- CreateIndex
CREATE INDEX "visits_url_id_idx" ON "visits"("url_id");

-- CreateIndex
CREATE INDEX "visits_visitor_id_idx" ON "visits"("visitor_id");

-- CreateIndex
CREATE INDEX "visits_visited_at_idx" ON "visits"("visited_at");
