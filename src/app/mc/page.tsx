'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, Globe, TrendingUp, AlertCircle } from "lucide-react"
import { useMC } from '@/lib/mission-control/context'

export default function MissionControlPage() {
  const { user } = useMC()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mission Control</h2>
          <p className="text-muted-foreground">
            Overview of your organization&apos;s performance and impact.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missionaries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 completed this quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New Donation Received
                  </p>
                  <p className="text-sm text-muted-foreground">
                    $150.00 from Sarah Johnson to Project Hope
                  </p>
                </div>
                <div className="ml-auto font-medium">+$150.00</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Missionary Application Approved
                  </p>
                  <p className="text-sm text-muted-foreground">
                    John Doe - South East Asia
                  </p>
                </div>
                <div className="ml-auto font-medium text-green-600">Approved</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Campaign Goal Reached
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Clean Water Initiative hit $10k goal
                  </p>
                </div>
                <div className="ml-auto font-medium text-blue-600">Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Platform status and alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">API Status</p>
                  <p className="text-sm text-muted-foreground">Operational</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Database</p>
                  <p className="text-sm text-muted-foreground">Operational</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="flex h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Email Service</p>
                  <p className="text-sm text-muted-foreground">High Latency</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
