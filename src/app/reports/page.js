'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { useState, useEffect } from 'react'

// Color schemes
const GENDER_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1']
const AGE_COLORS = ['#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#FDCA40']
const SESSION_COLORS = ['#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0']
const PAYMENT_COLORS = ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2']
const RESULT_COLORS = ['#2ECC71', '#E74C3C', '#F1C40F']
const SCORE_COLORS = ['#3498DB', '#9B59B6']

export default function ReportsPage() {
  const [memberStats, setMemberStats] = useState(null)
  const [sessionStats, setSessionStats] = useState(null)
  const [paymentStats, setPaymentStats] = useState(null)

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      const memberRes = await fetch('/api/stats/members')
      const sessionRes = await fetch('/api/stats/sessions')
      const paymentRes = await fetch('/api/stats/payments')
      
      setMemberStats(await memberRes.json())
      setSessionStats(await sessionRes.json())
      setPaymentStats(await paymentRes.json())
    }
    
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Club Analytics Dashboard</h1>
      
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Membership</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="payments">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Member Demographics</CardTitle>
                <CardDescription>Distribution by gender and status</CardDescription>
              </CardHeader>
              <CardContent>
                {memberStats && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={memberStats.genderDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {memberStats.genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Members by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                {memberStats && (
                  <BarChart width={300} height={300} data={memberStats.ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                      {memberStats.ageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Session Types</CardTitle>
                <CardDescription>Games vs Training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionStats && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={sessionStats.typeDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {sessionStats.typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SESSION_COLORS[index % SESSION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Results</CardTitle>
                <CardDescription>Win/Loss/Draw Distribution</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionStats && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={sessionStats.matchResults}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {sessionStats.matchResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={RESULT_COLORS[index % RESULT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Points scored vs conceded</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionStats && (
                  <BarChart width={300} height={300} data={sessionStats.scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scored" fill={SCORE_COLORS[0]} name="Points Scored" />
                    <Bar dataKey="conceded" fill={SCORE_COLORS[1]} name="Points Conceded" />
                  </BarChart>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Match Results</CardTitle>
                <CardDescription>Last 5 games played</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionStats && sessionStats.recentMatches && (
                  <div className="space-y-8">
                    {sessionStats.recentMatches.map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold">{match.team1}</div>
                            <div className="text-sm text-muted-foreground">{match.score1}</div>
                          </div>
                          <div className="text-xl font-bold">vs</div>
                          <div className="text-left">
                            <div className="font-bold">{match.team2}</div>
                            <div className="text-sm text-muted-foreground">{match.score2}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment types</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentStats && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={paymentStats.methodDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {paymentStats.methodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
