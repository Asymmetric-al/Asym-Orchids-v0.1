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
  ChevronRight,
  MapPin,
  BarChart3,
  ArrowUpRight,
  Play
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

const missionaries = [
  { name: "John & Jane Doe", location: "Chiang Mai, Thailand", status: "On Field" },
  { name: "Sarah Smith", location: "Nairobi, Kenya", status: "On Field" },
];

const stats = [
  { value: "500+", label: "Missionaries" },
  { value: "100+", label: "Countries" },
  { value: "$2.4M", label: "Given" },
  { value: "12.8k", label: "Transactions" },
];

const trustedBy = ["Crossworld", "ABWE", "ReachGlobal", "Pioneers", "Ethnos360"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased selection:bg-foreground/5">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground">
              <span className="font-semibold text-background text-sm">A</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">asymmetric.al</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-full px-4">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-transparent" />
          
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Mission-focused platform</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-[1.1]"
            >
              Empowering Kingdom
              <br />
              Impact Worldwide
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-6 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg"
            >
              Connect donors with missionaries. Manage support, track giving, and empower mission work around the globe.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link href="/register">
                <Button size="lg" className="h-12 rounded-full px-6 text-base">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 rounded-full px-6 text-base border-border/60">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <span className="text-xs uppercase tracking-wider">Trusted by</span>
              {trustedBy.map((name) => (
                <span key={name} className="font-medium text-foreground/70">{name}</span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat, i) => (
                <div 
                  key={stat.label}
                  className="group rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-border hover:shadow-sm"
                >
                  <div className="text-2xl font-semibold tracking-tight md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Built for Every Role
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you're giving, serving, or leading—we have the tools you need.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:border-border hover:shadow-lg"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">For Donors</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Browse missionary profiles, set up recurring gifts, track your giving history, and see the real impact of your generosity.
                </p>
                
                <div className="mt-6 rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Monthly Giving</span>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-0 text-xs">+12%</Badge>
                  </div>
                  <div className="mt-3 flex items-end gap-1 h-12">
                    {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 78, 95].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-foreground/20 rounded-sm transition-colors group-hover:bg-foreground/30"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                
                <Link href="/donor-dashboard" className="mt-6 inline-flex items-center text-sm font-medium hover:underline underline-offset-4">
                  Donor Portal 
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:border-border hover:shadow-lg"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">For Missionaries</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Manage support, share updates with your team, and focus on your mission without the administrative burden.
                </p>
                
                <div className="mt-6 space-y-2">
                  {missionaries.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 transition-colors group-hover:bg-muted/70">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-foreground/10 text-xs font-medium">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</AvatarFallback>
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
                
                <Link href="/missionary-dashboard" className="mt-6 inline-flex items-center text-sm font-medium hover:underline underline-offset-4">
                  Missionary Portal 
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl border border-transparent bg-foreground p-8 text-background"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/10">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">For Organizations</h3>
                <p className="mt-2 text-sm text-background/70 leading-relaxed">
                  Administer networks, generate reports, and gain insights into your mission's global impact.
                </p>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background/10 p-4">
                    <BarChart3 className="h-5 w-5 text-background/60 mb-2" />
                    <p className="text-xl font-semibold">12.8k</p>
                    <p className="text-xs text-background/50">Transactions</p>
                  </div>
                  <div className="rounded-xl bg-background/10 p-4">
                    <div className="h-5 w-5 text-background/60 mb-2 flex items-center justify-center text-sm font-medium">4.7</div>
                    <p className="text-xl font-semibold">98%</p>
                    <p className="text-xs text-background/50">Satisfaction</p>
                  </div>
                </div>
                
                <Link href="/mc" className="mt-6 inline-flex items-center text-sm font-medium text-background hover:underline underline-offset-4">
                  Mission Control 
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Why Choose Us
              </h2>
              <p className="mt-3 text-muted-foreground">
                Built with purpose, designed with care
              </p>
            </motion.div>
            
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: "Global Reach",
                  description: "Supporting missions across 6 continents and 100+ countries worldwide.",
                },
                {
                  icon: Shield,
                  title: "Secure & Reliable",
                  description: "Bank-grade security ensures your data and donations are always safe.",
                },
                {
                  icon: Zap,
                  title: "Instant Updates",
                  description: "Real-time reporting and notifications keep you connected.",
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-sm"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 transition-colors group-hover:bg-foreground/10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border/50 bg-card p-8 text-center md:p-12"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to Make an Impact?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Join thousands of donors and missionaries using asymmetric.al to transform lives around the world.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/register">
                  <Button size="lg" className="h-12 rounded-full px-6 text-base">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-12 rounded-full px-6 text-base border-border/60">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <span className="font-semibold text-background text-xs">A</span>
              </div>
              <span className="font-medium">asymmetric.al</span>
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
