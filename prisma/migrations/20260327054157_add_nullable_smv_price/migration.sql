-- CreateTable
CREATE TABLE "Sake" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brewery" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "smv" DOUBLE PRECISION,
    "acidity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION,
    "riceType" TEXT,
    "polishRatio" DOUBLE PRECISION,
    "style" TEXT,
    "abv" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlavorTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FlavorTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SakeFlavorTag" (
    "sakeId" TEXT NOT NULL,
    "flavorTagId" TEXT NOT NULL,

    CONSTRAINT "SakeFlavorTag_pkey" PRIMARY KEY ("sakeId","flavorTagId")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "sakeId" TEXT,
    "sku" TEXT NOT NULL,
    "bottleSize" TEXT NOT NULL,
    "currentQuantity" INTEGER NOT NULL DEFAULT 0,
    "reorderThreshold" INTEGER NOT NULL DEFAULT 5,
    "location" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rawFileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLineItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "inventoryItemId" TEXT,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "lineTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShelfScan" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,

    CONSTRAINT "ShelfScan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sake_slug_key" ON "Sake"("slug");

-- CreateIndex
CREATE INDEX "Sake_smv_idx" ON "Sake"("smv");

-- CreateIndex
CREATE INDEX "Sake_acidity_idx" ON "Sake"("acidity");

-- CreateIndex
CREATE INDEX "Sake_price_idx" ON "Sake"("price");

-- CreateIndex
CREATE INDEX "Sake_brewery_idx" ON "Sake"("brewery");

-- CreateIndex
CREATE UNIQUE INDEX "FlavorTag_name_key" ON "FlavorTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");

-- CreateIndex
CREATE INDEX "InventoryItem_sakeId_idx" ON "InventoryItem"("sakeId");

-- CreateIndex
CREATE INDEX "Invoice_vendorName_idx" ON "Invoice"("vendorName");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "InvoiceLineItem_invoiceId_idx" ON "InvoiceLineItem"("invoiceId");

-- CreateIndex
CREATE INDEX "ShelfScan_status_idx" ON "ShelfScan"("status");

-- AddForeignKey
ALTER TABLE "SakeFlavorTag" ADD CONSTRAINT "SakeFlavorTag_sakeId_fkey" FOREIGN KEY ("sakeId") REFERENCES "Sake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SakeFlavorTag" ADD CONSTRAINT "SakeFlavorTag_flavorTagId_fkey" FOREIGN KEY ("flavorTagId") REFERENCES "FlavorTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_sakeId_fkey" FOREIGN KEY ("sakeId") REFERENCES "Sake"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
