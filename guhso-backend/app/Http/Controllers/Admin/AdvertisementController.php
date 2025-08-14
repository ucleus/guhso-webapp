<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the advertisements.
     */
    public function index()
    {
        $ads = Advertisement::latest()->paginate(10);
        return view('dashboard.advertisements.index', compact('ads'));
    }

    /**
     * Show the form for creating a new advertisement.
     */
    public function create()
    {
        return view('dashboard.advertisements.create');
    }

    /**
     * Store a newly created advertisement in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'website_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'start_at' => 'nullable|date',
            'duration_days' => 'nullable|integer|min:1',
            'end_at' => 'nullable|date',
            'is_active' => 'sometimes|boolean',
        ]);

        $startAt = isset($validated['start_at']) ? Carbon::parse($validated['start_at']) : Carbon::now();
        $validated['start_at'] = $startAt;

        if (isset($validated['duration_days'])) {
            $validated['end_at'] = $startAt->copy()->addDays($validated['duration_days']);
            unset($validated['duration_days']);
        } elseif (isset($validated['end_at'])) {
            $validated['end_at'] = Carbon::parse($validated['end_at']);
        }

        if ($request->hasFile('image')) {
            $directory = public_path('images/ads');
            File::ensureDirectoryExists($directory);
            $image = $request->file('image');
            $filename = time().'_'.$image->getClientOriginalName();
            $image->move($directory, $filename);
            $validated['image'] = 'images/ads/'.$filename;
        }

        $validated['is_active'] = $request->has('is_active');

        Advertisement::create($validated);

        return redirect()->route('dashboard.ads')->with('success', 'Advertisement created successfully.');
    }

    /**
     * Show the form for editing the specified advertisement.
     */
    public function edit(Advertisement $ad)
    {
        return view('dashboard.advertisements.edit', compact('ad'));
    }

    /**
     * Update the specified advertisement in storage.
     */
    public function update(Request $request, Advertisement $ad)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'website_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'start_at' => 'nullable|date',
            'duration_days' => 'nullable|integer|min:1',
            'end_at' => 'nullable|date',
            'is_active' => 'sometimes|boolean',
        ]);

        if (isset($validated['start_at'])) {
            $startAt = Carbon::parse($validated['start_at']);
            $validated['start_at'] = $startAt;
        } else {
            $startAt = $ad->start_at;
        }

        if (isset($validated['duration_days'])) {
            $validated['end_at'] = $startAt->copy()->addDays($validated['duration_days']);
            unset($validated['duration_days']);
        } elseif (isset($validated['end_at'])) {
            $validated['end_at'] = Carbon::parse($validated['end_at']);
        }

        if ($request->hasFile('image')) {
            if ($ad->image && File::exists(public_path($ad->image))) {
                File::delete(public_path($ad->image));
            }
            $directory = public_path('images/ads');
            File::ensureDirectoryExists($directory);
            $image = $request->file('image');
            $filename = time().'_'.$image->getClientOriginalName();
            $image->move($directory, $filename);
            $validated['image'] = 'images/ads/'.$filename;
        }

        $validated['is_active'] = $request->has('is_active');

        $ad->update($validated);

        return redirect()->route('dashboard.ads')->with('success', 'Advertisement updated successfully.');
    }

    /**
     * Remove the specified advertisement from storage.
     */
    public function destroy(Advertisement $ad)
    {
        if ($ad->image && File::exists(public_path($ad->image))) {
            File::delete(public_path($ad->image));
        }
        $ad->delete();

        return redirect()->route('dashboard.ads')->with('success', 'Advertisement deleted successfully.');
    }
}
