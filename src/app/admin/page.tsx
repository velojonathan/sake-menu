import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [sakeCount, tagCount] = await Promise.all([
    prisma.sake.count(),
    prisma.flavorTag.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Sake Catalog"
          count={sakeCount}
          description="Total sake offerings"
          href="/admin/sake"
          action="Manage"
        />
        <DashboardCard
          title="Flavor Tags"
          count={tagCount}
          description="Unique flavor profiles"
          href="/admin/sake"
          action="View"
        />
        <div className="bg-white rounded-xl border border-gray-200 p-6 opacity-50">
          <h3 className="font-semibold text-gray-900">Inventory</h3>
          <p className="text-sm text-gray-500 mt-1">Coming in Phase 2</p>
          {/* TODO: Implement inventory management */}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="font-semibold text-amber-800 text-sm">MVP Admin Notice</h3>
        <p className="text-sm text-amber-700 mt-1">
          This admin area uses simple route-based access. For production, add
          proper authentication (e.g., NextAuth.js, Clerk, or Supabase Auth).
        </p>
        {/* TODO: Add production authentication */}
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  count,
  description,
  href,
  action,
}: {
  title: string;
  count: number;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <Link
        href={href}
        className="inline-block mt-3 text-sm font-medium text-sake-700 hover:text-sake-900"
      >
        {action} →
      </Link>
    </div>
  );
}
