<x-mail::message>
    Hello {{$user->name}},

    @if($user->is_admin)
        Your are now admin in the system. you can add and block users.
    @else
       Your role was changed into regular user. you are no longer able to add or block users.
    @endif
    <br>

    Thank you <br>
    {{config('app.name')}}
</x-mail::message>
