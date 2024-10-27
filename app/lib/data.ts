"use server";
import prisma from "@/lib/db";
export async function getContributionData(){
    const data = await prisma.contribution.findMany();
    return data;
}