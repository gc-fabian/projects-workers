console.log("[DB]", { cwd: process.cwd(), url: process.env.DATABASE_URL });

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
