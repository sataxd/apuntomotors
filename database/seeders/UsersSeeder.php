<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'admin@apuntomotors.com'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Admin',
            'password' => 'r00tme'
        ])->assignRole('Admin');
       
        User::updateOrCreate([
            'email' => 'customer@apuntomotors.com'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Customer',
            'password' => '123456789'
        ])->assignRole('Customer');
    }
}
