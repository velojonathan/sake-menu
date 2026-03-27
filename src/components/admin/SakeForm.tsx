'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSake, updateSake } from '@/domain/admin/actions';
import { SAKE_STYLES, FLAVOR_TAGS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SakeFormData {
  name: string;
  brewery: string;
  region: string;
  description: string;
  imageUrl: string;
  smv: number;
  acidity: number;
  price: number;
  riceType: string;
  polishRatio: string;
  style: string;
  abv: string;
  flavorTagNames: string[];
}

interface SakeFormProps {
  initialData?: SakeFormData;
  sakeId?: string;
}

const defaultFormData: SakeFormData = {
  name: '',
  brewery: '',
  region: '',
  description: '',
  imageUrl: '',
  smv: 0,
  acidity: 1.2,
  price: 15,
  riceType: '',
  polishRatio: '',
  style: '',
  abv: '',
  flavorTagNames: [],
};

export default function SakeForm({ initialData, sakeId }: SakeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SakeFormData>(initialData || defaultFormData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!sakeId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name.trim()) throw new Error('Name is required');
      if (!formData.brewery.trim()) throw new Error('Brewery is required');
      if (!formData.description.trim()) throw new Error('Description is required');

      const payload = {
        name: formData.name.trim(),
        brewery: formData.brewery.trim(),
        region: formData.region.trim() || undefined,
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
        smv: formData.smv,
        acidity: formData.acidity,
        price: formData.price,
        riceType: formData.riceType.trim() || undefined,
        polishRatio: formData.polishRatio ? parseFloat(formData.polishRatio) : undefined,
        style: formData.style || undefined,
        abv: formData.abv ? parseFloat(formData.abv) : undefined,
        flavorTagNames: formData.flavorTagNames,
      };

      if (isEditing && sakeId) {
        await updateSake(sakeId, payload);
      } else {
        await createSake(payload);
      }

      router.push('/admin/sake');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SakeFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFlavor = (flavor: string) => {
    const current = formData.flavorTagNames;
    const updated = current.includes(flavor)
      ? current.filter((f) => f !== flavor)
      : [...current, flavor];
    updateField('flavorTagNames', updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Name & Brewery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brewery <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.brewery}
            onChange={(e) => updateField('brewery', e.target.value)}
            className="input-field"
            required
          />
        </div>
      </div>

      {/* Region & Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => updateField('region', e.target.value)}
            className="input-field"
            placeholder="e.g. Niigata, Hiroshima"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
          <select
            value={formData.style}
            onChange={(e) => updateField('style', e.target.value)}
            className="input-field"
          >
            <option value="">Select style...</option>
            {SAKE_STYLES.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="input-field min-h-[100px]"
          required
        />
      </div>

      {/* Numeric fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMV <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.smv}
            onChange={(e) => updateField('smv', parseFloat(e.target.value) || 0)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Acidity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.acidity}
            onChange={(e) => updateField('acidity', parseFloat(e.target.value) || 0)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ABV (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.abv}
            onChange={(e) => updateField('abv', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* Rice & Polish */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rice Type</label>
          <input
            type="text"
            value={formData.riceType}
            onChange={(e) => updateField('riceType', e.target.value)}
            className="input-field"
            placeholder="e.g. Yamada Nishiki"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Polish Ratio (%)
          </label>
          <input
            type="number"
            step="1"
            value={formData.polishRatio}
            onChange={(e) => updateField('polishRatio', e.target.value)}
            className="input-field"
            placeholder="e.g. 50"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => updateField('imageUrl', e.target.value)}
          className="input-field"
          placeholder="https://..."
        />
      </div>

      {/* Flavor Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Flavor Profile</label>
        <div className="flex flex-wrap gap-2">
          {FLAVOR_TAGS.map((flavor) => {
            const isSelected = formData.flavorTagNames.includes(flavor);
            return (
              <button
                key={flavor}
                type="button"
                onClick={() => toggleFlavor(flavor)}
                className={cn(
                  'badge transition-colors capitalize',
                  isSelected
                    ? 'bg-sake-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {flavor}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : isEditing ? 'Update Sake' : 'Create Sake'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
