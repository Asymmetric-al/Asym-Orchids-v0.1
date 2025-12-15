import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!missionary_id(id, first_name, last_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, tenant_id')
    .eq('user_id', user.id)
    .single()

  if (!profile || profile.role !== 'missionary') {
    return NextResponse.json({ error: 'Only missionaries can create posts' }, { status: 403 })
  }

  const body = await request.json()
  const { content, media = [] } = body

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 })
  }

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      tenant_id: profile.tenant_id,
      missionary_id: profile.id,
      content: content.trim(),
      media,
    })
    .select(`
      *,
      author:profiles!missionary_id(id, first_name, last_name, avatar_url)
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post }, { status: 201 })
}
