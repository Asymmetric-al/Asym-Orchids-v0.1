import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function AutomationsPage() {
  const tile = getTileById('automations')!
  return <TilePage tile={tile} />
}
