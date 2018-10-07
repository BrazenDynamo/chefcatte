window.onload = function() {
    var items = {
        curry: {
            name: 'Japanese Vegetable Curry',
            category: 'mains',
            price: 125,
            options: [
                { name: 'spiciness', values: ['mild', 'spicy', 'crying spicy'] }
            ],
            description: 'Potatoes, carrots, and eggplants in a tomato-based curry sauce'
        },
        adobo: {
            name: 'Chicken Adobo',
            category: 'mains',
            price: 125,
            options: [],
            description: 'Chicken adobo with soft-boiled eggs'
        },
        springRolls: {
            name: 'Spring Rolls',
            category: 'mains',
            price: 100,
            options: [
                { name: 'filling', values: ['tofu', 'smoked chicken'] }
            ],
            description: 'Cucumber, carrots, peanuts, cilantro, and tofu or smoked chicken filling wrapped in rice paper. Comes with peanut sauce'
        },
        sweetPotato: {
            name: 'Sweet Potato Cake',
            category: 'baked',
            price: 45,
            options: [],
            description: 'Baked sweet potato custard in a potato skin'
        },
        hokkaidoRolls: {
            name: 'Hokkaido Rolls',
            category: 'baked',
            price: 45,
            options: [],
            description: 'Your white dinner roll but better'
        },
        tangzhongCinnamonRolls: {
            name: 'Tangzhong Cinnamon Rolls',
            category: 'baked',
            price: 55,
            options: [],
            description: 'Giant swirled cinnamon rolls with frosting'
        },
        pizzaRolls: {
            name: 'Pizza Rolls',
            category: 'baked',
            price: 55,
            options: [],
            description: 'Tomato, basil, cheese, and more cheese'
        },
        freshPasta: {
            name: 'Fresh Pasta',
            category: 'takeHomes',
            price: 50,
            options: [],
            description: 'One serving is enough for one person. Swirl in boiling water for 3 minutes, then finish cooking in the sauce for 3 more minutes'
        },
        tomatoSauce: {
            name: 'Tomato Sauce',
            category: 'takeHomes',
            price: 50,
            options: [],
            description: 'Sauce for your pasta'
        },
        kimchi: {
            name: 'Kimchi',
            category: 'banChan',
            price: 100,
            options: [
                { name: 'spiciness', values: ['spicy', 'super spicy'] }
            ],
            description: 'Cabbage and other greens. Good for 4'
        },
        braisedPotato: {
            name: 'Braised Potato',
            category: 'banChan',
            price: 100,
            options: [],
            description: 'Baby potatoes in soy sauce and ssalyeot and roasted sesame seeds'
        },
        japchae: {
            name: 'Japchae',
            category: 'banChan',
            price: 100,
            options: [],
            description: 'Carrots, cabbage, mung bean sprouts, and sesame seeds'
        },
        kimchiDumplings: {
            name: 'Kimchi Dumplings',
            category: 'banChan',
            price: 100,
            options: [
                { name: 'cooking-method', values: ['steamed', 'fried'] }
            ],
            description: 'Dumplings stuffed with kimchi. 4 pieces'
        }
    }

    Vue.component('menu-item',
        {
            props: ['item'],
            data: function() {
                return {
                    subtotal: 0
                };
            },
            methods: {
                computeTotal: function(amount, checked) {
                    this.subtotal += amount * (checked? -1 : 1); 
                }
            },
            computed: {

            },
            template: `
            <div class="category">
                <div class="entry" v-for="(item, name) in items">
                    <label>
                        <input type="checkbox" :name="name" v-model="item.checked" v-on:click="computeTotal(item.price, item.checked)"> {{ item.name }} - {{ item.price }}
                    </label>
                    <div>{{ item.description }}</div>
                    <span v-show="item.checked" v-for="option in item.options">
                        <span v-for="(value, index) in option.values">
                            <label>
                                <input type="radio" :name="option.name" :value="index" required> {{ value }}
                            </label>
                        </span>
                    </span>
                </div>
                <div>
                    Subtotal: {{ subtotal }}
                </div>
                <hr>
            </div>
            `,
            template: `
            <div class="menu-item">
                <div>
                    <label>
                        <input type="checkbox" :name="item.name" v-model="item.checked"> {{ item.name }} - {{ item.price }}
                    </label>
                </div>
                <div class="menu-item-description>{{ item.description }}</div>
                <span v-show="item.checked" v-for="option in item.options">
                    <span v-for="(value, index) in option.values">
                        <label>
                            <input type="radio" :name="option.name" :value="index" required>{{ value }}
                        </label>
                    </span>
                </span>
            </div>
            `
        }
    );

    var app = new Vue({
        el: "#chefcatte",
        data: items,
        watch: {},
        filters: {},
        methods: {},
        computed: {
            subtotal: function() {}
        },
        components: {
            'order-item': {
                template: "#order-item",
                props: [],
                data: function() {
                    
                },
                methods: {
                    
                }
            }
        },
        template: `
        <div>
            <div v-for="category in categories">
                <order-category v-bind:items="category"></order-category>
            </div>
        </div>
        `
    });

}