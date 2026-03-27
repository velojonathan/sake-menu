'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFlavorTag, updateFlavorTag, deleteFlavorTag } from '@/domain/admin/actions';

interface FlavorTag {
  id: string;
  name: string;
  sakeCount: number;
}

interface FlavorTagManagerProps {
  tags: FlavorTag[];
}

export default function FlavorTagManager({ tags }: FlavorTagManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const createInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = (formData.get('tagName') as string ?? '').trim();
    if (!value) return;
    setSaving(true);
    setError(null);
    try {
      await createFlavorTag(value);
      if (createInputRef.current) createInputRef.current.value = '';
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await updateFlavorTag(id, editName);
      setEditingId(null);
      setEditName('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update tag');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tag: FlavorTag) => {
    if (tag.sakeCount > 0) {
      const confirmed = window.confirm(
        `"${tag.name}" is used by ${tag.sakeCount} sake${tag.sakeCount === 1 ? '' : 's'}. Deleting it will remove it from those sakes. Continue?`
      );
      if (!confirmed) return;
    }
    setSaving(true);
    setError(null);
    try {
      await deleteFlavorTag(tag.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (tag: FlavorTag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
    setError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setError(null);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Add new tag */}
      <form onSubmit={handleCreate} className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add New Flavor Tag
          </label>
          <input
            ref={createInputRef}
            type="text"
            name="tagName"
            className="input-field"
            placeholder="e.g. spicy, mineral, tangy"
            disabled={saving}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary whitespace-nowrap"
        >
          {saving ? 'Adding...' : '+ Add Tag'}
        </button>
      </form>

      {/* Tag list */}
      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          {tags.length} Flavor Tag{tags.length !== 1 ? 's' : ''}
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {tags.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No flavor tags yet. Add one above.
            </div>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                {editingId === tag.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="input-field flex-1 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUpdate(tag.id);
                        }
                        if (e.key === 'Escape') cancelEditing();
                      }}
                    />
                    <button
                      onClick={() => handleUpdate(tag.id)}
                      disabled={saving}
                      className="text-sm text-green-700 hover:text-green-900 font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 capitalize">
                        {tag.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {tag.sakeCount} sake{tag.sakeCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => startEditing(tag)}
                        className="text-sm text-sake-700 hover:text-sake-900 font-medium"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => handleDelete(tag)}
                        disabled={saving}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
