
<template>
  <div>
    <canvas id="price-indexes-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import chartData2 from '@/assets/data/chartData.js';

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
      chartData2: chartData2,
      chart: null,
    }
  },
  watch: {
    needUpdate(val) {
      if (val) {
        this.update();
      }
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