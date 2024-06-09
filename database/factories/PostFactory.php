<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->text(30),
            'body' => $this->faker->realText(300),
            'user_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }
}
