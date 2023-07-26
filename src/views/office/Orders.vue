<template>
  <div>
    <h1>User orders</h1>
  </div>
</template>

<script>
import * as ordersApi from "@/api/orders";

export default {
  async created() {
    await ordersApi.list().then(console.log).catch(console.warn);
  },
};
</script>
