window.onload = function() {

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
            props: ['items'],
            data: function() {
                orderOptions = {};
                for (var order in this.orders) {
                    for (var option in order.options) {
                        orderOptions[option.name] = null;
                    }
                }
                var orderItems = [];
                for (var item in this.items) {
                    var orderItem = {
                        id: item.id,
                        quantity: 1,
                        options: item.options,
                    };

                    console.log(orderItem);
                    console.log(item.options);
                    orderItems.push({id: item.id, quantity: 1, options: item.options});
                }
                return {
                    orderList: this.items,
                    orderOptions: orderOptions,
                };
            },
            methods: {
                getOrderById: function(id) {
                    return this.orderList[this.orderList.map(order => order.id).indexOf(id)];
                },
                increment: function(item) {
                    item.quantity++;
                    console.log(item.quantity);
                },
                updateOptions: function(update) {
                    this.getOrderById(update.id).orderOptions = update.options;
                    alert(JSON.stringify(update.options));
                },
                removeItem: function(id) {
                    this.orderList.splice(
                        this.orderList.indexOf(this.getOrderById(id)),
                        1
                    );
                },
                submitOrder: function() {
                    console.log(JSON.stringify(this.orderList));
                    return;
                },
            },
            template: `
            <div>
                <div class="order-list">
                    <order-item
                        v-for="item in items"
                        :order="item"
                        :key="item.id"
                        @increment="increment"
                        @update-options="updateOptions"
                        @remove-item="removeItem"></order-item>
                </div>
                <button @click="submitOrder">Submit</button>
            </div>
            `
        }
    );

    Vue.component('order-item', {
        props: ['order'],
        data: function() {
            orderOptions = {};
            for (var i = 0; i < this.order.options.length; i++) {
                orderOptions[this.order.options[i].name] = null;
            }
            return {
                quantity: 1,
                orderOptions: orderOptions,
            };
        },
        methods: {
            decrementQty: function () {
                this.quantity--;
            },
            incrementQty: function () {
                this.quantity++;
            },
            // chooseOrderOption: function (optionName, event) {
            //     options.optionName = event.target.value;
            // }
            debug: function() {
                alert(JSON.stringify(this.orderOptions));
            }
        },
        template: `
            <div class="order-item">
                <div class="order-item-header">
                    <span><b>{{ order.name }}</b></span>
                    <span>
                        <span>Qty: </span>
                        <button type="button"
                            :disabled="quantity <= 1"
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
                    v-for="(option) in order.options"
                >
                    <span>{{ option.name }}: </span>
                    <label
                        v-for="(optionValue, index) in option.values"
                    >
                        <input type="radio"
                            :name="option.name"
                            :value="index"
                            v-model="orderOptions[option.name]"
                            @change="$emit('update-options', {id: order.id, options: orderOptions})"/>
                        {{ optionValue }}
                    </label>
                </div>
                <button @click="debug">debug</button>
            </div>
        `,
    }); 
    
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
                    .replace(/^./, function(str) {return str.toUpperCase();});
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
                for (var order in this.orders) {
                    for (var option in order.options) {
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
                    v-bind:items="orders"
                    v-on:remove-item="removeOrderItem"
                ></order-list>
                <button @click="submit">hello!</button>
            </div>
        `
    });

};
