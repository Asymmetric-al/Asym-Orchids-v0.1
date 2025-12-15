'use client'

import { useState, useEffect, useMemo } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Heart, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface Missionary {
  id: string
  funding_goal: number
  current_funding: number
  profile: {
    first_name: string
    last_name: string
    avatar_url: string | null
  }
}

interface Fund {
  id: string
  name: string
  description: string | null
  target_amount: number
  current_amount: number
}

interface Designations {
  missionaries: Missionary[]
  funds: Fund[]
}

const CURRENCIES = [
  { value: 'usd', label: 'USD ($)' },
  { value: 'eur', label: 'EUR (€)' },
  { value: 'gbp', label: 'GBP (£)' },
  { value: 'cad', label: 'CAD ($)' },
]

const PRESET_AMOUNTS = [25, 50, 100, 250, 500]

function DonationForm({
  designations,
  preselectedMissionaryId,
  preselectedFundId,
}: {
  designations: Designations
  preselectedMissionaryId: string | null
  preselectedFundId: string | null
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [amount, setAmount] = useState<string>('')
  const [currency, setCurrency] = useState('usd')
  const [designationType, setDesignationType] = useState<'missionary' | 'fund'>(
    preselectedFundId ? 'fund' : 'missionary'
  )
  const [selectedId, setSelectedId] = useState<string>(
    preselectedMissionaryId || preselectedFundId || ''
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)

  const hasDesignations = designations.missionaries.length > 0 || designations.funds.length > 0

  useEffect(() => {
    if (preselectedMissionaryId && designations.missionaries.some(m => m.id === preselectedMissionaryId)) {
      setSelectedId(preselectedMissionaryId)
      setDesignationType('missionary')
    } else if (preselectedFundId && designations.funds.some(f => f.id === preselectedFundId)) {
      setSelectedId(preselectedFundId)
      setDesignationType('fund')
    } else if (designations.missionaries.length > 0) {
      setSelectedId(designations.missionaries[0].id)
      setDesignationType('missionary')
    } else if (designations.funds.length > 0) {
      setSelectedId(designations.funds[0].id)
      setDesignationType('fund')
    }
  }, [preselectedMissionaryId, preselectedFundId, designations])

  const selectedDesignation = useMemo(() => {
    if (designationType === 'missionary') {
      return designations.missionaries.find(m => m.id === selectedId)
    }
    return designations.funds.find(f => f.id === selectedId)
  }, [designationType, selectedId, designations])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      toast.error('Payment system not ready. Please wait.')
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      toast.error('Card input not found')
      return
    }

    const numericAmount = parseFloat(amount)
    if (!numericAmount || numericAmount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (numericAmount < 0.5) {
      toast.error('Minimum donation is $0.50')
      return
    }

    if (!selectedId) {
      toast.error('Please select a designation')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericAmount,
          currency,
          missionary_id: designationType === 'missionary' ? selectedId : undefined,
          fund_id: designationType === 'fund' ? selectedId : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      )

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment failed')
      }

      if (paymentIntent?.status === 'succeeded') {
        toast.success('Thank you for your donation!')
        router.push(`/donate/success?donation_id=${data.donationId}`)
      } else if (paymentIntent?.status === 'processing') {
        toast.info('Payment is processing. We will notify you when complete.')
        router.push(`/donate/success?donation_id=${data.donationId}&status=processing`)
      } else {
        throw new Error('Payment was not successful')
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast.error(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const currencySymbol = currency === 'eur' ? '€' : currency === 'gbp' ? '£' : '$'

  if (!hasDesignations) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="size-5 text-amber-500" />
            No Recipients Available
          </CardTitle>
          <CardDescription>
            There are currently no missionaries or funds available to receive donations.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label>Designation Type</Label>
        <div className="flex gap-3">
          {designations.missionaries.length > 0 && (
            <Button
              type="button"
              variant={designationType === 'missionary' ? 'default' : 'outline'}
              onClick={() => {
                setDesignationType('missionary')
                if (designations.missionaries.length > 0) {
                  setSelectedId(designations.missionaries[0].id)
                }
              }}
              className="flex-1"
            >
              Missionary
            </Button>
          )}
          {designations.funds.length > 0 && (
            <Button
              type="button"
              variant={designationType === 'fund' ? 'default' : 'outline'}
              onClick={() => {
                setDesignationType('fund')
                if (designations.funds.length > 0) {
                  setSelectedId(designations.funds[0].id)
                }
              }}
              className="flex-1"
            >
              Fund
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Select {designationType === 'missionary' ? 'Missionary' : 'Fund'}</Label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select a ${designationType}`} />
          </SelectTrigger>
          <SelectContent>
            {designationType === 'missionary'
              ? designations.missionaries.map(m => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.profile.first_name} {m.profile.last_name}
                  </SelectItem>
                ))
              : designations.funds.map(f => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        {selectedDesignation && 'funding_goal' in selectedDesignation && (
          <p className="text-sm text-muted-foreground">
            Funding: ${(selectedDesignation.current_funding / 100).toLocaleString()} of $
            {(selectedDesignation.funding_goal / 100).toLocaleString()} goal
          </p>
        )}
        {selectedDesignation && 'target_amount' in selectedDesignation && (
          <p className="text-sm text-muted-foreground">
            Progress: ${((selectedDesignation as Fund).current_amount / 100).toLocaleString()} of $
            {((selectedDesignation as Fund).target_amount / 100).toLocaleString()} target
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Quick Amount</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map(preset => (
            <Button
              key={preset}
              type="button"
              variant={amount === String(preset) ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAmount(String(preset))}
            >
              {currencySymbol}{preset}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {currencySymbol}
            </span>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.50"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="pl-7"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map(c => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Card Information</Label>
        <div className="rounded-md border p-3 bg-background">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: 'hsl(var(--foreground))',
                  '::placeholder': {
                    color: 'hsl(var(--muted-foreground))',
                  },
                  lineHeight: '24px',
                },
                invalid: {
                  color: 'hsl(var(--destructive))',
                  iconColor: 'hsl(var(--destructive))',
                },
              },
            }}
            onChange={e => {
              setCardComplete(e.complete)
              setCardError(e.error?.message || null)
            }}
          />
        </div>
        {cardError && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="size-4" />
            {cardError}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-lg"
        disabled={!stripe || !elements || isProcessing || !cardComplete || !amount || !selectedId}
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-5 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="size-5 mr-2" />
            Donate {amount ? `${currencySymbol}${parseFloat(amount).toFixed(2)}` : ''}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your payment is securely processed by Stripe. Card details never touch our servers.
      </p>
    </form>
  )
}

export default function DonatePage() {
  const searchParams = useSearchParams()
  const missionaryId = searchParams.get('missionary_id')
  const fundId = searchParams.get('fund_id')

  const [designations, setDesignations] = useState<Designations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams()
        if (missionaryId) params.set('missionary_id', missionaryId)
        if (fundId) params.set('fund_id', fundId)

        const response = await fetch(`/api/donate?${params}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load donation options')
        }

        setDesignations(data.designations)

        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        if (publishableKey) {
          setStripePromise(loadStripe(publishableKey))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [missionaryId, fundId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="text-center space-y-4">
          <Loader2 className="size-10 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading donation form...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="size-5" />
              Error
            </CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Make a Donation</CardTitle>
            <CardDescription className="text-base">
              Your generosity makes a difference in the lives of missionaries worldwide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stripePromise && designations ? (
              <Elements stripe={stripePromise}>
                <DonationForm
                  designations={designations}
                  preselectedMissionaryId={missionaryId}
                  preselectedFundId={fundId}
                />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                <p className="mt-2 text-muted-foreground">Initializing payment...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
