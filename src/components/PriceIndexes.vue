<template>
  <div>
    <header class="price-indexes__header">
      <span class="text-h6">Индексы потребительских цен на товары и услуги</span>
    </header>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <div class="price-indexes__product-groups">
               <v-checkbox v-for="item in jsonData" :key="item.label"
                  v-model="cbData"
                  :label="item.label"
                  :color="item.borderColor"
                  value="red"
                  hide-details
                ></v-checkbox> 
              </div>
              
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="8"
            >
              <div class="chart-wrapper">
                <LineChart :chartdata="chartdata" :options="options" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
// import * as d3 from 'd3-fetch';
// import ChartDataSource from 'chartjs-plugin-datasource';
// import csvFile from '@/assets/data/3.csv';
import jsonData from '@/assets/data/data2020.json';

export default {
  name: 'PriceIndexes',
  components: {
    LineChart,
  },
  created() {
    this.readCSV();
  },
  data: () => ({
    cbData: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
    jsonData: jsonData,
    chartdata: {
      labels: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "rgba(171, 71, 188, 1)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  }),
  methods: {
    readCSV() {

      console.log('jdonData', jsonData);

      this.chartdata.datasets = jsonData;
    },
  },
}
</script>

<style scoped>
.price-indexes__header {
  height: 50px;
  color: white;
  background-color: rgb(53 91 190);
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.price-indexes__product-groups {
  max-width: 280px;
}

.chart-wrapper {
  width: 800px;
  height: 500px;
}
</style>