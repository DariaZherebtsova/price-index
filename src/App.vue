<template>
  <v-app>
    <div class="app__wrap">
      <PriceIndexes />
    </div>
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
.app__wrap {
  min-width: 580px;
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
}
</style>
