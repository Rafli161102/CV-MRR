/**
 * ============================================================================
 * SEO Component
 * ============================================================================
 * Meta tags dan Open Graph untuk SEO optimization.
 * ============================================================================
 */

export default function SEO({
  title = 'MRR | Graphic Designer & Community Development',
  description = 'Portofolio profesional Muhammad Rafli Ramadhan - Spesialis Brand Identity, Packaging, dan Community Development',
  image = '/og-image.jpg',
  url = 'https://mrr.my.id',
  type = 'website',
  twitterHandle = '@rafli161102',
  noindex = false,
  children
}) {
  // Ensure title has site name
  const fullTitle = title.includes('MRR') ? title : `${title} | MRR`;
  
  return (
    <>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="MRR Portfolio" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      
      {/* PWA */}
      <meta name="theme-color" content="#ff4500" />
      <meta name="msapplication-TileColor" content="#ff4500" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="MRR Toolkit" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Muhammad Rafli Ramadhan',
            jobTitle: 'Graphic Designer & Community Development',
            url: url,
            sameAs: [
              'https://instagram.com/rafli161102',
              'https://linkedin.com/in/muhammad-rafli-ramadhan',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'MRR Design'
            }
          })
        }}
      />
      
      {children}
    </>
  );
}
