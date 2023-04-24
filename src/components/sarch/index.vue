<template>
  <div class="search-wrap">
    <div class="input-wrap">
      <input type="text" v-model="searchText" />
      <div class="cancel" v-show="searchText !== ''" @click="searchText = ''"></div>
    </div>
    <div class="content">
      <div v-if="findResult.length > 0">
        <div v-for="item in findResult" class="item" @click="goProduct(item)">{{ item.name }}</div>
      </div>
      <div class="no-data" v-else>No Data</div>
    </div>
  </div>
  <div class="mask" @click="emit('close')"></div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { goodsStore } from '@/store/goods'
import { useRouter } from "vue-router";
import { Goods } from '@/store/types';
const emit = defineEmits(['close'])
const searchText = ref('')
const router = useRouter();
const getGoodsStore = goodsStore()
const findResult: any = computed(() => {
  if (searchText.value === '') return []
  return getGoodsStore.goods.filter(item => item.categroy.toLowerCase().startsWith(searchText.value) || item.name.toLowerCase().startsWith(searchText.value));
})
const goProduct = (item:Goods) => {
  emit('close')
  router.push({
    path: '/product',
    query: {...item}
  })
}


</script>
<style lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
}

.search-wrap {
  position: fixed;
  width: 400px;
  height: 400px;
  background: #f2ecec;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  .input-wrap {
    margin: 10px 0;
    width: 350px;
    height: 50px;
    background: url("/src/assets/search/search.png") 2% 50% no-repeat;
    background-size: 25px 25px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 5px;

    input {
      height: 44px;
      width: 280px;
      outline: none;
      margin-left: 40px;
      border: none;
    }

    input:focus {
      outline: none;
    }

    .cancel {
      width: 20px;
      height: 20px;
      background: url("/src/assets/search/cancel.png") 0 0 no-repeat;
      background-size: contain;
    }
  }

  .content {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    overflow-y: auto;

    .item {
      font-size: 16px;
      padding: 5px 0;
      width: 300px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .no-data {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }
  }

}
</style>
