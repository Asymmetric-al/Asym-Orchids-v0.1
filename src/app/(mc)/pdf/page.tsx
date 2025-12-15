import { getTileById } from '@/lib/mission-control/tiles'
import { TilePage } from '@/components/mission-control/tiles/TilePage'

export default function PdfPage() {
  const tile = getTileById('pdf')!
  return <TilePage tile={tile} />
}
