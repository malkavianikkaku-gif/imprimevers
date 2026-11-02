// Motor de precios del cotizador público.
// Las constantes son supuestos de trabajo alineados con la calculadora interna:
// rollo de $450/kg, desgaste de máquina, energía, mano de obra, 10% de riesgo
// y 60% de margen. Deben validarse con costos reales antes de publicar precios.
// El objetivo es que el cliente vea un estimado claro, no el desglose de costos.

export type PieceType = 'figurine' | 'prototype' | 'sign';
export type SizeKey = 'small' | 'medium' | 'large';
export type ResistanceKey = 'basic' | 'strong' | 'extra';

export const PIECE_TYPES = {
  figurine: {
    label: 'Figura o miniatura',
    short: 'Figura',
    description: 'Personajes, figuras y regalos personalizados.',
    complexity: 1.15,
    designFee: 350,
  },
  prototype: {
    label: 'Prototipo o pieza útil',
    short: 'Prototipo',
    description: 'Piezas funcionales, repuestos y prototipos.',
    complexity: 1.0,
    designFee: 450,
  },
  sign: {
    label: 'Letrero o decoración',
    short: 'Letrero',
    description: 'Letreros, logos y decoración para tu espacio.',
    complexity: 1.2,
    designFee: 200,
  },
} as const;

export const SIZES = {
  small: { label: 'Pequeña', cm: 6, hint: 'Llaveros y miniaturas' },
  medium: { label: 'Mediana', cm: 15, hint: 'Figuras y letreros' },
  large: { label: 'Grande', cm: 25, hint: 'Piezas grandes' },
} as const;

export const RESISTANCE = {
  basic: { label: 'Básica', infill: 15, hint: 'Decorativa, más económica' },
  strong: { label: 'Resistente', infill: 25, hint: 'Recomendada para uso normal' },
  extra: { label: 'Muy resistente', infill: 40, hint: 'Para piezas que aguantan más' },
} as const;

export const MATERIALS = {
  pla: { label: 'PLA', factor: 1, hint: 'Estándar' },
  petg: { label: 'PETG', factor: 1.15, hint: 'Refuerzado' },
  tpu: { label: 'TPU', factor: 1.3, hint: 'Flexible' },
  plaplus: { label: 'PLA+', factor: 1.4, hint: 'Alta resistencia y acabado superior' },
} as const;

export type MaterialKey = keyof typeof MATERIALS;

export const PRICING = {
  currency: 'MXN',
  spoolPricePerKg: 450,
  machineHour: 2.5,
  energyPerHour: 0.37,
  laborPerPiece: 30,
  risk: 0.1,
  margin: 0.6,
  minUnitPrice: 60,
  maxQuantity: 10,
} as const;

/**
 * Cargo por acabado (pintura/lijado). Valor provisional: debe confirmarse
 * con el negocio antes de publicar precios definitivos.
 */
export const FINISHING_FEE = 200;

/**
 * Factor de urgencia (recargo por entrega prioritaria). Valor provisional:
 * debe confirmarse con el negocio antes de publicar precios definitivos.
 */
export const URGENCY_FACTOR = 0.2;

/**
 * Cargo por envío. Valor provisional: debe confirmarse con el negocio antes
 * de publicar precios definitivos.
 */
export const SHIPPING_FEE = 150;

export interface QuoteInput {
  type: PieceType;
  size: SizeKey;
  resistance: ResistanceKey;
  material: MaterialKey;
  quantity: number;
  customDesign: boolean;
  finishing: boolean;
  urgency: boolean;
  shipping: boolean;
}

export interface QuoteResult {
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  designFee: number;
  finishingFee: number;
  urgencyFee: number;
  shippingFee: number;
  total: number;
  gramsPerPiece: number;
  hoursPerPiece: number;
  totalHours: number;
  /** true cuando el precio calculado era menor al mínimo por pieza. */
  minPriceApplied: boolean;
}

export function getQuantityDiscount(quantity: number): number {
  if (quantity >= 10) return 0.15;
  if (quantity >= 5) return 0.1;
  if (quantity >= 2) return 0.05;
  return 0;
}

export interface ProductionCostInput {
  materialCost: number;
  machineCost: number;
  laborCost: number;
  complexity: number;
  risk: number;
  margin: number;
}

export interface ProductionCostResult {
  productionCost: number;
  riskCost: number;
  totalCost: number;
  unitPriceBeforePsychology: number;
}

/**
 * Motor único de costo de producción: (material + máquina/energía + mano de obra)
 * × complejidad, + riesgo, × margen. Lo consumen el cotizador público
 * (`calculateQuote`) y la calculadora interna (`PrintCalculator`) para que
 * nunca más deban dar cifras distintas por el mismo motor.
 */
export function calculateProductionCost(input: ProductionCostInput): ProductionCostResult {
  const productionCost = (input.materialCost + input.machineCost + input.laborCost) * input.complexity;
  const riskCost = productionCost * input.risk;
  const totalCost = productionCost + riskCost;
  const unitPriceBeforePsychology = totalCost * (1 + input.margin);
  return { productionCost, riskCost, totalCost, unitPriceBeforePsychology };
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const type = PIECE_TYPES[input.type];
  const size = SIZES[input.size];
  const resistance = RESISTANCE[input.resistance];
  const quantity = Math.min(PRICING.maxQuantity, Math.max(1, Math.round(input.quantity)));

  // Estimación de material y tiempo a partir de tamaño y resistencia.
  const gramsPerPiece = Math.round(
    60 * Math.pow(size.cm / 10, 1.6) * (resistance.infill / 20),
  );
  const hoursPerPiece = Number((size.cm * 0.4 * (resistance.infill / 20)).toFixed(1));

  const laborCost = input.size === 'small' ? 10 : PRICING.laborPerPiece;
  const cost = calculateProductionCost({
    materialCost: gramsPerPiece * (PRICING.spoolPricePerKg / 1000) * MATERIALS[input.material].factor,
    machineCost: hoursPerPiece * (PRICING.machineHour + PRICING.energyPerHour),
    laborCost,
    complexity: type.complexity,
    risk: PRICING.risk,
    margin: PRICING.margin,
  });

  const roundedUnitPrice = roundToPsychological(cost.unitPriceBeforePsychology);
  const unitPrice = Math.max(PRICING.minUnitPrice, roundedUnitPrice);
  const minPriceApplied = roundedUnitPrice < PRICING.minUnitPrice;
  const subtotal = unitPrice * quantity;
  const discountRate = getQuantityDiscount(quantity);
  const discountAmount = Math.round(subtotal * discountRate);
  const designFee = input.customDesign ? type.designFee : 0;
  const finishingFee = input.finishing ? FINISHING_FEE : 0;
  const shippingFee = input.shipping ? SHIPPING_FEE : 0;
  const baseTotal = Math.round(subtotal - discountAmount + designFee + finishingFee + shippingFee);
  const urgencyFee = input.urgency ? Math.round(baseTotal * URGENCY_FACTOR) : 0;
  const total = baseTotal + urgencyFee;

  return {
    quantity,
    unitPrice,
    subtotal,
    discountRate,
    discountAmount,
    designFee,
    finishingFee,
    urgencyFee,
    shippingFee,
    total,
    gramsPerPiece,
    hoursPerPiece,
    totalHours: Number((hoursPerPiece * quantity).toFixed(1)),
    minPriceApplied,
  };
}

function roundToPsychological(value: number): number {
  if (value <= 60) return 59;
  return Math.ceil(value / 50) * 50 - 1;
}

export function formatMoney(value: number): string {
  return `$${value.toLocaleString('es-MX')} MXN`;
}
