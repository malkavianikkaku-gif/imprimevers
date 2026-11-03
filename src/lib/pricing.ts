// Motor de precios del cotizador público.
// Costos reales confirmados por el taller el 02/11/2026:
// - Filamento: $350 MXN por kg.
// - Consumo: 120 W por hora × $1.50 MXN/kWh = $0.18 MXN/hora.
// - Mano de obra: $5 MXN por hora, cobrada solo por el post-proceso
//   (retiro de soportes, lijado y revisión); la impresión corre sola.
// - Fallas / reimpresión: 5%.
// - Margen: 40% si la pieza ya está diseñada, 70% si se crea desde cero.
// El desgaste de máquina no está confirmado todavía (machineHour = 0).
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
  },
  prototype: {
    label: 'Prototipo o pieza útil',
    short: 'Prototipo',
    description: 'Piezas funcionales, repuestos y prototipos.',
    complexity: 1.0,
  },
  sign: {
    label: 'Letrero o decoración',
    short: 'Letrero',
    description: 'Letreros, logos y decoración para tu espacio.',
    complexity: 1.2,
  },
} as const;

export const SIZES = {
  // `postProcessMinutes` es el tiempo estimado de trabajo manual por pieza.
  // Es un supuesto de trabajo: ajustarlo cuando el taller lo mida.
  small: { label: 'Pequeña', cm: 6, hint: 'Llaveros y miniaturas', postProcessMinutes: 10 },
  medium: { label: 'Mediana', cm: 15, hint: 'Figuras y letreros', postProcessMinutes: 20 },
  large: { label: 'Grande', cm: 25, hint: 'Piezas grandes', postProcessMinutes: 30 },
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
  /** $350 MXN por kg de filamento (confirmado 02/11/2026). */
  spoolPricePerKg: 350,
  /** Desgaste de máquina: sin costo confirmado todavía. */
  machineHour: 0,
  /** 120 W × $1.50 MXN/kWh = $0.18 MXN por hora. */
  energyPerHour: 0.18,
  /** $5 MXN por hora de trabajo manual (confirmado 02/11/2026). */
  laborPerHour: 5,
  /** 5% de fallas / reimpresión (confirmado 02/11/2026). */
  risk: 0.05,
  /** 40% cuando el cliente ya trae el diseño (subido el 03/11/2026). */
  marginExistingDesign: 0.4,
  /** 70% cuando la pieza se crea desde cero (incluye el modelado). */
  marginCustomDesign: 0.7,
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
  /** Se conserva en 0: el modelado desde cero ya va dentro del margen del 60%. */
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

  // Mano de obra: solo el post-proceso (la impresión no requiere atención).
  // $5 MXN por hora × los minutos estimados según el tamaño.
  const laborCost = (size.postProcessMinutes / 60) * PRICING.laborPerHour;
  // El margen sube al 70% cuando el diseño se crea desde cero:
  // ese margen ya incluye el modelado, por eso no se cobra un cargo aparte.
  const margin = input.customDesign
    ? PRICING.marginCustomDesign
    : PRICING.marginExistingDesign;
  const cost = calculateProductionCost({
    materialCost: gramsPerPiece * (PRICING.spoolPricePerKg / 1000) * MATERIALS[input.material].factor,
    machineCost: hoursPerPiece * (PRICING.machineHour + PRICING.energyPerHour),
    laborCost,
    complexity: type.complexity,
    risk: PRICING.risk,
    margin,
  });

  const roundedUnitPrice = roundToPsychological(cost.unitPriceBeforePsychology);
  const unitPrice = Math.max(PRICING.minUnitPrice, roundedUnitPrice);
  const minPriceApplied = roundedUnitPrice < PRICING.minUnitPrice;
  const subtotal = unitPrice * quantity;
  const discountRate = getQuantityDiscount(quantity);
  const discountAmount = Math.round(subtotal * discountRate);
  // Sin cargo de diseño aparte: el 60% de margen ya cubre el modelado.
  const designFee = 0;
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
