<template>
  <div class="search-wrap">
    <div class="input-wrap">
      <input type="text" v-model="searchText" />
      <div class="cancel" v-show="searchText !== ''" @click="searchText = ''"></div>
    </div>
    <div class="content">
      <div v-if="findResult.length > 0">
        <div v-for="item in findResult" class="item" @click="goProduct(item)">
          {{ item.name }}
        </div>
      </div>
      <div class="no-data" v-else>No Data</div>
    </div>
    <loading v-show="showLoading" />
  </div>
  <div class="mask" @click="emit('close')"></div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { goodsStore } from "@/store/goods";
import { useRouter } from "vue-router";
import { Goods } from "@/store/types";
import loading from "@/components/loading/index.vue";

const emit = defineEmits(["close"]);
const router = useRouter();
const getGoodsStore = goodsStore();
const searchText = ref("");
const showLoading = ref(false);

const findResult: any = computed(() => {
  const textToLower = searchText.value.toLowerCase();
  if (searchText.value === "") return [];
  return getGoodsStore.goods.filter(
    (item: { category: string; name: string }) =>
      item.category.toLowerCase().startsWith(textToLower) ||
      item.name.toLowerCase().startsWith(textToLower)
  );
});

const goProduct = (item: Goods):void => {
  showLoading.value = true;

  setTimeout(() => {
    showLoading.value = false;
    emit("close");
    router.replace({
      path: "/product",
      query: { id: item.id }
    });
  }, 300);
};

onMounted(() => {
  if (getGoodsStore.goods.length === 0) {
    getGoodsStore.getAllGoods()
  }
})
</script>
<style lang="scss" scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
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
  z-index: 201;
  border-radius: 8px;

  .input-wrap {
    margin: 10px 0;
    width: 350px;
    height: 50px;
    background: url("@/assets/search/search.png") 2% 50% no-repeat;
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
      padding: 10px 0;
      width: 300px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        background: var(--text-background-color);
        cursor: pointer;
      }
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
