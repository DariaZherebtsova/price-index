<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      Индексы потребительских цен на товары и услуги
    </v-app-bar>

    <v-main class="chart-wrapper">
      <LineChart :chartdata="chartdata" :options="options" />
    </v-main>
  </v-app>
</template>

<script>
import LineChart from './components/LineChart';

export default {
  name: 'App',

  components: {
    LineChart,
  },

  data: () => ({
    chartdata: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data 1",
            data: [2, 10, 5, 9, 0, 6, 15],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      },
  }),
};
</script>

<style scoped>
.chart-wrapper {
  width: 800px;
  height: 500px;
}
</style>
