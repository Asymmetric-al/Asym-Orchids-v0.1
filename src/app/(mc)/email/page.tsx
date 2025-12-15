import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function EmailPage() {
  const tile = getTileById('email')!
  return <TilePage tile={tile} />
}
