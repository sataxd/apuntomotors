@php
    // Datos por defecto para SEO en caso de error 404
    $trackingHelper = new class {
        use App\Traits\TrackingPixelsTrait;
    };
    $trackingPixels = $trackingHelper->getTrackingPixels();
    $seoData = $trackingHelper->getSeoData();

    $seoTitle = "Página no encontrada - 404";
    $seoDescription = "La página que buscas no existe o ha sido movida.";
    
    $facebookPixel = $trackingPixels['FACEBOOK_PIXEL'] ?? null;
    $metaPixel = $trackingPixels['META_PIXEL'] ?? null;
    $googleAnalytics = $trackingPixels['GOOGLE_ANALYTICS'] ?? null;
    $gtmContainer = $trackingPixels['GTM_CONTAINER'] ?? null;
    $tiktokPixel = $trackingPixels['TIKTOK_PIXEL'] ?? null;
    $microsoftClarity = $trackingPixels['MICROSOFT_CLARITY'] ?? null;
@endphp

<!DOCTYPE html>
<html lang="es">

<head>
    @viteReactRefresh
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $seoTitle }}</title>

    <meta name="title" content="{{ $seoTitle }}" />
    <meta name="description" content="{{ $seoDescription }}" />
    
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">

    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Sora:wght@100..800&display=swap" rel="stylesheet">
    <!-- Google Tag Manager -->
    @if($gtmContainer)
        <script>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{ $gtmContainer }}');
        </script>
    @endif

    <!-- Google Analytics -->
    @if($googleAnalytics)
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $googleAnalytics }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{{ $googleAnalytics }}');
        </script>
    @endif

    <!-- Carga de tus estilos y el script específico de React para el 404 -->
    @vite(['resources/css/app.css', 'resources/js/not-found.jsx'])
</head>

<body class="bg-white">
    <!-- Google Tag Manager (noscript) -->
    @if($gtmContainer)
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmContainer }}"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
    @endif

    <!-- Contenedor donde se montará React con tu Header y Footer reales -->
    <div id="app"></div>

    <script src="/lte/assets/js/vendor.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
</body>
</html>