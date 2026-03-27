'use client';

import { useState, useCallback } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import { ChartPoint } from '@/domain/catalog/types';
import { formatPrice } from '@/lib/utils';

interface SakeChartProps {
  data: ChartPoint[];
}

interface TooltipPayloadItem {
  payload: ChartPoint;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: ChartPoint;
}

export default function SakeChart({ data }: SakeChartProps) {
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(null);

  const handleClick = useCallback((point: ChartPoint) => {
    setActivePoint((prev) => (prev?.id === point.id ? null : point));
  }, []);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    const sake = payload[0].payload;
    return (
      <div className="bg-white rounded-lg shadow-lg border border-sake-100 p-3 max-w-[200px]">
        <p className="font-semibold text-sm text-charcoal leading-tight">{sake.name}</p>
        <p className="text-xs text-sake-500 mt-0.5">{sake.brewery}</p>
        <div className="flex gap-3 mt-2 text-xs text-sake-600">
          <span>SMV: {sake.smv != null ? (sake.smv > 0 ? `+${sake.smv}` : sake.smv) : 'N/A'}</span>
          <span>Acid: {sake.acidity}</span>
        </div>
        {sake.price != null && (
          <p className="text-xs font-semibold text-sake-800 mt-1">{formatPrice(sake.price)}</p>
        )}
      </div>
    );
  };

  const renderDot = (props: unknown) => {
    const { cx, cy, payload } = props as CustomDotProps;
    if (cx == null || cy == null || !payload) return <circle r={0} />;
    const isActive = activePoint?.id === payload.id;
    return (
      <circle
        key={payload.id}
        cx={cx}
        cy={cy}
        r={isActive ? 8 : 5}
        fill={isActive ? '#6f533f' : '#b08e65'}
        stroke={isActive ? '#30231b' : '#886548'}
        strokeWidth={isActive ? 2 : 1}
        cursor="pointer"
      />
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-surface-container-lowest rounded-sm shadow-ambient">
        <p className="body-md">No data to display</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-sm shadow-ambient p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="title-md">SMV vs Acidity</h3>
          <p className="body-md mt-1">
            Tap a point to see details &middot; {data.length} sake{data.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="label-sm hidden sm:block">Sweet &larr; &middot; &rarr; Dry</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eae7e1" />
          <XAxis
            type="number"
            dataKey="smv"
            name="SMV"
            domain={['auto', 'auto']}
            tick={{ fontSize: 11, fill: '#4a4740' }}
            label={{
              value: 'SMV (Sweet \u2190 \u2192 Dry)',
              position: 'insideBottom',
              offset: -10,
              style: { fontSize: 11, fill: '#4a4740' },
            }}
          />
          <YAxis
            type="number"
            dataKey="acidity"
            name="Acidity"
            domain={['auto', 'auto']}
            tick={{ fontSize: 11, fill: '#4a4740' }}
            label={{
              value: 'Acidity',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 11, fill: '#4a4740' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            shape={renderDot}
            onClick={(entry: { payload?: ChartPoint }) => {
              if (entry?.payload) handleClick(entry.payload);
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Active point detail card */}
      {activePoint && (
        <div className="mt-4 p-4 bg-surface-container-low rounded-sm flex items-center justify-between">
          <div>
            <p className="title-md">{activePoint.name}</p>
            <p className="body-md mt-0.5">
              {activePoint.brewery} &middot; SMV{' '}
              {activePoint.smv > 0 ? `+${activePoint.smv}` : activePoint.smv} &middot; Acidity{' '}
              {activePoint.acidity}{activePoint.price != null ? ` \u00B7 ${formatPrice(activePoint.price)}` : ''}
            </p>
          </div>
          <Link href={`/sake/${activePoint.slug}`} className="btn-primary text-xs px-4 py-2">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}
