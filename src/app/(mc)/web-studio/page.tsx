import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function WebStudioPage() {
  const tile = getTileById('web-studio')!
  return <TilePage tile={tile} />
}
