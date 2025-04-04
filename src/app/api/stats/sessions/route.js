import { NextResponse } from 'next/server'
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Get session type distribution
    const typeDistribution = await prisma.sessions.groupBy({
      by: ['Type'],
      _count: {
        SessionID: true
      }
    })

    // Get match results
    const games = await prisma.sessions.findMany({
      where: {
        Type: 'Game'
      },
      select: {
        ScoreTeam1: true,
        ScoreTeam2: true
      }
    })

    // Calculate match results distribution
    const matchResults = [
      { name: 'Win', value: games.filter(g => g.ScoreTeam1 > g.ScoreTeam2).length },
      { name: 'Loss', value: games.filter(g => g.ScoreTeam1 < g.ScoreTeam2).length },
      { name: 'Draw', value: games.filter(g => g.ScoreTeam1 === g.ScoreTeam2).length }
    ]

    // Get recent matches
    const recentMatches = await prisma.sessions.findMany({
      where: {
        Type: 'Game'
      },
      select: {
        DateTime: true,
        ScoreTeam1: true,
        ScoreTeam2: true,
        teaminformation_sessions_Team1IDToteaminformation: {
          select: { TeamName: true }
        },
        teaminformation_sessions_Team2IDToteaminformation: {
          select: { TeamName: true }
        }
      },
      orderBy: {
        DateTime: 'desc'
      },
      take: 5
    })

    return NextResponse.json({
      typeDistribution: typeDistribution.map(type => ({
        name: type.Type,
        value: type._count.SessionID
      })),
      matchResults,
      recentMatches: recentMatches.map(match => ({
        date: match.DateTime,
        team1: match.teaminformation_sessions_Team1IDToteaminformation?.TeamName || 'Team 1',
        team2: match.teaminformation_sessions_Team2IDToteaminformation?.TeamName || 'Team 2',
        score1: match.ScoreTeam1,
        score2: match.ScoreTeam2
      })),
      scoreDistribution: [
        { range: '0-10', scored: 15, conceded: 12 },
        { range: '11-20', scored: 25, conceded: 18 },
        { range: '21-30', scored: 30, conceded: 28 },
        { range: '31+', scored: 10, conceded: 15 }
      ]
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
