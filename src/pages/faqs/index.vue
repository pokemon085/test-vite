<template>
    <div class="faqs-wrap">
        <div class="title-name">FAQS</div>
        <div class="item" v-for="i in faqs" :key="i.id">
            <dropdown :item="i" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import dropdown from './dropdown.vue'
const faqs = [{ id: 1, title: 'When can I order? ', content: 'Our menu is open for orders from 8am Wednesday to 11pm Friday each week. Closing our menu each week gives us time to source the highest-quality ingredients for your meals, then prepare and cook each item from scratch. ' },
{ id: 2, title: 'When will I receive my order? ', content: 'Mondays. Pick up is between 4-6pm and delivery is from 4-7pm. ' },
{ id: 3, title: 'Do you have a minimum order value? ', content: 'You can order as much or as little as you like. However if you wish to receive your order via delivery, then a minimum order value of $60 applies. ' },
{ id: 4, title: 'Is there a fee for delivery? ', content: 'Delivery is free for orders over $150. If your order is under $150, we charge a small $10 delivery fee.' }
]
</script>
<style lang="scss" scoped>
.faqs-wrap{
    width: 80%;
    padding: 20px;
    margin: auto;

    .title-name{
        text-align: center;
        font-size: 30px;
        margin-bottom: 20px;
    }

    .item{
        margin-bottom: 5px;
    }
}
</style>
