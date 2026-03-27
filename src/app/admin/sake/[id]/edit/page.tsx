import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import SakeForm from '@/components/admin/SakeForm';

interface EditSakePageProps {
  params: { id: string };
}

export default async function EditSakePage({ params }: EditSakePageProps) {
  const sake = await prisma.sake.findUnique({
    where: { id: params.id },
    include: {
      flavorTags: {
        include: { flavorTag: true },
      },
    },
  });

  if (!sake) {
    notFound();
  }

  const initialData = {
    name: sake.name,
    brewery: sake.brewery,
    region: sake.region || '',
    description: sake.description,
    imageUrl: sake.imageUrl || '',
    smv: sake.smv != null ? String(sake.smv) : '',
    acidity: sake.acidity,
    price: sake.price != null ? String(sake.price) : '',
    riceType: sake.riceType || '',
    polishRatio: sake.polishRatio ? String(sake.polishRatio) : '',
    style: sake.style || '',
    abv: sake.abv ? String(sake.abv) : '',
    flavorTagNames: sake.flavorTags.map((ft: { flavorTag: { name: string } }) => ft.flavorTag.name),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit: {sake.name}</h1>
      <SakeForm initialData={initialData} sakeId={sake.id} />
    </div>
  );
}
