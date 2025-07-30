@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">CSRF Test Form</div>
                <div class="card-body">
                    <form method="POST" action="/test-form">
                        @csrf
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Test Submit</button>
                    </form>
                    
                    <hr>
                    <p>Debug info:</p>
                    <ul>
                        <li>CSRF Token: {{ csrf_token() }}</li>
                        <li>Session ID: {{ session()->getId() }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection