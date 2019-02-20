<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}"/>
        <link rel="manifest" href="/manifest.json">

        <!-- Add to home screen for Safari on iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Nucleus PWA">
        <link rel="apple-touch-icon" href="/img/pwa-icon.png">
    </head>
    <body>
        @yield('content')
    </body>
</html>
