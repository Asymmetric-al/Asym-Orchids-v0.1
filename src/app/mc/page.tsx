import { redirect } from 'next/navigation'

export default function MCRedirect() {
  redirect('/login?redirect=/mc')
}
