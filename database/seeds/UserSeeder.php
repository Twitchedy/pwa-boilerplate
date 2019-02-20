<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['id' => 1, 'name' => 'Admin', 'email' => 'example@web.com', 'password' => bcrypt('password'), 'created_at' => new DateTime, 'updated_at' => new DateTime],
        ]);
    }
}
