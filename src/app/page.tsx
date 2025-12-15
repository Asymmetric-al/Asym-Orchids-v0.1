"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Building2, 
  ArrowRight, 
  Globe, 
  Shield, 
  Zap, 
  Sparkles,
  TrendingUp,
  Calendar,
  ChevronRight,
  MapPin,
  Search,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const missionaries = [
  { name: "John & Jane Doe", location: "Chiang Mai, Thailand", status: "On Field", avatar: "/avatars/1.jpg" },
  { name: "Sarah Smith", location: "Nairobi, Kenya", status: "On Field", avatar: "/avatars/2.jpg" },
  { name: "David & Ruth Miller", location: "Chicago, USA", status: "Furlough", avatar: "/avatars/3.jpg" },
  { name: "Paul Chen", location: "X City, East Asia", status: "On Field", avatar: "/avatars/4.jpg" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 transition-all hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <span className="font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">asymmetric.al</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex font-medium">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all font-medium">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative px-6 py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary)_/_0.03)_0%,transparent_50%)]" />
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.03) 1px, transparent 0)`,
              backgroundSize: "32px 32px"
            }} />
          </div>
          
          <motion.div 
            className="container mx-auto max-w-5xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium border-0 bg-primary/10 text-primary">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Mission-Focused Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]"
            >
              Empowering
              <span className="relative mx-3">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent">
                  Kingdom
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/10 -rotate-1 rounded" />
              </span>
              <br className="hidden sm:block" />
              Impact Worldwide
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Connect donors with missionaries. Manage support, track giving, and empower mission work around the globe with a platform built for transformation.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 font-medium">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-12 px-8 text-base font-medium border-border/60 hover:bg-secondary/80">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {String.fromCharCode(64 + i)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>500+ missionaries supported</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>100+ countries</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-6 py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.02) 1px, transparent 0)`,
            backgroundSize: "48px 48px"
          }} />
          
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for Every Role
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Whether you're giving, serving, or leading, asymmetric.al provides the tools you need.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-6 lg:grid-cols-12 auto-rows-[minmax(180px,auto)]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-6 lg:col-span-7 lg:row-span-2 group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl transition-all duration-500 group-hover:from-primary/15" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-60 w-60 rounded-full bg-gradient-to-tr from-chart-2/10 to-transparent blur-3xl" />
                
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      <Heart className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">For Donors</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                      Browse missionary profiles, set up recurring gifts, track your giving history, and see the real impact of your generosity in one beautiful dashboard.
                    </p>
                    
                    <div className="mt-8 p-4 rounded-2xl bg-muted/50 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Monthly Giving</span>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0 text-xs">+12%</Badge>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 78, 95].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-sm transition-all duration-300 hover:from-primary hover:to-primary/60"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/donor-dashboard" className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link">
                    Access Donor Portal 
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-3 lg:col-span-5 group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-gradient-to-br from-chart-2/10 to-transparent blur-3xl" />
                
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 text-chart-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Missionaries</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Manage support, share updates, and focus on your mission.
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    {missionaries.slice(0, 2).map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">{m.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{m.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />{m.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs border-0 shrink-0">{m.status}</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/missionary-dashboard" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link">
                    Missionary Portal 
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-3 lg:col-span-5 group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary to-primary/80 p-6 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
                
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">For Organizations</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Administer networks, generate reports, and gain insights.
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                      <BarChart3 className="h-5 w-5 text-white/70 mb-1" />
                      <p className="text-2xl font-bold text-white">12.8k</p>
                      <p className="text-xs text-white/60">Transactions</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                      <TrendingUp className="h-5 w-5 text-white/70 mb-1" />
                      <p className="text-2xl font-bold text-white">4.7</p>
                      <p className="text-xs text-white/60">Satisfaction</p>
                    </div>
                  </div>
                  
                  <Link href="/mc" className="mt-4 inline-flex items-center text-sm font-semibold text-white hover:text-white/90 transition-colors group/link">
                    Mission Control 
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose Us
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Built with purpose, designed with care
              </p>
            </motion.div>
            
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: "Global Reach",
                  description: "Supporting missions across 6 continents and 100+ countries.",
                  gradient: "from-blue-500/10 to-cyan-500/10"
                },
                {
                  icon: Shield,
                  title: "Secure & Reliable",
                  description: "Bank-grade security ensures your data and donations are safe.",
                  gradient: "from-green-500/10 to-emerald-500/10"
                },
                {
                  icon: Zap,
                  title: "Instant Updates",
                  description: "Real-time reporting and notifications keep you connected.",
                  gradient: "from-amber-500/10 to-orange-500/10"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group text-center p-8 rounded-3xl border border-border/50 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-500"
                >
                  <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.015) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} />
          
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Ready to Make an Impact?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                Join thousands of donors and missionaries using asymmetric.al to transform lives around the world.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 font-medium">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-card py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-bold text-base">A</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">asymmetric.al</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} asymmetric.al. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
