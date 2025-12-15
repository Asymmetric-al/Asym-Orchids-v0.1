import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-foreground">Orchids</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Mission-Focused Giving Platform
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Connect donors with missionaries. Manage support, track giving, and empower mission work around the world.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-4xl gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>For Donors</CardTitle>
              <CardDescription>Support missionaries you care about</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse missionary profiles, set up recurring gifts, and track your giving history.
              </p>
              <Link href="/dashboard" className="mt-4 inline-block">
                <Button variant="outline" size="sm">Donor Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Missionaries</CardTitle>
              <CardDescription>Manage your support network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share updates, track funding goals, and connect with your supporters.
              </p>
              <Link href="/dashboard" className="mt-4 inline-block">
                <Button variant="outline" size="sm">Missionary Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Organizations</CardTitle>
              <CardDescription>Oversee your mission network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Administer missionaries, manage donors, and generate reports.
              </p>
              <Link href="/dashboard" className="mt-4 inline-block">
                <Button variant="outline" size="sm">Admin Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Orchids Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}