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
      <div className="bg-surface-container-lowest p-4 shadow-ambient max-w-[220px]">
        <p className="font-headline text-sm text-on-surface leading-tight">{sake.name}</p>
        <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">{sake.brewery}</p>
        <div className="flex gap-3 mt-2 font-label text-[10px] text-outline">
          <span>SMV: {sake.smv != null ? (sake.smv > 0 ? `+${sake.smv}` : sake.smv) : 'N/A'}</span>
          <span>Acid: {sake.acidity}</span>
        </div>
        {sake.price != null && (
          <p className="font-headline text-sm text-on-surface mt-2">{formatPrice(sake.price)}</p>
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
        r={isActive ? 7 : 4}
        fill={isActive ? '#5a6240' : '#5c5c5c'}
        stroke={isActive ? '#424a2a' : '#757474'}
        strokeWidth={isActive ? 2 : 1}
        cursor="pointer"
        opacity={isActive ? 1 : 0.7}
      />
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-surface">
        <p className="font-body text-sm text-outline">No data to display</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-xl text-on-surface">Discovery Map</h3>
        <span className="label-sm text-outline/60">SMV vs Acidity</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 24, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e2dc" strokeOpacity={0.5} />
          <XAxis
            type="number"
            dataKey="smv"
            name="SMV"
            domain={['auto', 'auto']}
            tick={{ fontSize: 10, fill: '#80756b' }}
            axisLine={{ stroke: '#d1c4b8', strokeOpacity: 0.4 }}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="acidity"
            name="Acidity"
            domain={['auto', 'auto']}
            tick={{ fontSize: 10, fill: '#80756b' }}
            axisLine={{ stroke: '#d1c4b8', strokeOpacity: 0.4 }}
            tickLine={false}
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

      {/* Axis labels — negative SMV = sweet (left), positive SMV = dry (right) */}
      <div className="flex justify-between mt-1 px-8">
        <span className="label-sm text-outline/60">&larr; Sweet</span>
        <span className="label-sm text-outline/60">Dry &rarr;</span>
      </div>

      {/* Active point detail card */}
      {activePoint && (
        <Link
          href={`/sake/${activePoint.slug}`}
          className="mt-6 p-5 bg-surface-container-low flex items-center justify-between group active:bg-surface-container-high transition-colors duration-300"
        >
          <div>
            <p className="font-headline text-base text-on-surface">{activePoint.name}</p>
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">
              {activePoint.brewery} &middot; SMV{' '}
              {activePoint.smv > 0 ? `+${activePoint.smv}` : activePoint.smv} &middot; Acidity{' '}
              {activePoint.acidity}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activePoint.price != null && (
              <span className="font-headline text-base text-on-surface">{formatPrice(activePoint.price)}</span>
            )}
            <svg className="w-5 h-5 text-outline group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
}
