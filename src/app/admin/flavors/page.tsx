import { prisma } from '@/lib/db';
import FlavorTagManager from '@/components/admin/FlavorTagManager';

export const dynamic = 'force-dynamic';

interface FlavorTagWithCount {
  id: string;
  name: string;
  _count: { sakes: number };
}

export default async function FlavorTagsPage() {
  const tags = await prisma.flavorTag.findMany({
    include: {
      _count: { select: { sakes: true } },
    },
    orderBy: { name: 'asc' },
  });

  const serialized = tags.map((t: FlavorTagWithCount) => ({
    id: t.id,
    name: t.name,
    sakeCount: t._count.sakes,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Flavor Profiles</h1>
      <FlavorTagManager tags={serialized} />
    </div>
  );
}
