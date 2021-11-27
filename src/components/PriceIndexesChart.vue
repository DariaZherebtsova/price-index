
<template>
  <div>
    <canvas id="price-indexes-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PriceIndexesChart',
  props: ['chartData', 'options', 'needUpdate'],
  mounted() {
    console.log('---mounted', this.chartData);
    const ctx = document.getElementById('price-indexes-chart');
    this.chart = new Chart(ctx, {
      type: "line",
      data: this.chartData,
      options: this.options,
    });
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData(val) {
      console.log('--------watch-----');
      this.chart.data = val;
      this.update();
    }
  },
  methods: {
    update() {
      console.log("---update---");
      // myLineChart.data.datasets[0].data[2] = 50;
      this.chart.update();
    }
  }

}
</script>

<style>
#price-indexes-chart{
  width: 800px;
  height: 350px;
}

</style>