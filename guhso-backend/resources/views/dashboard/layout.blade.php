<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Guhso Dashboard')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
        <div class="w-full px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Left side - Dashboard title -->
                <div class="flex-1">
                    <h1 class="text-xl font-semibold text-gray-900">
                        GUHSO DASHBOARD
                    </h1>
                </div>
                
                <!-- Right side - User info and logout -->
                <div class="flex items-center space-x-6">
                    <span class="text-gray-700 font-medium">{{ Auth::user()->name }}</span>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg">
            <div class="flex flex-col h-full">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-center h-16 px-4 bg-gray-900 border-b border-gray-700">
                    <h2 class="text-xl font-bold text-white">
                        <i class="fas fa-podcast text-blue-400 mr-2"></i>
                        Guhso
                    </h2>
                </div>
                
                <!-- Navigation Links -->
                <nav class="flex-1 px-4 py-6 sidebar-nav overflow-y-auto">
                    <!-- Main Navigation -->
                    <div class="flex flex-col space-y-2 mb-8">
                        <a href="{{ route('dashboard') }}" class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                            <i class="fas fa-tachometer-alt nav-icon" style="margin-right: 16px;"></i>
                            <span>Dashboard</span>
                        </a>
                        <a href="{{ route('dashboard.shows') }}" class="nav-link {{ request()->routeIs('dashboard.shows') ? 'active' : '' }}">
                            <i class="fas fa-podcast nav-icon" style="margin-right: 16px;"></i>
                            <span>Shows</span>
                        </a>
                        <a href="{{ route('dashboard.episodes') }}" class="nav-link {{ request()->routeIs('dashboard.episodes') ? 'active' : '' }}">
                            <i class="fas fa-play-circle nav-icon" style="margin-right: 16px;"></i>
                            <span>Episodes</span>
                        </a>
                        <a href="{{ route('dashboard.posts') }}" class="nav-link {{ request()->routeIs('dashboard.posts*') ? 'active' : '' }}">
                            <i class="fas fa-blog nav-icon" style="margin-right: 16px;"></i>
                            <span>Posts</span>
                        </a>
                        <a href="{{ route('dashboard.ads') }}" class="nav-link {{ request()->routeIs('dashboard.ads*') ? 'active' : '' }}">
                            <i class="fas fa-bullhorn nav-icon" style="margin-right: 16px;"></i>
                            <span>Advertisements</span>
                        </a>
                        <a href="{{ route('dashboard.products') }}" class="nav-link {{ request()->routeIs('dashboard.products*') ? 'active' : '' }}">
                            <i class="fas fa-box nav-icon" style="margin-right: 16px;"></i>
                            <span>Products</span>
                        </a>
                        <a href="{{ route('dashboard.users') }}" class="nav-link {{ request()->routeIs('dashboard.users') ? 'active' : '' }}">
                            <i class="fas fa-users nav-icon" style="margin-right: 16px;"></i>
                            <span>Users</span>
                        </a>
                        <a href="{{ route('dashboard.mailing-list') }}" class="nav-link {{ request()->routeIs('dashboard.mailing-list*') ? 'active' : '' }}">
                            <i class="fas fa-envelope nav-icon" style="margin-right: 16px;"></i>
                            <span>Mailing List</span>
                        </a>
                    </div>
                    
                    <!-- Separator -->
                    <div class="border-t border-gray-700 mb-6"></div>
                    
                    <!-- API Section -->
                    <div class="flex flex-col space-y-2">
                        <h3 class="px-3 py-2 text-xs font-semibold uppercase tracking-wider mb-2" style="color: #f2f2f2;">
                            Developer Tools
                        </h3>
                        <a href="/api-status" target="_blank" class="nav-link">
                            <i class="fas fa-code nav-icon" style="margin-right: 16px;"></i>
                            <span>API Status</span>
                            <i class="fas fa-external-link-alt text-xs ml-auto" style="color: #f2f2f2;"></i>
                        </a>
                        <a href="/api/v1/posts" target="_blank" class="nav-link">
                            <i class="fas fa-database nav-icon" style="margin-right: 16px;"></i>
                            <span>API Explorer</span>
                            <i class="fas fa-external-link-alt text-xs ml-auto" style="color: #f2f2f2;"></i>
                        </a>
                    </div>
                </nav>
                
                <!-- Sidebar Footer -->
                <div class="px-4 py-4 border-t border-gray-700">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <div class="ml-3 flex-1">
                            <p class="text-sm font-medium text-white truncate">{{ Auth::user()->name }}</p>
                            <p class="text-xs text-gray-400">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>
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
            @apply flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out group;
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
            margin-bottom: 0 !important;
            color: #f2f2f2 !important;
        }
        .nav-link.active {
            @apply shadow-lg;
            color: #FF6B35 !important;
        }
        .nav-link:hover {
            @apply transform translate-x-1;
            color: white !important;
        }
        .nav-icon {
            @apply w-5 h-5 mr-4 transition-colors duration-200;
            flex-shrink: 0 !important;
            color: #f2f2f2 !important;
        }
        .nav-link:hover .nav-icon {
            color: white !important;
        }
        .nav-link.active .nav-icon {
            color: #FF6B35 !important;
        }
        .nav-link.active:hover {
            color: #FF6B35 !important;
        }
        .nav-link.active:hover .nav-icon {
            color: #FF6B35 !important;
        }
        
        /* Force vertical stacking */
        nav {
            display: flex !important;
            flex-direction: column !important;
        }
        nav > div {
            display: flex !important;
            flex-direction: column !important;
        }
        
        /* Smooth hover animations */
        .nav-link {
            position: relative;
        }
        .nav-link::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(135deg, #FF6B35, #F7931E);
            border-radius: 0 2px 2px 0;
            transform: scaleY(0);
            transition: transform 0.2s ease-in-out;
        }
        .nav-link.active::before {
            transform: scaleY(1);
        }
        
        /* Custom scrollbar for sidebar */
        .sidebar-nav::-webkit-scrollbar {
            width: 4px;
        }
        .sidebar-nav::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
        }
        .sidebar-nav::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
        }
        .sidebar-nav::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    </style>
</body>
</html>
