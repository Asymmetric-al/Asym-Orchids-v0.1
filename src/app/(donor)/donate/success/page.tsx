'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, Heart, ArrowLeft, Home } from 'lucide-react'

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const donationId = searchParams.get('donation_id')
  const status = searchParams.get('status')

  const isProcessing = status === 'processing'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-12 px-4 flex items-center justify-center">
      <Card className="max-w-lg w-full shadow-xl border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${
            isProcessing 
              ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
              : 'bg-gradient-to-br from-emerald-400 to-teal-500'
          }`}>
            {isProcessing ? (
              <Clock className="size-10 text-white" />
            ) : (
              <CheckCircle className="size-10 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isProcessing ? 'Payment Processing' : 'Thank You!'}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {isProcessing
              ? 'Your payment is being processed. We\'ll notify you once it\'s complete.'
              : 'Your generous donation has been received successfully.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Donation Reference</p>
            <p className="font-mono text-sm">{donationId || 'N/A'}</p>
          </div>

          {!isProcessing && (
            <div className="text-center space-y-2">
              <Heart className="size-6 mx-auto text-rose-500" />
              <p className="text-muted-foreground">
                Your gift will make a meaningful impact in supporting missionary work around the world.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/donate">
                <ArrowLeft className="size-4 mr-2" />
                Donate Again
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/dashboard">
                <Home className="size-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            A confirmation email will be sent to your registered email address.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
