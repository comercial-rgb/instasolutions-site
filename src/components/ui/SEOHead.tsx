import React from 'react';
import { Helmet } from 'react-helmet';
import { DOMAIN } from '../../lib/constants';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const defaultOgImage = `${DOMAIN}/imagens/og-default.png`;
  const resolvedImage = ogImage || defaultOgImage;
  const canonicalUrl = canonical ? (canonical.startsWith('http') ? canonical : `${DOMAIN}${canonical}`) : DOMAIN;

  const schemaArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="InstaSolutions" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* JSON-LD */}
      {schemaArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
