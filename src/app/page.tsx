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
  GithubIcon,
  TwitterIcon,
  SearchIcon,
  MenuIcon,
  SquarePlusIcon
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MotionPreset } from "@/components/ui/motion-preset";
import MenuNavigation from "@/components/shadcn-studio/blocks/menu-navigation";
import MenuDropdown from "@/components/shadcn-studio/blocks/menu-dropdown";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/menu-navigation";
import Logo from "@/components/shadcn-studio/logo";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navigationData: NavigationSection[] = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "About", href: "#about" },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "#" },
      { title: "API Reference", href: "#" },
      { title: "Support", href: "#" }
    ]
  }
];

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased selection:bg-foreground/5">
      <header
        className={cn(
          "fixed top-0 z-50 h-16 w-full transition-all duration-300",
          { "bg-card/75 shadow-md backdrop-blur": isScrolled }
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Logo className="gap-3" />
          </Link>

          <div className="flex items-center max-lg:gap-4">
            <MenuNavigation navigationData={navigationData} className="max-lg:hidden" />
            <Separator orientation="vertical" className="bg-muted-foreground mx-3 h-6 max-lg:hidden" />

            <div className="flex items-center max-sm:hidden">
              <Button variant="ghost" size="icon" asChild>
                <a href="#"><SearchIcon className="size-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#"><GithubIcon className="size-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#"><TwitterIcon className="size-5" /></a>
              </Button>
            </div>

            <Button className="lg:ml-4" asChild>
              <Link href="/login">Sign In</Link>
            </Button>

            <MenuDropdown
              align="end"
              navigationData={navigationData}
              trigger={
                <Button variant="outline" size="icon" className="lg:hidden">
                  <MenuIcon />
                  <span className="sr-only">Menu</span>
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="bg-muted flex min-h-[calc(100vh-4rem)] w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-full items-start">
              <div className="z-10 flex w-full flex-col items-center gap-7 py-32 max-lg:text-center lg:items-start lg:py-24">
                <MotionPreset
                  fade
                  slide
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 rounded-md border bg-card px-4 py-2.5"
                >
                  <p className="font-semibold uppercase text-sm">Mission Platform</p>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#"><SquarePlusIcon className="size-5" /></a>
                    </TooltipTrigger>
                    <TooltipContent>Integrate with your tools</TooltipContent>
                  </Tooltip>
                </MotionPreset>

                <MotionPreset
                  component="h1"
                  fade
                  slide
                  delay={0.3}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-3xl leading-[1.2] font-bold text-pretty sm:text-4xl lg:text-5xl"
                >
                  The{" "}
                  <div className="animate-flip text-muted-foreground relative -mb-px inline-block h-[1.875rem] w-[9.125rem] origin-center [transform-style:preserve-3d] sm:h-9 sm:w-[10.875rem] lg:h-12 lg:w-[14.5rem]">
                    <div className="absolute flex h-full [transform-origin:center] [transform:rotateX(0deg)_translateZ(20px)] [backface-visibility:hidden]">
                      Easiest
                    </div>
                    <div className="absolute flex h-full [transform-origin:center] [transform:rotateX(-120deg)_translateZ(20px)] [backface-visibility:hidden]">
                      Effortless
                    </div>
                    <div className="absolute flex h-full [transform-origin:center] [transform:rotateX(-240deg)_translateZ(20px)] [backface-visibility:hidden]">
                      Seamless
                    </div>
                  </div>
                  <br />
                  Platform for Kingdom Impact
                </MotionPreset>

                <MotionPreset
                  component="p"
                  fade
                  slide
                  delay={0.6}
                  transition={{ duration: 0.5 }}
                  className="text-muted-foreground max-w-xl text-lg"
                >
                  Connect donors with missionaries. Manage support, track giving, and empower mission work around the globe.
                </MotionPreset>

                <MotionPreset
                  fade
                  slide
                  delay={0.9}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button size="lg" className="rounded-lg text-base" asChild>
                    <Link href="/register">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-lg text-base"
                    asChild
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                </MotionPreset>

                <MotionPreset
                  fade
                  slide
                  delay={1.2}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-8"
                >
                  <span className="text-xs uppercase tracking-wider">Trusted by</span>
                  {trustedBy.map((name) => (
                    <span key={name} className="font-medium text-foreground/70">{name}</span>
                  ))}
                </MotionPreset>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <MotionPreset
              fade
              slide={{ direction: "up" }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div 
                  key={stat.label}
                  className="group rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-border hover:shadow-sm"
                >
                  <div className="text-2xl font-semibold tracking-tight md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </MotionPreset>
          </div>
        </section>

        <section id="features" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MotionPreset 
              fade
              slide={{ direction: "up" }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Built for Every Role
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you&apos;re giving, serving, or leading—we have the tools you need.
              </p>
            </MotionPreset>

            <div className="grid gap-4 md:grid-cols-3">
              <MotionPreset 
                fade
                slide={{ direction: "up" }}
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
              </MotionPreset>

              <MotionPreset 
                fade
                slide={{ direction: "up" }}
                delay={0.1}
                transition={{ duration: 0.5 }}
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
                  Missionary Dashboard 
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </MotionPreset>

              <MotionPreset 
                fade
                slide={{ direction: "up" }}
                delay={0.2}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-transparent bg-foreground p-8 text-background"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/10">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">For Organizations</h3>
                <p className="mt-2 text-sm text-background/70 leading-relaxed">
                  Administer networks, generate reports, and gain insights into your mission&apos;s global impact.
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
              </MotionPreset>
            </div>
          </div>
        </section>
        
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <MotionPreset
              fade
              slide={{ direction: "up" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Why Choose Us
              </h2>
              <p className="mt-3 text-muted-foreground">
                Built with purpose, designed with care
              </p>
            </MotionPreset>
            
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
                <MotionPreset
                  key={i}
                  fade
                  slide={{ direction: "up" }}
                  delay={i * 0.1}
                  transition={{ duration: 0.5 }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-sm"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 transition-colors group-hover:bg-foreground/10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <MotionPreset
              fade
              slide={{ direction: "up" }}
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
            </MotionPreset>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} asymmetric.al. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
