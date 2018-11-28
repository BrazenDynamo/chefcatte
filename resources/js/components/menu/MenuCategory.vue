<template>
    <div class="menu-category">
        <h1>{{ category | convertCamelCase }}</h1>
        <div class="menu-items"
            :key="item.id"
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
</template>

<script>
    export default {
        props: ['category', 'items'],
        filters: {
            convertCamelCase: function (string) {
                return string
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function (str) { return str.toUpperCase(); });
            },
        },
    }
</script>
