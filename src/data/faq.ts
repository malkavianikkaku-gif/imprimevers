// src/data/faq.ts
export interface FAQItem {
  id: string;
  category: 'materiales' | 'pedidos' | 'tiempos' | 'pagos';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'que-puedo-imprimir',
    category: 'materiales',
    question: '¿Qué tipo de piezas pueden imprimir en el taller?',
    answer: 'Imprimimos figuras coleccionables, miniaturas, letreros decorativos, prototipos funcionales y piezas a medida. Si tienes una idea especial para un proyecto o regalo, la analizamos juntos para evaluar su viabilidad técnica.',
  },
  {
    id: 'necesito-archivo-3d',
    category: 'pedidos',
    question: '¿Necesito tener mi propio archivo 3D (.STL) para pedir una pieza?',
    answer: 'No es indispensable. Si ya tienes un archivo 3D listo (.STL, .OBJ) nos lo mandas directo para cotizarlo. Si solo tienes una foto, dibujo o una idea en mente, nosotros te asesoramos para diseñarla desde cero.',
  },
  {
    id: 'que-materiales-usan',
    category: 'materiales',
    question: '¿Qué materiales y filamentos utilizan?',
    answer: 'Trabajamos con impresión FDM usando filamentos de calidad: PLA (ideal para figuras, detalles y decoración), PETG (más resistente a impactos y temperatura) y TPU (flexible para piezas elásticas o de protección).',
  },
  {
    id: 'cuanto-cuesta',
    category: 'pagos',
    question: '¿Cuánto cuesta imprimir una pieza en 3D?',
    answer: 'El costo depende del tamaño, peso en filamento, tiempo de impresión y acabados. El precio base estimado arranca desde $60 MXN en entrega directa en Cuernavaca. Puedes usar nuestro cotizador interactivo en esta misma página para calcular un estimado en segundos.',
  },
  {
    id: 'cuanto-tarda',
    category: 'tiempos',
    question: '¿Cuánto tiempo tarda en estar lista mi pieza?',
    answer: 'Al ser un taller familiar con una impresora 3D dedicada, cuidamos la calidad de cada trabajo capa por capa. Las piezas pequeñas a medianas suelen estar listas entre 2 y 5 días hábiles. Te confirmamos el tiempo estimado exacto por WhatsApp antes de arrancar.',
  },
  {
    id: 'entregas-y-envios',
    category: 'pedidos',
    question: '¿Cómo se realizan las entregas?',
    answer: 'Coordinamos entregas directas en puntos clave de Cuernavaca, Morelos. Si te encuentras fuera de la ciudad, preparamos un empaque seguro con protección y cotizamos el envío por paquetería directamente contigo.',
  },
  {
    id: 'metodos-de-pago',
    category: 'pagos',
    question: '¿Cuáles son las formas de pago y anticipos?',
    answer: 'Aceptamos transferencias bancarias y depósitos. Para iniciar la fabricación y apartar el tiempo de máquina solicitamos un anticipo del 50%, y el saldo restante se liquida al entregar tu pieza o antes de enviarla.',
  },
  {
    id: 'como-iniciar',
    category: 'pedidos',
    question: '¿Cómo puedo iniciar mi pedido hoy?',
    answer: 'Puedes configurar tu estimado en nuestro cotizador interactivo y hacer clic en enviar por WhatsApp, o escribirnos directamente al +52 777 650 0848 con tu idea o archivo adjunto. ¡Te responderemos con gusto!',
  },
];
