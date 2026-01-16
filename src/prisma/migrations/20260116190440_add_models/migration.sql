-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "icon" TEXT,
    "user_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url_access" (
    "id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "url_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "device_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,
    "visited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE INDEX "user_profiles_full_name_idx" ON "user_profiles"("full_name");

-- CreateIndex
CREATE INDEX "user_profiles_email_idx" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_user_id_idx" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_key" ON "urls"("short");

-- CreateIndex
CREATE INDEX "urls_original_idx" ON "urls"("original");

-- CreateIndex
CREATE INDEX "urls_short_idx" ON "urls"("short");

-- CreateIndex
CREATE INDEX "urls_user_id_idx" ON "urls"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "url_access_url_id_key" ON "url_access"("url_id");

-- CreateIndex
CREATE INDEX "url_access_expiration_date_idx" ON "url_access"("expiration_date");

-- CreateIndex
CREATE INDEX "url_access_url_id_idx" ON "url_access"("url_id");

-- CreateIndex
CREATE UNIQUE INDEX "visitors_ip_address_key" ON "visitors"("ip_address");

-- CreateIndex
CREATE INDEX "visitors_ip_address_idx" ON "visitors"("ip_address");

-- CreateIndex
CREATE INDEX "visits_url_id_idx" ON "visits"("url_id");

-- CreateIndex
CREATE INDEX "visits_visitor_id_idx" ON "visits"("visitor_id");

-- CreateIndex
CREATE INDEX "visits_visited_at_idx" ON "visits"("visited_at");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_access" ADD CONSTRAINT "url_access_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
