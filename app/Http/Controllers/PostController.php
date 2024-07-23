<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function index()
    {
        return inertia('Posts/Index');
    }

    public function show(Post $post)
    {
        $post = Post::where('id', $post->id)->first();
        return inertia('Posts/Post', [
            'post' => new PostResource($post)
        ]);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $image = $request->file('image');
        unset($data['image']);
        $data['user_id'] = Auth::id();
        $post = Post::create($data);
        $attachments = [];
        if ($image) {
            $directory = 'posts/' . Str::random(32);
            Storage::makeDirectory($directory);

            $model = [
                'post_id' => $post->id,
                'name' => $image->getClientOriginalName(),
                'mime' => $image->getClientMimeType(),
                'size' => $image->getSize(),
                'path' => $image->store($directory, 'public'),
            ];

            $attachment = PostAttachment::create($model);
            $attachments[] = $attachment;
            $post->attachments = $attachments;
        }
        return redirect()->back();
    }
}
