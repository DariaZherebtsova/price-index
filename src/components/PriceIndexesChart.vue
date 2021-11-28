
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PriceIndexesChart',
  props: ['chartData', 'options', 'isEnlarged'],
  mounted() {
    const ctx = document.getElementById(this.canvasId);    
    this.chart = new Chart(ctx, {
      type: "line",
      data: this.chartData,
      options: this.options,
    });
    if (this.isEnlarged) {
      ctx.style.height = `${Math.floor(document.documentElement.clientHeight * 0.8)}px`;
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  computed: {
    canvasId() {
      return this.isEnlarged ? 'price-indexes-chart-large' : 'price-indexes-chart'
    }
  },
  watch: {
    chartData(val) {
      this.chart.data = val;
      this.update();
    },
  },
  methods: {
    update() {
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

#price-indexes-chart-large {
  width: 800px;
}
</style>