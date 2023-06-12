const MetaTags = ({
  image = '',
  path = '',
  domain = '',
}: {
  image?: string;
  path?: any;
  domain?: string;
}): React.ReactElement => (
  <>
    <meta charSet="UTF-8" />
    <meta name="twitter:image" content={image} />
    <meta name="og:image:url" content={image} />
    <meta name="og:image" content={image} />
    <meta name="og:url" content={image} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    {!path?.startsWith('/blog') && (
      <meta name="og:description" content="Find exclusive apartments that pay to have you." />
    )}
    <meta property="og:image:secure_url" content={image} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Lighthouse" />
    <meta name="twitter:title" content="Lighthouse" />
    <meta name="twitter:text:title" content="Lighthouse" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta name="og:image:width" content="1100" />
    <meta name="og:image:height" content="650" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="msapplication-TileColor" content="#1E534F" />
    <meta name="msapplication-TileImage" content="/static/assets/meta/ms-icon-144x144.png" />
    <meta name="theme-color" content="#34966D" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="msapplication-config" content="/static/assets/meta/browserconfig.xml" />
    <meta name="application-name" content="Lighthouse" />
    <meta name="apple-mobile-web-app-title" content="Lighthouse" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />

    <link rel="preconnect" href="https://segment.com" />
    <link rel="preconnect" href="https://cdn.segment.com" />
    <link rel="preconnect" href="https://cdn.amplitude.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
    <link rel="preconnect" href="https://widget.trustpilot.com" />
    <link rel="preconnect" href="https://www.googleadservices.com" />
    <link rel="preconnect" href="https://www.googleadservices.com" />
    <link rel="preconnect" href="https://js.hs-analytics.net/" />
    <link rel="preconnect" href="https://js.hsadspixel.net" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://segment.com" />
    <link rel="dns-prefetch" href="https://cdn.segment.com" />
    <link rel="dns-prefetch" href="https://cdn.amplitude.com" />
    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    <link rel="dns-prefetch" href="https://widget.trustpilot.com" />
    <link rel="dns-prefetch" href="https://www.googleadservices.com" />
    <link rel="dns-prefetch" href="https://www.googleadservices.com" />
    <link rel="dns-prefetch" href="https://js.hs-analytics.net/" />
    <link rel="dns-prefetch" href="https://js.hsadspixel.net" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="canonical" href={`https://lighthouse.app${path}`} />

    <link rel="preconnect" href="https://segment.com" />
    <link rel="preconnect" href="https://cdn.segment.com" />
    <link rel="preconnect" href="https://cdn.amplitude.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
    <link rel="preconnect" href="https://widget.trustpilot.com" />
    <link rel="preconnect" href="https://www.googleadservices.com" />
    <link rel="preconnect" href="https://www.googleadservices.com" />
    <link rel="preconnect" href="https://js.hs-analytics.net/" />
    <link rel="preconnect" href="https://js.hsadspixel.net" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://segment.com" />
    <link rel="dns-prefetch" href="https://cdn.segment.com" />
    <link rel="dns-prefetch" href="https://cdn.amplitude.com" />
    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    <link rel="dns-prefetch" href="https://widget.trustpilot.com" />
    <link rel="dns-prefetch" href="https://www.googleadservices.com" />
    <link rel="dns-prefetch" href="https://www.googleadservices.com" />
    <link rel="dns-prefetch" href="https://js.hs-analytics.net/" />
    <link rel="dns-prefetch" href="https://js.hsadspixel.net" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="canonical" href={`${domain}${path}`} />

    <link rel="manifest" href="/static/manifest.json" />

    <link rel="apple-touch-icon" sizes="57x57" href="/static/assets/meta/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/static/assets/meta/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/static/assets/meta/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/static/assets/meta/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/static/assets/meta/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/static/assets/meta/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/static/assets/meta/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/static/assets/meta/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/static/assets/meta/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/static/assets/meta/android-icon-192x192.png" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/meta/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/static/assets/meta/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/meta/favicon-16x16.png" />
  </>
);

export default MetaTags;
