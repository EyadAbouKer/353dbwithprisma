// import { prisma } from '@/lib/prisma'
import prisma from "@/lib/db";
import { NextResponse } from 'next/server'

export async function GET() {
  const methodDistribution = await prisma.payments.groupBy({
    by: ['Method'],
    _count: true,
  })

  // Calculate monthly revenue
  const payments = await prisma.payments.findMany({
    select: {
      PaymentDate: true,
      Amount: true,
    },
    where: {
      PaymentDate: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  })

  return NextResponse.json({
    methodDistribution: methodDistribution.map(m => ({
      name: m.Method || 'Unknown',
      value: m._count,
    })),
  })
}
