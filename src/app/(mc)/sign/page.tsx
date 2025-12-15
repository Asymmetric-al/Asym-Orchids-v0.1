import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function SignPage() {
  const tile = getTileById('sign')!
  return <TilePage tile={tile} />
}
