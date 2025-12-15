import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthContext, requireAuth, type AuthenticatedContext } from '@/lib/auth/context'
import { createAuditLogger } from '@/lib/audit/logger'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const auth = await getAuthContext()
    requireAuth(auth)
    const ctx = auth as AuthenticatedContext

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', ctx.profileId)
      .eq('tenant_id', ctx.tenantId)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ profile: data })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: message.includes('Unauthorized') ? 401 : 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthContext()
    requireAuth(auth)
    const ctx = auth as AuthenticatedContext
    const audit = createAuditLogger(ctx, request)

    const body = await request.json()
    const { firstName, lastName, avatarUrl } = body

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (firstName) updates.first_name = firstName
    if (lastName) updates.last_name = lastName
    if (avatarUrl !== undefined) updates.avatar_url = avatarUrl

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('id', ctx.profileId)
      .eq('tenant_id', ctx.tenantId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    await audit.log('profile_updated', 'profile', ctx.profileId, body)
    return NextResponse.json({ profile: data })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: message.includes('Unauthorized') ? 401 : 500 })
  }
}
