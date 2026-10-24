export const SITE_URL = 'https://themaff.netlify.app';
export const SOCIAL_IMAGE_URL = `${SITE_URL}/assets/the-maff-social.png`;

export interface PageMetadata {
  title: string;
  description: string;
  /** A fixed public path keeps query strings and demo state out of canonical URLs. */
  path: string;
  noindex?: boolean;
}

export const PAGE_METADATA = {
  home: {
    title: 'The Maff | Automatización, CRM e integraciones para empresas',
    description: 'Automatización de procesos, CRM, integraciones y dashboards para equipos comerciales y operativos. Conecta tus herramientas y reduce el trabajo manual con The Maff.',
    path: '/'
  },
  capture: {
    title: 'Demo de captación y seguimiento comercial | The Maff',
    description: 'Prueba un flujo de captación y seguimiento comercial: registra consultas, organiza oportunidades y define próximas acciones con datos ficticios en esta demo de The Maff.',
    path: '/demos/seguimiento-comercial'
  },
  dashboard: {
    title: 'Demo de dashboard comercial | The Maff',
    description: 'Explora un dashboard comercial con datos ficticios. Filtra ventas, oportunidades, responsables y canales para entender los indicadores de tu equipo con The Maff.',
    path: '/demos/dashboard-comercial'
  },
  integration: {
    title: 'Demo de integración: formulario, CRM y hoja de cálculo | The Maff',
    description: 'Prueba cómo una consulta actualiza un CRM y una hoja de cálculo. Simula validaciones, errores y reintentos con datos ficticios en esta demo de integración de The Maff.',
    path: '/demos/formulario-crm-hoja'
  },
  notFound: {
    title: 'Página no encontrada | The Maff',
    description: 'La página que buscas no está disponible. Vuelve a The Maff para explorar los servicios de automatización, CRM, integraciones y dashboards.',
    path: '/404',
    noindex: true
  }
} satisfies Record<string, PageMetadata>;
