@extends('layout')

@section('content')
<div id="chefcatte">
    <menu-order></menu-order>
</div>
<div id="app"></div>
@endsection

@section('head')
<link href="{{ asset('css/index.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('scripts')
  <script src="{{ asset('js/data.js') }}"></script>
  <script src="{{ mix('js/app.js') }}" ></script>
  {{-- <script src="js/app.js"></script> --}}
{{-- <script src="{{ asset('js/index.js') }}"></script> --}}
@endsection