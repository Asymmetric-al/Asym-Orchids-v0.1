import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function EventsPage() {
  const tile = getTileById('events')!
  return <TilePage tile={tile} />
}
