import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function MobilizePage() {
  const tile = getTileById('mobilize')!
  return <TilePage tile={tile} />
}
