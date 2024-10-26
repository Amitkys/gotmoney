import prisma from "@/lib/db"
export default async function home() {
  const data = prisma.contribution.findMany();
  console.log(data);
  return (
    <div>
      this is home page
    </div>
  )
}