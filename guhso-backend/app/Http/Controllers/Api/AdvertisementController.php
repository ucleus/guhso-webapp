<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of advertisements.
     */
    public function index(Request $request)
    {
        $query = Advertisement::query();

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $now = Carbon::now();
                $query->where(function ($q) use ($now) {
                    $q->where('is_active', false)
                      ->orWhere(function ($q2) use ($now) {
                          $q2->whereNotNull('start_at')->where('start_at', '>', $now)
                             ->orWhereNotNull('end_at')->where('end_at', '<', $now);
                      });
                });
            }
        }

        return response()->json($query->latest()->paginate($request->get('per_page', 10)));
    }

    /**
     * Return active advertisements for frontend display.
     */
    public function active()
    {
        return response()->json(Advertisement::active()->get());
    }

    /**
     * Store a newly created advertisement.
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
            'is_active' => 'boolean',
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

        $ad = Advertisement::create($validated);

        return response()->json($ad, 201);
    }

    /**
     * Display the specified advertisement.
     */
    public function show(Advertisement $ad)
    {
        return response()->json($ad);
    }

    /**
     * Update the specified advertisement.
     */
    public function update(Request $request, Advertisement $ad)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'website_url' => 'sometimes|nullable|url',
            'facebook_url' => 'sometimes|nullable|url',
            'twitter_url' => 'sometimes|nullable|url',
            'instagram_url' => 'sometimes|nullable|url',
            'linkedin_url' => 'sometimes|nullable|url',
            'phone' => 'sometimes|nullable|string|max:50',
            'email' => 'sometimes|nullable|email',
            'start_at' => 'sometimes|nullable|date',
            'duration_days' => 'sometimes|nullable|integer|min:1',
            'end_at' => 'sometimes|nullable|date',
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

        $ad->update($validated);

        return response()->json($ad);
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

        return response()->json(['message' => 'Advertisement deleted successfully']);
    }
}
