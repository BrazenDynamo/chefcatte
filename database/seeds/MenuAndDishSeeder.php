<?php

use Illuminate\Database\Seeder;

class MenuAndDishSeeder extends Seeder {

    public function run() {
        $menu = [
            [
                'name' => 'lunchbox',
                'slug' => 'lunchbox',
                'user_id' => '2',
            ]
        ];

        $categories = [
            ['name' => 'mains', 'menu_id' => 1],
            ['name' => 'baked', 'menu_id' => 1],
            ['name' => 'take homes', 'menu_id' => 1],
            ['name' => 'ban chan', 'menu_id' => 1],
        ];

        $dishes = [
            [ // 0
                'name' => 'Japanese Vegetable Curry',
                'description' => 'Potatoes, carrots, and eggplants in a tomato-based curry sauce',
                'price' => 125,
                'category_id' => 1,
                'menu_id' => 1,
            ],
            [ // 1
                'name' => 'Chicken Adobo',
                'description' => 'Chicken adobo with soft-boiled eggs',
                'price' => 125,
                'category_id' => 1,
                'menu_id' => 1,
            ],
            [ // 2
                'name' => 'Spring Rolls',
                'description' => 'Cucumber, carrots, peanuts, cilantro, and tofu or smoked chicken filling wrapped in rice paper. Comes with peanut sauce',
                'price' => 100,
                'category_id' => 1,
                'menu_id' => 1,
            ],
            [ // 3
                'name' => 'Sweet Potato Cake',
                'description' => 'Baked sweet potato custard in a potato skin',
                'price' => 45,
                'category_id' => 2,
                'menu_id' => 1,
            ],
            [ // 4
                'name' => 'Hokkaido Rolls',
                'description' => 'Your white dinner roll but better',
                'price' => 45,
                'category_id' => 2,
                'menu_id' => 1,
            ],
            [ // 5
                'name' => 'Tangzhong Cinnamon Rolls',
                'description' => 'Giant swirled cinnamon rolls with frosting',
                'price' => 55,
                'category_id' => 2,
                'menu_id' => 1,
            ],
            [ // 6
                'name' => 'Pizza Rolls',
                'description' => 'Tomato, basil, cheese, and more cheese',
                'price' => 55,
                'category_id' => 2,
                'menu_id' => 1,
            ],
            [ // 7
                'name' => 'Fresh Pasta',
                'description' => 'One serving is enough for one person. Swirl in boiling water for 3 minutes, then finish cooking in the sauce for 3 more minutes',
                'price' => 50,
                'category_id' => 3,
                'menu_id' => 1,
            ],
            [ // 8
                'name' => 'Tomato Sauce',
                'description' => 'Sauce for your pasta',
                'price' => 50,
                'category_id' => 3,
                'menu_id' => 1,
            ],
            [ // 9
                'name' => 'Kimchi',
                'description' => 'Cabbage and other greens. Good for 4',
                'price' => 100,
                'category_id' => 4,
                'menu_id' => 1,
            ],
            [ // 10
                'name' => 'Braised Potato',
                'description' => 'Baby potatoes in soy sauce and ssalyeot and roasted sesame seeds',
                'price' => 100,
                'category_id' => 4,
                'menu_id' => 1,
            ],
            [ // 11
                'name' => 'Japchae',
                'description' => 'Carrots, cabbage, mung bean sprouts, and sesame seeds',
                'price' => 100,
                'category_id' => 4,
                'menu_id' => 1,
            ],
            [ // 12
                'name' => 'Kimchi Dumplings',
                'description' => 'Dumplings stuffed with kimchi. 4 pieces',
                'price' => 100,
                'category_id' => 4,
                'menu_id' => 1,
            ],
        ];

        $dishOptions = [
            [ 
                'name' => 'spiciness',
                'description' => 'how spicy your curry is',
                'dish_id' => 1,
            ],
            [ 
                'name' => 'filling',
                'description' => 'what your spring rolls will have inside them',
                'dish_id' => 3,
            ],
            [ 
                'name' => 'spiciness',
                'description' => 'how spicy your kimchi is',
                'dish_id' => 10,
            ],
            [ 
                'name' => 'cooking method',
                'description' => 'how you want your dumplings cooked',
                'dish_id' => 13,
            ],
        ];

        $dishOptionValues = [
            [
                'description' => 'mild',
                'place_number' => 0,
                'dish_option_id' => 1,
            ],
            [
                'description' => 'spicy',
                'place_number' => 1,
                'dish_option_id' => 1,
            ],
            [
                'description' => 'crying spicy',
                'place_number' => 2,
                'dish_option_id' => 1,
            ],
            [
                'description' => 'tofu',
                'place_number' => 0,
                'dish_option_id' => 2,
            ],
            [
                'description' => 'smoked chicken',
                'place_number' => 1,
                'dish_option_id' => 2,
            ],
            [
                'description' => 'spicy',
                'place_number' => 0,
                'dish_option_id' => 3,
            ],
            [
                'description' => 'super spicy',
                'place_number' => 1,
                'dish_option_id' => 3,
            ],
            [
                'description' => 'steamed',
                'place_number' => 0,
                'dish_option_id' => 4,
            ],
            [
                'description' => 'fried',
                'place_number' => 1,
                'dish_option_id' => 4,
            ],
        ];

        DB::table('menu')->insert($menu);
        DB::table('dish_category')->insert($categories);
        DB::table('dish')->insert($dishes);
        DB::table('dish_option')->insert($dishOptions);
        DB::table('dish_option_value')->insert($dishOptionValues);
    }
}