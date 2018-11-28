<template>
    <div class="order-list">
        <div class="order-item"
            :key="item.id"
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
                :key="index"
                v-for="(option, index) in item.availableOptions"
            >
                <div class="option-name">
                    {{ option.name | capitalize }}: 
                    <label
                        :key="index"
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
