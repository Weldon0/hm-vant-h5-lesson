<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    count() {
      console.log("2332");
    },
  },
  methods: {
    changeCOunt() {
      this.count++;
      this.count++;
      this.count++;
      this.count++;
      this.count++;
      this.count++;
      this.count++;
    },
  },
};
</script>

<style scoped></style>
