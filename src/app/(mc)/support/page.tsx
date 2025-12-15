import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function SupportPage() {
  const tile = getTileById('support')!
  return <TilePage tile={tile} />
}
