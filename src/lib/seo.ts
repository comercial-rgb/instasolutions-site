import { DOMAIN, ORG_NAME, EMAIL, PHONE_DISPLAY } from './constants';

export interface JsonLdItem {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export function organizationSchema(): JsonLdItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/imagens/logo_topo.png`,
    foundingDate: '2022-09-16',
    sameAs: [
      // TODO: Winner — adicionar URLs reais de LinkedIn, Instagram, YouTube
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+55-11-3336-6941',
        contactType: 'customer service',
        email: EMAIL,
        availableLanguage: ['Portuguese', 'English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alameda Rio Negro, 1030, Ed. Stadium Corporate Alphaville, Sala 2304',
      addressLocality: 'Barueri',
      addressRegion: 'SP',
      postalCode: '06454-000',
      addressCountry: 'BR',
    },
  };
}

export function localBusinessSchema(): JsonLdItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: ORG_NAME,
    url: DOMAIN,
    telephone: '+55-11-3336-6941',
    email: EMAIL,
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-18:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.5106,
      longitude: -46.8761,
    },
    areaServed: ['BR', 'US-FL'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alameda Rio Negro, 1030, Ed. Stadium Corporate Alphaville, Sala 2304',
      addressLocality: 'Barueri',
      addressRegion: 'SP',
      postalCode: '06454-000',
      addressCountry: 'BR',
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface ProductSchemaArgs {
  name: string;
  description: string;
  image?: string;
}

export function productSchema({ name, description, image }: ProductSchemaArgs): JsonLdItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'InstaSolutions',
    },
    image: image || `${DOMAIN}/imagens/logo_topo.png`,
    areaServed: ['BR', 'US-FL'],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FAQItem[]): JsonLdItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
