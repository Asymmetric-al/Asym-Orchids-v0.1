import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function CarePage() {
  const tile = getTileById('care')!
  return <TilePage tile={tile} />
}
