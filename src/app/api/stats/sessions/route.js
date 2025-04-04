// import { prisma } from '@/lib/prisma'
import prisma from "@/lib/db";

import { NextResponse } from 'next/server'

export async function GET() {
  const typeDistribution = await prisma.sessions.groupBy({
    by: ['Type'],
    _count: true,
  })

  return NextResponse.json({
    typeDistribution: typeDistribution.map(t => ({
      name: t.Type || 'Unknown',
      value: t._count,
    })),
  })
}
