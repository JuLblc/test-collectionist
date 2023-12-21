<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
    default: "text-white",
  },
  textHoverColor: {
    type: String,
    required: false,
    default: "hover:text-gray-300",
  },
});

const { link, label, textColor, textHoverColor } = props;
</script>

<template>
  <router-link :to="`${link}`" :class="`${textColor} ${textHoverColor}`">
    {{ label }}
  </router-link>
</template>
