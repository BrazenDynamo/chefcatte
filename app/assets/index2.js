window.onload = function() {

    var app = new Vue({
        el: '#chefcatte',
        data: {
            items: items,
            categories: categories,
            orders: [],
        },
        computed: {
            categorizedItems() {
                var menu = {};
                for (category in this.categories) {
                    menu[category] = this.items.filter(
                        item => item.category === category
                    );
                }
                return menu;
            },
        },
        methods: {
            addOrder(order) {
                if (this.orders.findIndex(o => o.id === order.id) === -1) {
                    this.orders.push(order);
                } else {
                    alert('That item is already in your cart.');
                }
            },
            removeOrder(order) {
                var i = this.orders.findIndex(o => o.id === order.id);
                if (i !== -1) {
                    this.orders.splice(i, 1);
                }
            },
        },
        template: `
            <div class="order-form">
                <menu-list 
                    :foodList="categorizedItems"
                    @add-order="addOrder"
                    @remove-order="removeOrder"
                ></menu-list>
                <order-list
                ></order-list>
            </div>
        `,
    });

}