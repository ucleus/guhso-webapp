@extends('dashboard.layout')

@section('title', 'Edit Episode - Guhso Dashboard')

@section('content')
<div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Edit Episode</h1>
            <p class="text-gray-600 mt-1">Update episode details and thumbnail</p>
        </div>
        <a href="{{ route('dashboard.episodes') }}" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i>
            Back to Episodes
        </a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Episode Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Episode Details</h2>
            
            <form action="{{ route('dashboard.episodes.update', $episode) }}" method="POST">
                @csrf
                @method('PUT')
                
                <div class="space-y-6">
                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input type="text" id="title" name="title" value="{{ old('title', $episode->title) }}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        @error('title')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                    
                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="description" name="description" rows="6" 
                                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $episode->description) }}</textarea>
                        @error('description')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                    
                    <!-- Published Status -->
                    <div class="flex items-center">
                        <input type="checkbox" id="is_published" name="is_published" value="1" 
                               {{ $episode->is_published ? 'checked' : '' }}
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label for="is_published" class="ml-2 text-sm font-medium text-gray-700">Published</label>
                    </div>
                    
                    <!-- Episode Metadata (Read-only) -->
                    <div class="pt-4 border-t border-gray-200">
                        <h3 class="text-sm font-medium text-gray-700 mb-3">Episode Information</h3>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500">Episode:</span>
                                <span class="ml-2 font-medium">{{ $episode->episode_number ?? 'N/A' }}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Season:</span>
                                <span class="ml-2 font-medium">{{ $episode->season_number ?? 'N/A' }}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Duration:</span>
                                <span class="ml-2 font-medium">{{ $episode->itunes_duration ?? 'N/A' }}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Published:</span>
                                <span class="ml-2 font-medium">{{ $episode->published_at ? $episode->published_at->format('M j, Y') : 'N/A' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-end mt-8">
                    <button type="submit" class="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <i class="fas fa-save mr-2"></i>
                        Update Episode
                    </button>
                </div>
            </form>
        </div>
        
        <!-- Thumbnail Upload -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Episode Thumbnail</h2>
            
            <!-- Current Thumbnail -->
            <div class="mb-6">
                <div id="current-thumbnail" class="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    @if($episode->thumbnail_url)
                        <img src="{{ $episode->thumbnail_url }}" alt="{{ $episode->title }}" class="w-full h-full object-cover">
                    @elseif($episode->itunes_image)
                        <img src="{{ $episode->itunes_image }}" alt="{{ $episode->title }}" class="w-full h-full object-cover">
                    @else
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-image text-gray-400 text-4xl mb-2"></i>
                                <p class="text-gray-500">No thumbnail uploaded</p>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
            
            <!-- Upload Form -->
            <form id="thumbnail-upload-form" enctype="multipart/form-data">
                @csrf
                <div class="space-y-4">
                    <div>
                        <label for="thumbnail" class="block text-sm font-medium text-gray-700 mb-2">Upload New Thumbnail</label>
                        <input type="file" id="thumbnail" name="thumbnail" accept="image/*" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <p class="text-xs text-gray-500 mt-1">Accepted formats: JPEG, PNG, JPG, GIF. Max size: 2MB</p>
                    </div>
                    
                    <!-- Preview -->
                    <div id="thumbnail-preview" class="hidden">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                        <div class="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                            <img id="preview-image" src="" alt="Preview" class="w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <button type="submit" id="upload-btn" class="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50" disabled>
                        <i class="fas fa-upload mr-2"></i>
                        <span id="upload-text">Upload Thumbnail</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
// Thumbnail preview and upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbnailInput = document.getElementById('thumbnail');
    const previewDiv = document.getElementById('thumbnail-preview');
    const previewImage = document.getElementById('preview-image');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadForm = document.getElementById('thumbnail-upload-form');
    const currentThumbnail = document.getElementById('current-thumbnail');
    const uploadText = document.getElementById('upload-text');
    
    // Handle file selection and preview
    thumbnailInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            
            // Validate file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB.');
                return;
            }
            
            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewDiv.classList.remove('hidden');
                uploadBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        } else {
            previewDiv.classList.add('hidden');
            uploadBtn.disabled = true;
        }
    });
    
    // Handle form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(uploadForm);
        const file = thumbnailInput.files[0];
        
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        
        // Show loading state
        uploadBtn.disabled = true;
        uploadText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Uploading...';
        
        // Upload via AJAX
        fetch('{{ route("dashboard.episodes.upload-thumbnail", $episode) }}', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update current thumbnail
                currentThumbnail.innerHTML = `<img src="${data.thumbnail_url}" alt="{{ $episode->title }}" class="w-full h-full object-cover">`;
                
                // Reset form
                thumbnailInput.value = '';
                previewDiv.classList.add('hidden');
                
                // Show success message
                showNotification(data.message, 'success');
            } else {
                showNotification(data.message || 'Upload failed', 'error');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            showNotification('Upload failed. Please try again.', 'error');
        })
        .finally(() => {
            uploadBtn.disabled = false;
            uploadText.innerHTML = '<i class="fas fa-upload mr-2"></i>Upload Thumbnail';
        });
    });
});

// Simple notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}
</script>
@endsection