<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Guhso Dashboard')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-semibold text-gray-900">Guhso Dashboard</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-700">{{ Auth::user()->name }}</span>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-sm min-h-screen">
            <nav class="mt-5 px-2">
                <a href="{{ route('dashboard') }}" class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </a>
                <a href="{{ route('dashboard.shows') }}" class="nav-link {{ request()->routeIs('dashboard.shows') ? 'active' : '' }}">
                    <i class="fas fa-podcast"></i> Shows
                </a>
                <a href="{{ route('dashboard.episodes') }}" class="nav-link {{ request()->routeIs('dashboard.episodes') ? 'active' : '' }}">
                    <i class="fas fa-play-circle"></i> Episodes
                </a>
                <a href="{{ route('dashboard.users') }}" class="nav-link {{ request()->routeIs('dashboard.users') ? 'active' : '' }}">
                    <i class="fas fa-users"></i> Users
                </a>
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">API</h3>
                    <a href="/api-status" target="_blank" class="nav-link">
                        <i class="fas fa-code"></i> API Status
                    </a>
                    <a href="/api/v1/episodes" target="_blank" class="nav-link">
                        <i class="fas fa-database"></i> Test API
                    </a>
                </div>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
            <main class="py-6 px-8">
                @yield('content')
            </main>
        </div>
    </div>

    <style>
        .nav-link {
            @apply group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-1;
        }
        .nav-link.active {
            @apply bg-gray-100 text-gray-900;
        }
        .nav-link i {
            @apply mr-3 text-gray-400 group-hover:text-gray-500;
            width: 16px;
        }
    </style>
</body>
</html>
