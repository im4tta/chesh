Iconsmith pack contents
========================

favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
favicon-96x96.png
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
maskable-icon-192x192.png
maskable-icon-512x512.png
mstile-150x150.png
browserconfig.xml
site.webmanifest
og-image.png
favicon.svg

Drop these into your site root, then paste this into <head>:

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#FF5A1F">
<meta name="msapplication-TileColor" content="#FF5A1F">
<meta name="msapplication-config" content="/browserconfig.xml">

<meta property="og:title" content="My Site">
<meta property="og:description" content="A short line about what this is.">
<meta property="og:image" content="https://yoursite.com/og-image.png">
<meta property="og:url" content="https://yoursite.com">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="My Site">
<meta name="twitter:description" content="A short line about what this is.">
<meta name="twitter:image" content="https://yoursite.com/og-image.png">