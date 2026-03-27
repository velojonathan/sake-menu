import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { SakeWithTags } from '@/domain/catalog/types';
import DeleteSakeButton from '@/components/admin/DeleteSakeButton';

export const dynamic = 'force-dynamic';

export default async function AdminSakeListPage() {
  const sakes: SakeWithTags[] = await prisma.sake.findMany({
    include: {
      flavorTags: {
        include: { flavorTag: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sake Catalog</h1>
        <Link href="/admin/sake/new" className="btn-primary">
          + Add Sake
        </Link>
      </div>

      {sakes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No sakes yet. Add your first one!</p>
          <Link href="/admin/sake/new" className="btn-primary mt-4 inline-block">
            Add Sake
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Brewery</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Style</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">SMV</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Acidity</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sakes.map((sake) => (
                  <tr key={sake.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        href={`/sake/${sake.slug}`}
                        className="font-medium text-gray-900 hover:text-sake-700"
                      >
                        {sake.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{sake.brewery}</td>
                    <td className="py-3 px-4">
                      {sake.style && <span className="badge-style">{sake.style}</span>}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {sake.smv > 0 ? `+${sake.smv}` : sake.smv}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{sake.acidity}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatPrice(sake.price)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/sake/${sake.id}/edit`}
                          className="text-sake-600 hover:text-sake-800 text-xs font-medium"
                        >
                          Edit
                        </Link>
                        <DeleteSakeButton sakeId={sake.id} sakeName={sake.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
