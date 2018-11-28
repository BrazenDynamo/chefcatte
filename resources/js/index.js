window.onload = function() {

    Vue.component('menu-category',
        {
            props: ['category', 'items'],
            filters: {
                convertCamelCase: function (string) {
                    return string
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function (str) { return str.toUpperCase(); });
                },
            },
            template: `
                <div class="menu-category">
                    <h1>{{ category | convertCamelCase }}</h1>
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
    
    Vue.component('order-list', {
        props: ['items'],
        filters: {
            capitalize: function(string) {
                return string
                    .replace(/^./, function(str) { return str.toUpperCase(); });
            }
        },
        template: `
            <div class="order-list">
                <div class="order-item"
                    v-for="item in items"
                >
                    <div class="order-quantity">
                        <span>
                            <b>{{ item.name }}</b> ({{ item.price }})
                            <button
                                :disabled="item.quantity <= 1"
                                @click="$emit('decrement-qty', item.id)"
                            >-</button>
                            {{ item.quantity }}
                            <button
                                @click="$emit('increment-qty', item.id)"
                            >+</button>
                            <button
                                @click="$emit('remove-item', item.id)"
                            >Remove</button>
                        </span>
                    </div>
                    <div class="order-options"
                        v-for="option in item.availableOptions"
                    >
                        <div class="option-name">
                            {{ option.name | capitalize }}: 
                            <label
                                v-for="(choice, index) in option.values"   
                            >
                                <input class="option"
                                    type="radio"
                                    :name="option.name"
                                    :value="index"
                                    @change="$emit('choose-option', {
                                        id: item.id,
                                        option: option.name,
                                        value: index
                                    })"
                                >
                                    {{ choice | capitalize }}
                                </input>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `,
    });

    var app = new Vue({
        el: '#chefcatte',
        data: {
            items: items,
            categories: categories,
            orders: [],
        },
        computed: {
            totalPrice: function() {
                return this.orders.reduce((subtotal, order) => {
                    return subtotal + (order.price * order.quantity);
                }, 0);
            },
        },
        filters: {
            categorize: function (items, category) {
                return items.filter(
                    item => item.category === category
                );
            },
        },
        methods: {
            addOrder(itemId) {
                if (this.orders.findIndex(o => o.id === items[itemId].id) === -1) {
                    var item = items[itemId];
                    var order = {
                        id: item.id,
                        name: item.name,
                        quantity: 1,
                        price: item.price,
                        availableOptions: item.options,
                        chosenOptions: {},
                    };
                    this.orders.push(order);
                } else {
                    alert('That item is already in your cart.');
                }
            },
            decrementOrder(itemId) {
                var i = this.orders.findIndex(o => o.id === itemId);
                this.orders[i].quantity--;
            },
            incrementOrder(itemId) {
                var i = this.orders.findIndex(o => o.id === itemId);
                this.orders[i].quantity++;
            },
            removeOrder(itemId) {
                var i = this.orders.findIndex(o => o.id === itemId);
                if (i !== -1) {
                    this.orders.splice(i, 1);
                }
            },
            chooseOption(choice) {
                var i = this.orders.findIndex(o => o.id === choice.id);
                this.orders[i].chosenOptions[choice.option] = choice.value;
            },
            submitOrder() {
                var valid = true;
                this.orders.forEach(order => {
                    order.availableOptions.forEach(option => {
                        if (!order.chosenOptions[option.name]) {
                            alert('Please choose an option for your ' + order.name + '\'s ' + option.name + '.');
                            valid = false;
                        }
                    });
                });
                if (!valid) {
                    return;
                }
                var submission = this.orders.map(
                    order => {
                        return {
                            id: order.id,
                            name: order.name,
                            quantity: order.quantity,
                            chosenOptions: order.chosenOptions,
                        };
                    }
                );
                alert('Success! Order is: ' + JSON.stringify(submission));
            }
        },
        template: `
            <div class="order-form">
                <menu-category
                    v-for="category in categories"
                    :category="category"
                    :items="items | categorize(category)"
                    @add-item="addOrder"
                ></menu-category>
                <order-list
                    :items="orders"
                    @decrement-qty="decrementOrder"
                    @increment-qty="incrementOrder"
                    @remove-item="removeOrder"
                    @choose-option="chooseOption"
                ></order-list>
                <div class="checkout"
                    v-show="orders.length >= 1"
                >
                    <span class="total-price">Total: {{ totalPrice }}</span>
                    <button class="submit-order-btn"
                        @click="submitOrder"
                    >Submit</button>
                </div>
            </div>
        `,
    });

}