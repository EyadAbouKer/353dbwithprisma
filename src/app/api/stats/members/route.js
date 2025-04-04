// import { prisma } from '@/lib/prisma'
import prisma from "@/lib/db";
import { NextResponse } from 'next/server'

export async function GET() {
  // Get gender distribution
  const genderDistribution = await prisma.clubmembers.groupBy({
    by: ['Gender'],
    _count: true,
  })

  // Get age distribution
  const members = await prisma.clubmembers.findMany({
    select: {
      DOB: true,
    },
    where: {
      DOB: {
        not: null,
      },
    },
  })

  const ageGroups = members.reduce((acc, member) => {
    const age = new Date().getFullYear() - new Date(member.DOB).getFullYear()
    const group = Math.floor(age / 10) * 10
    acc[group] = (acc[group] || 0) + 1
    return acc
  }, {})

  return NextResponse.json({
    genderDistribution: genderDistribution.map(g => ({
      name: g.Gender || 'Unknown',
      value: g._count,
    })),
    ageDistribution: Object.entries(ageGroups).map(([age, count]) => ({
      age: `${age}-${parseInt(age) + 9}`,
      count,
    })),
  })
}
