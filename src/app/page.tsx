import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Building2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">O</div>
            <span className="text-xl font-bold tracking-tight text-foreground">Orchids</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-4 py-20 md:py-32">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Mission-Focused
              <span className="block text-primary">Giving Platform</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Connect donors with missionaries. Manage support, track giving, and empower mission work around the world with a platform built for kingdom impact.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold tracking-tight">Built for Every Role</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Whether you're giving, serving, or leading, Orchids provides the tools you need.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">For Donors</CardTitle>
                  <CardDescription>Support missionaries you care about</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Browse missionary profiles, set up recurring gifts, track your giving history, and see the real impact of your generosity.
                  </p>
                  <Link href="/dashboard" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Donor Portal <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">For Missionaries</CardTitle>
                  <CardDescription>Manage your support network</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Share updates with supporters, track your funding goals, connect with your community, and focus on what matters most.
                  </p>
                  <Link href="/dashboard" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Missionary Portal <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">For Organizations</CardTitle>
                  <CardDescription>Oversee your mission network</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Administer missionaries, manage donors, generate reports, and gain insights into your organization's global impact.
                  </p>
                  <Link href="/dashboard" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Admin Portal <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Orchids Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}