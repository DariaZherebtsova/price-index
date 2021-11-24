<template>
  <v-app>
    <v-main>
      <PriceIndexes />
    </v-main>
  </v-app>
</template>

<script>
import PriceIndexes from './components/PriceIndexes';

export default {
  name: 'App',

  components: {
    PriceIndexes,
  },

  data: () => ({}),
};
</script>

<style>

</style>
