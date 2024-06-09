<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'sub_body' => substr($this->body, 0, 50),
            'full_body' => $this->body,
            'user' => new UserResource($this->user),
            'image_url' => $this->attachments->isNotEmpty() ? Storage::url($this->attachments[0]->path) : '',
            'attachments' => PostAttachmentResource::collection($this->attachments),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
