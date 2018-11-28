<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder {

    public function run() {
        $users = [
            [
                'name' => 'Bryan Mendoza',
                'email' => 'brb.mendoza@gmail.com',
                'slug' => 'bryan-mendoza',
            ],
            [
                'name' => 'Richelle Amponin',
                'email' => 'richelleamponin@gmail.com',
                'slug' => 'richelle-amponin',
            ],
        ];

        // DB::table('projects')->delete();
        DB::table('user')->insert($users);
    }
}