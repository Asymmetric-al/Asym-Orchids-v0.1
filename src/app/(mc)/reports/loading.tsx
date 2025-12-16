import { PageHeaderSkeleton, TableSkeleton } from '@/components/mission-control/patterns/Skeletons'

export default function Loading() {
  return (
    <div className="flex h-full flex-col">
      <PageHeaderSkeleton />
      <div className="flex-1 p-6 lg:p-8">
        <TableSkeleton />
      </div>
    </div>
  )
}
