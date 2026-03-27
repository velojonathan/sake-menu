/**
 * Inventory domain types - scaffolded for Phase 2
 *
 * These types will be used when implementing:
 * - Image-based bottle counting (CV/AI)
 * - Invoice upload and OCR parsing
 * - Stock reconciliation workflows
 * - Receiving and depletion history
 * - Low-stock alerts
 */

export interface InventoryItemData {
  id: string;
  sakeId: string | null;
  sku: string;
  bottleSize: string;
  currentQuantity: number;
  reorderThreshold: number;
  location: string | null;
}

export interface InvoiceData {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: Date;
  totalAmount: number;
  status: 'pending' | 'processed' | 'verified';
  rawFileUrl: string | null;
}

export interface InvoiceLineItemData {
  id: string;
  invoiceId: string;
  inventoryItemId: string | null;
  description: string;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface ShelfScanData {
  id: string;
  imageUrl: string;
  scannedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  notes: string | null;
}

// Future: CV/AI bottle detection result
export interface BottleDetection {
  boundingBox: { x: number; y: number; width: number; height: number };
  confidence: number;
  matchedSku: string | null;
  label: string | null;
}
