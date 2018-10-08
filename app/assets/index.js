window.onload = function() {
    var items = [
            {
                name: 'Japanese Vegetable Curry',
                category: 'mains',
                price: 125,
                options: [
                    { name: 'spiciness', values: ['mild', 'spicy', 'crying spicy'] }
                ],
                description: 'Potatoes, carrots, and eggplants in a tomato-based curry sauce'
            },
            {
                name: 'Chicken Adobo',
                category: 'mains',
                price: 125,
                options: [],
                description: 'Chicken adobo with soft-boiled eggs'
            },
            {
                name: 'Spring Rolls',
                category: 'mains',
                price: 100,
                options: [
                    { name: 'filling', values: ['tofu', 'smoked chicken'] }
                ],
                description: 'Cucumber, carrots, peanuts, cilantro, and tofu or smoked chicken filling wrapped in rice paper. Comes with peanut sauce'
            },
            {
                name: 'Sweet Potato Cake',
                category: 'baked',
                price: 45,
                options: [],
                description: 'Baked sweet potato custard in a potato skin'
            },
            {
                name: 'Hokkaido Rolls',
                category: 'baked',
                price: 45,
                options: [],
                description: 'Your white dinner roll but better'
            },
            {
                name: 'Tangzhong Cinnamon Rolls',
                category: 'baked',
                price: 55,
                options: [],
                description: 'Giant swirled cinnamon rolls with frosting'
            },
            {
                name: 'Pizza Rolls',
                category: 'baked',
                price: 55,
                options: [],
                description: 'Tomato, basil, cheese, and more cheese'
            },
            {
                name: 'Fresh Pasta',
                category: 'takeHomes',
                price: 50,
                options: [],
                description: 'One serving is enough for one person. Swirl in boiling water for 3 minutes, then finish cooking in the sauce for 3 more minutes'
            },
            {
                name: 'Tomato Sauce',
                category: 'takeHomes',
                price: 50,
                options: [],
                description: 'Sauce for your pasta'
            },
            {
                name: 'Kimchi',
                category: 'banChan',
                price: 100,
                options: [
                    { name: 'spiciness', values: ['spicy', 'super spicy'] }
                ],
                description: 'Cabbage and other greens. Good for 4'
            },
            {
                name: 'Braised Potato',
                category: 'banChan',
                price: 100,
                options: [],
                description: 'Baby potatoes in soy sauce and ssalyeot and roasted sesame seeds'
            },
            {
                name: 'Japchae',
                category: 'banChan',
                price: 100,
                options: [],
                description: 'Carrots, cabbage, mung bean sprouts, and sesame seeds'
            },
            {
                name: 'Kimchi Dumplings',
                category: 'banChan',
                price: 100,
                options: [
                    { name: 'cooking-method', values: ['steamed', 'fried'] }
                ],
                description: 'Dumplings stuffed with kimchi. 4 pieces'
            }
        ];
    
    var categories = ['mains', 'baked', 'takeHomes', 'banChan'];

    Vue.component('menu-category',
        {
            props: ['category', 'items'],
            template: `
                <div class="menu-category">
                    <h1>{{ category }}</h1>
                    <div class="menu-items"
                        v-for="item in items"
                    >
                        <div class="menu-item-add">+</div>
                        <div class="menu-item-details">
                            <span><b>{{ item.name }}</b> {{ item.price }}</span>
                            <span><i>{{ item.description }}</i></span>
                        </div>
                    </div>
                </div>
            `
        }
    );
    
    var app = new Vue({
        el: "#chefcatte",
        data: {
            items: items,
            categories: categories,
            orders: []
        },
        watch: {},
        filters: {
            categorize: function(items, category) {
                return items.filter(
                    item => item.category === category
                );
            },
            convertCamelCase: function (string) {
                return string
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str) {return str.toUpperCase()});
            },
            orderize: function(item) {
                return {
                    name: item.name,
                    price: item.price,
                    options: item.options
                };
            }
        },
        methods: {},
        computed: {},
        components: {},
        template: `
            <div>
                <div v-for="category in categories">
                    <menu-category
                        v-bind:category="category | convertCamelCase"
                        v-bind:items="items | categorize(category)"
                    ></menu-category>
                </div>
            </div>
        `
    });

}