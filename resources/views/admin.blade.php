@php
  $route = Route::currentRouteName();
  // $component = Router::components[$route];
  // $admintoInstance = isset($component['adminto-instance']) ? $component['adminto-instance'] : false;
@endphp

<!DOCTYPE html>
<html lang="es">

<head>
  @viteReactRefresh
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <title>Panel - {{ env('APP_NAME', 'Vuá') }}</title>
  <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">

  <meta name="csrf_token" content="{{ csrf_token() }}">

  <link href="/lte/assets/libs/mohithg-switchery/switchery.min.css" rel="stylesheet" type="text/css" />
  <link href="/lte/assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />

  {{-- QuillJs Styles --}}
  <link href="/lte/assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />
  <link href="/lte/assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />

  {{-- Exportable Scripts --}}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

  {{-- DxDataGrid Styles --}}
  <link href="/lte/assets/libs/dxdatagrid/css/dx.light.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
    rel="stylesheet" type="text/css" id="dg-default-stylesheet" />
  <link href="/lte/assets/libs/dxdatagrid/css/dx.dark.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
    rel="stylesheet" type="text/css" id="dg-dark-stylesheet" disabled="disabled" />

  {{-- Bootstrap Styles --}}
  <link href="/lte/assets/css/config/default/bootstrap.min.css" rel="stylesheet" type="text/css"
    id="bs-default-stylesheet" />
  <link href="/lte/assets/css/config/default/bootstrap-dark.min.css" rel="stylesheet" type="text/css"
    id="bs-dark-stylesheet" disabled="disabled" />

  {{-- App Styles --}}
  <link href="/lte/assets/css/config/default/app.css" rel="stylesheet" type="text/css" id="app-default-stylesheet" />
  <link href="/lte/assets/css/config/default/app-dark.css" rel="stylesheet" type="text/css" id="app-dark-stylesheet"
    disabled="disabled" />

  {{-- icons --}}
  <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

  <!-- Leaflet CSS -->
  <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <!-- Leaflet JS (global) -->
  <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-o9N1j7kP6+HkldQxs+g7W+U7Z3w3kM4DAEJOfGraaD8rMEY"
      crossOrigin=""
  ></script>

    
  @vite('resources/js/' . $route)
  @inertiaHead

  <style>
    .tippy-tooltip {
      padding: 0;
    }

    .dx-datagrid-content .dx-datagrid-table .dx-row>td {
      vertical-align: middle;
    }
  </style>
</head>

<body class="loading"
  data-layout='{"mode": "horizontal", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "gradient", "size": "default", "showuser": true}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>
  @inertia

  <div class="rightbar-overlay"></div>
  <script src="/lte/assets/libs/qrcodejs/qrcode.min.js"></script>
  <!-- Extends js -->
  <script src="/assets/js/file.extend.js"></script>
  <script src="/assets/js/storage.extend.js"></script>
  <script src="/assets/js/clipboard.extend.js"></script>

  <!-- Vendor js -->
  <script src="/lte/assets/js/vendor.min.js"></script>

  @if ($route == 'home')
    <script src="/lte/assets/libs/jquery-knob/jquery.knob.min.js"></script>
  @endif
  <script src="/lte/assets/libs/quill/quill.min.js"></script>
  <script src="/lte/assets/libs/mohithg-switchery/switchery.min.js"></script>
  <script src="/lte/assets/libs/select2/js/select2.full.min.js"></script>
  <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>

  <!-- App js -->
  <script src="/lte/assets/js/app.js?v={{ uniqid() }}"></script>

  <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
  <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.es.js"></script>
  <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.en.js"></script>
  <script src="/lte/assets/libs/moment/min/moment.min.js"></script>
  <script src="/lte/assets/libs/moment/moment-timezone.js"></script>
  <script src="/lte/assets/libs/moment/locale/es.js"></script>
  <script>
    document.addEventListener('click', function(event) {
      const target = event.target;

      if (target.tagName === 'BUTTON' && target.hasAttribute('copy')) {
        let copy = target.getAttribute('copy')
        if (target.hasAttribute('copy-selector')) {
          copy = document.querySelector(target.getAttribute('copy-selector')).textContent
        }
        Clipboard.copy(copy, () => {
          console.log('Copiado correctamente')
        })
      }
    });
  </script>
</body>

</html>
