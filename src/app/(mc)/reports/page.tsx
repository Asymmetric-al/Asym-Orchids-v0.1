import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function ReportsPage() {
  const tile = getTileById('reports')!
  return <TilePage tile={tile} />
}
