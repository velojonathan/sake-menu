import SakeForm from '@/components/admin/SakeForm';
import { getAllFlavorTags } from '@/domain/catalog/queries';

export default async function NewSakePage() {
  const flavors = await getAllFlavorTags();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Sake</h1>
      <SakeForm availableFlavors={flavors} />
    </div>
  );
}
