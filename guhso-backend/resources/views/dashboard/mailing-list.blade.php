@extends('dashboard.layout')

@section('title', 'Mailing List - Guhso')

@section('content')
<div class="mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Mailing List</h1>
    <p class="mt-1 text-sm text-gray-600">Subscribers to the Guhso team.</p>
</div>

@if(session('status'))
<div class="mb-4 p-3 bg-green-100 text-green-800 rounded">
    {{ session('status') }}
</div>
@endif

<div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Subscribers</h3>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($entries as $entry)
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">{{ $entry->first_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ $entry->email }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

<div class="bg-white shadow sm:rounded-lg p-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Create Email Campaign</h3>
    <form action="{{ route('dashboard.mailing-list.send') }}" method="POST">
        @csrf
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input type="text" name="subject" class="w-full border-gray-300 rounded-md" required>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email HTML</label>
            <textarea name="content" id="emailContent" class="w-full border-gray-300 rounded-md h-48 p-2 font-mono" required></textarea>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Preview</label>
            <iframe id="preview" class="w-full h-48 border rounded"></iframe>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send Email</button>
    </form>
</div>

<script>
    document.getElementById('emailContent').addEventListener('input', function() {
        document.getElementById('preview').srcdoc = this.value;
    });
</script>
@endsection
