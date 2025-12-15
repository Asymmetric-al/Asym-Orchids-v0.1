import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function AdminPage() {
  const tile = getTileById('admin')!
  return <TilePage tile={tile} />
}
