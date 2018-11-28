<template>
<div class="menu-order">
    <menu-category
        v-for="category in categories"
        :category="category"
        :items="items | categorize(category)"
        :key="category.id"
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
</template>

<script>
import MenuCategory from './menu/MenuCategory.vue';
import OrderList from './order/OrderList.vue';
export default {
    data: {
        items: items,
        categories: categories,
        orders: [],
    },
    // data: () => {
    //     return { 
    //         items: items,
    //         categories: categories,
    //         orders: [],
    //     }
    // },
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
    components: {
        MenuCategory,
        OrderList,
    },
}
</script>
