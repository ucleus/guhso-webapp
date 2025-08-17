<?php

namespace App\Http\Controllers;

use App\Models\MailingList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailingListController extends Controller
{
    // Display dashboard view
    public function index()
    {
        $entries = MailingList::latest()->get();
        return view('dashboard.mailing-list', compact('entries'));
    }

    // Store new subscriber from API
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:100',
            'email' => 'required|email|unique:mailing_lists,email',
        ]);

        MailingList::create($data);
        return response()->json(['message' => 'Subscribed'], 201);
    }

    // Send email campaign
    public function send(Request $request)
    {
        $data = $request->validate([
            'subject' => 'required|string',
            'content' => 'required|string',
        ]);

        $recipients = MailingList::all();
        foreach ($recipients as $recipient) {
            Mail::send([], [], function ($message) use ($recipient, $data) {
                $message->to($recipient->email, $recipient->first_name)
                        ->subject($data['subject'])
                        ->setBody($data['content'], 'text/html');
            });
        }

        return back()->with('status', 'Emails sent!');
    }
}
