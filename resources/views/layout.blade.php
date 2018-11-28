<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Lunchbox</title>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" />
  @yield('head')
</head>
<body>
  <div class="container">
    @yield('content')
  </div>
  @yield('scripts')
</body>
</html>