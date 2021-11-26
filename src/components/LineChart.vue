<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins

export default {
  name: 'LineChart',
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  data() {
    return {
    }
  },
  mounted () {
    console.log('---this.chartData', this.chartData);
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>

</style>