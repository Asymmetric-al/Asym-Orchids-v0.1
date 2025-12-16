import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Globe, DollarSign, TrendingUp, UserPlus, FileBarChart } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-900">Organization Overview</h2>
        <p className="text-sm text-zinc-500">Monitor and manage your mission network.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700">Total Donations</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-md bg-zinc-100">
              <DollarSign className="h-4 w-4 text-zinc-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-zinc-900">$248,500</div>
            <p className="text-xs text-zinc-500">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700">Active Missionaries</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-md bg-zinc-100">
              <Globe className="h-4 w-4 text-zinc-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-zinc-900">24</div>
            <p className="text-xs text-zinc-500">Across 12 countries</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700">Active Donors</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-md bg-zinc-100">
              <Users className="h-4 w-4 text-zinc-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-zinc-900">186</div>
            <p className="text-xs text-zinc-500">+12 new this month</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700">Avg. Gift Size</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-md bg-zinc-100">
              <TrendingUp className="h-4 w-4 text-zinc-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-zinc-900">$125</div>
            <p className="text-xs text-zinc-500">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border-zinc-200 bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-zinc-900">Quick Actions</CardTitle>
            <CardDescription className="text-zinc-500">Manage your organization</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="w-full justify-start border-zinc-200 text-zinc-700" variant="outline">
              <UserPlus className="mr-2 h-4 w-4 text-zinc-500" />
              Add New Missionary
            </Button>
            <Button className="w-full justify-start border-zinc-200 text-zinc-700" variant="outline">
              <FileBarChart className="mr-2 h-4 w-4 text-zinc-500" />
              Generate Reports
            </Button>
            <Button className="w-full justify-start border-zinc-200 text-zinc-700" variant="outline">
              <Users className="mr-2 h-4 w-4 text-zinc-500" />
              Manage Donors
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
