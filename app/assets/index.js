window.onload = function() {
    var items = [
            {
                id: 0,
                name: 'Japanese Vegetable Curry',
                category: 'mains',
                price: 125,
                options: [
                    { name: 'spiciness', values: ['mild', 'spicy', 'crying spicy'] }
                ],
                description: 'Potatoes, carrots, and eggplants in a tomato-based curry sauce'
            },
            {
                id: 1,
                name: 'Chicken Adobo',
                category: 'mains',
                price: 125,
                options: [],
                description: 'Chicken adobo with soft-boiled eggs'
            },
            {
                id: 2,
                name: 'Spring Rolls',
                category: 'mains',
                price: 100,
                options: [
                    { name: 'filling', values: ['tofu', 'smoked chicken'] }
                ],
                description: 'Cucumber, carrots, peanuts, cilantro, and tofu or smoked chicken filling wrapped in rice paper. Comes with peanut sauce'
            },
            {
                id: 3,
                name: 'Sweet Potato Cake',
                category: 'baked',
                price: 45,
                options: [],
                description: 'Baked sweet potato custard in a potato skin'
            },
            {
                id: 4,
                name: 'Hokkaido Rolls',
                category: 'baked',
                price: 45,
                options: [],
                description: 'Your white dinner roll but better'
            },
            {
                id: 5,
                name: 'Tangzhong Cinnamon Rolls',
                category: 'baked',
                price: 55,
                options: [],
                description: 'Giant swirled cinnamon rolls with frosting'
            },
            {
                id: 6,
                name: 'Pizza Rolls',
                category: 'baked',
                price: 55,
                options: [],
                description: 'Tomato, basil, cheese, and more cheese'
            },
            {
                id: 7,
                name: 'Fresh Pasta',
                category: 'takeHomes',
                price: 50,
                options: [],
                description: 'One serving is enough for one person. Swirl in boiling water for 3 minutes, then finish cooking in the sauce for 3 more minutes'
            },
            {
                id: 8,
                name: 'Tomato Sauce',
                category: 'takeHomes',
                price: 50,
                options: [],
                description: 'Sauce for your pasta'
            },
            {
                id: 9,
                name: 'Kimchi',
                category: 'banChan',
                price: 100,
                options: [
                    { name: 'spiciness', values: ['spicy', 'super spicy'] }
                ],
                description: 'Cabbage and other greens. Good for 4'
            },
            {
                id: 10,
                name: 'Braised Potato',
                category: 'banChan',
                price: 100,
                options: [],
                description: 'Baby potatoes in soy sauce and ssalyeot and roasted sesame seeds'
            },
            {
                id: 11,
                name: 'Japchae',
                category: 'banChan',
                price: 100,
                options: [],
                description: 'Carrots, cabbage, mung bean sprouts, and sesame seeds'
            },
            {
                id: 12,
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
                        <button type="button"
                            class="menu-item-add"
                            @click="$emit('add-item', item.id)"
                        >+</button>
                        <div class="menu-item-details">
                            <span><b>{{ item.name }}</b> {{ item.price }}</span>
                            <span><i>{{ item.description }}</i></span>
                        </div>
                    </div>
                </div>
            `
        }
    );

    Vue.component('order-list',
        {
            props: ['orders'],
            data: function() {
                orderOptions = {};
                for (order in this.orders)
                    for (option in order.options) {
                        orderOptions[option.name] = null;
                    }
                return {
                    quantity: 1,
                    orderOptions: orderOptions,
                }
            },
            methods: {
                decrementQty: function() {
                    quantity--;
                },
                incrementQty: function() {
                    quantity++;
                },
                chooseOrderOption: function(optionName, event) {
                    options.optionName = event.target.value;
                }
            },
            template: `
                <div class="order-list">
                    <div class="order-item"
                        v-for="order in orders"
                    >
                        <div class="order-item-header">
                            <span><b>{{ order.name }}</b></span>
                            <span>
                                <span>Qty: </span>
                                <button type="button"
                                    v-show="quantity > 1"
                                    @click="decrementQty"
                                >-</button>
                                <span>{{ quantity }}</span>
                                <button type="button"
                                    @click="incrementQty"
                                >+</button>
                                <button type="button"
                                    @click="$emit('remove-item', order.id)"
                                >Remove</button>
                            </span>
                        </div>
                        <div class="order-item-options"
                            v-for="option in order.options"
                        >
                            <span>{{ option.name }}: </span>
                            <label
                                v-for="optionValue in option.values"
                            >
                                <input type="radio"
                                    :name="option.name"
                                    :value="optionValue"
                                    @change="chooseOrderOption(option.name, $event)"/>
                                {{ optionValue }}
                            </label>
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
            orders: [items[0]],
        },
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
        },
        methods: {
            addOrderItem: function(id) {
                if (this.orders.filter(item => item.id === id).length === 0) {
                    this.orders.push(items[id]);
                } else {
                    alert('That item already exists in your cart.');
                }
            },
            removeOrderItem: function(id) {
                this.orders.splice(this.orders.indexOf(items[id]), 1);
            },
            submit: function() {
                for (order in this.orders) {
                    for (option in order.options) {
                        if (option.value === null) {
                            alert('Please select your options');
                        }
                    }
                }
                console.log('success! your orders are: ' + JSON.stringify(orders));
            },
            debug: function() {
                console.log(JSON.stringify(this.items));
            }
        },
        computed: {},
        components: {},
        template: `
            <div>
                <div v-for="category in categories">
                    <menu-category
                        v-bind:category="category | convertCamelCase"
                        v-bind:items="items | categorize(category)"
                        v-on:add-item="addOrderItem"
                    ></menu-category>
                </div>
                <hr v-show="orders.length > 0">
                <order-list
                    v-bind:orders="orders"
                    v-on:remove-item="removeOrderItem"
                ></order-list>
                <button @click="submit">hello!</button>
            </div>
        `
    });

}