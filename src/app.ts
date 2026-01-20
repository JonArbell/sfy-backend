import "dotenv/config";
import express, { Application } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app: Application = express();

app.use(express.json());
// app.set('trust proxy', true);

export { prisma, app };
