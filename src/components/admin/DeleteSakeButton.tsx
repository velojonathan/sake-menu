'use client';

import { deleteSake } from '@/domain/admin/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteSakeButtonProps {
  sakeId: string;
  sakeName: string;
}

export default function DeleteSakeButton({ sakeId, sakeName }: DeleteSakeButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    await deleteSake(sakeId);
    router.refresh();
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-xs font-medium"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-red-400 hover:text-red-600 text-xs font-medium"
      title={`Delete ${sakeName}`}
    >
      Delete
    </button>
  );
}
