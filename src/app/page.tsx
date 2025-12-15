"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Building2, ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <span className="font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Orchids</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-muted/50">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="shadow-md hover:shadow-lg transition-all">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
            <div className="absolute left-[calc(50%-40rem)] top-[calc(50%-30rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
          </div>
          
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                Mission-Focused
                <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Giving Platform
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed"
            >
              Connect donors with missionaries. Manage support, track giving, and empower mission work around the world with a platform built for kingdom impact.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-0.5">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-12 px-8 text-base hover:bg-muted/50 border-border/60">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="px-6 py-24 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for Every Role
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you're giving, serving, or leading, Orchids provides the tools you need.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[600px]">
              {/* Donor Card - Large Left */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-border/50 bg-background p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                      <Heart className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">For Donors</h3>
                    <p className="mt-4 text-lg text-muted-foreground max-w-md">
                      Browse missionary profiles, set up recurring gifts, track your giving history, and see the real impact of your generosity in one beautiful dashboard.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      Access Donor Portal <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Missionary Card - Top Right */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-accent/5 blur-3xl transition-all group-hover:bg-accent/10" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-foreground shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For Missionaries</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage support, share updates, and focus on your mission.
                </p>
                <Link href="/dashboard" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Missionary Portal <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Organization Card - Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl transition-all group-hover:bg-blue-500/10" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 shadow-sm">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For Organizations</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Administer networks, generate reports, and gain insights.
                </p>
                <Link href="/mc" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Mission Control <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features / Trust Section */}
        <section className="px-6 py-24">
           <div className="container mx-auto max-w-5xl">
             <div className="grid gap-12 sm:grid-cols-3">
               <div className="text-center">
                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                   <Globe className="h-8 w-8 text-foreground" />
                 </div>
                 <h3 className="text-lg font-bold">Global Reach</h3>
                 <p className="mt-2 text-sm text-muted-foreground">Supporting missions across 6 continents and 100+ countries.</p>
               </div>
               <div className="text-center">
                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                   <Shield className="h-8 w-8 text-foreground" />
                 </div>
                 <h3 className="text-lg font-bold">Secure & Reliable</h3>
                 <p className="mt-2 text-sm text-muted-foreground">Bank-grade security ensures your data and donations are always safe.</p>
               </div>
               <div className="text-center">
                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                   <Zap className="h-8 w-8 text-foreground" />
                 </div>
                 <h3 className="text-lg font-bold">Instant Updates</h3>
                 <p className="mt-2 text-sm text-muted-foreground">Real-time reporting and notifications keep you connected to the impact.</p>
               </div>
             </div>
           </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background py-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Orchids Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}