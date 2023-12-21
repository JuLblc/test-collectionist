<script setup lang="ts">
import { useRoute } from "vue-router";
import { getRouteId } from "../../helpers";
import router from "../../router";
import { onMounted, ref, watch } from "vue";

type Item = {
  id: number;
  label: string;
};
const props = defineProps({
  items: {
    type: Array as () => Item[],
    required: true,
  },
});

const route = useRoute();
const categoryId = ref<number | null>(null);

const selectItem = (id: number) => {
  router.push({
    params: {
      id,
    },
  });
};

onMounted(() => {
  categoryId.value = Number(getRouteId(route));
});

watch(route, () => {
  categoryId.value = Number(getRouteId(route));
});
</script>

<template>
  <div class="p-4">
    <div class="flex space-x-24">
      <div
        :key="item.id"
        v-for="item in props.items"
        @click="selectItem(item.id)"
        class="cursor-pointer text-2xl"
        :class="{ 'font-bold': categoryId === item.id }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
