<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Jobs\DeleteGroupJob;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    public function store(StoreGroupRequest $request)
    {
        $data = $request->validated();
        $user_ids = $data['user_ids'] ?? [];
        $image = $request->file('image');
        unset($data['avatar']);
        if ($image) {
            $imageName = uniqid('group_') . '.' . $image->getClientOriginalExtension();
            $data['image'] = $image->storeAs('groups', $imageName, 'public');
        }

        $group = Group::create($data);
        $group->users()->attach(array_unique([$request->user()->id, ...$user_ids]));
        return redirect()->back();
    }

    public function update(UpdateGroupRequest $request, Group $group)
    {
        $data = $request->validated();
        $user_ids = $data['user_ids'] ?? [];
        $image = $request->file('image');
        unset($data['avatar']);
        if ($image) {
            if ($group->image) {
                Storage::disk('public')->delete($group->image);
            }
            $imageName = uniqid('group_') . '.' . $image->getClientOriginalExtension();
            $data['image'] = $image->storeAs('groups', $imageName, 'public');
        }
        $group->update($data);
        $group->users()->detach();
        $group->users()->attach(array_unique([$request->user()->id, ...$user_ids]));
        return redirect()->back();
    }

    public function destroy(Group $group)
    {
        if ($group->owner_id !== auth()->id()) {
            abort(403);
        }
        DeleteGroupJob::dispatch($group)->delay(now()->addSeconds(10));
        return response()->json(['message' => 'Group delete was scheduled and will be deleted soon']);
    }
}
