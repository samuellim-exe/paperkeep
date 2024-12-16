'use client'

import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Dashboard from "@/components/Dashboard"
import IncomeForm from "@/components/IncomeForm"
import ExpenseForm from "@/components/ExpenseForm"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Button onClick={() => signIn("email")}>Sign in with Email</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {session.user.email}</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card className="p-4">
            <Dashboard />
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card className="p-4">
            <IncomeForm />
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="p-4">
            <ExpenseForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
