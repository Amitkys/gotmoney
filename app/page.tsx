import prisma from "@/lib/db"
import { getContributionData } from "@/app/lib/data";
import  {ContributionData}  from "@/components/ui/ContributionData";



export default async function home() {
  const data = await getContributionData();

  return (
    <div>
    <ContributionData data={data} />
    </div>

  )
}