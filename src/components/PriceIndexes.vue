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
              class="price-indexes__product-groups"
              cols="12"
              sm="4"
              md="4"
            >
              <span class="text-h6">Группы товаров</span>
              <v-checkbox v-for="item in jsonData" :key="item.label"
                v-model="selectedProductGroups"
                :label="item.label"
                :color="item.borderColor"
                :value="item.label"
                hide-details
              ></v-checkbox> 
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="8"
            >
              <v-card width="800" class="pa-2">
                <div class="price-indexes__chart__loupe-btn-wrapper">
                  <v-btn
                    color="grey"
                    icon
                    @click.stop="chartDialog = true"
                  >
                    <v-icon>mdi-magnify-plus</v-icon>
                  </v-btn>
                </div>
                <LineChart :chart-data="chartData" :options="options" />
              </v-card>  
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="chartDialog"
    >
      <v-card width="90vw" height="90vh" class="pa-2">
        <div class="price-indexes__chart__loupe-btn-wrapper">
          <v-btn
            color="grey"
            icon
            @click.stop="chartDialog = false"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </div>
        <LineChart :chart-data="chartData" :options="options" :styles="chartStyles" />
      </v-card>
    </v-dialog>
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
  async created() {
    await this.getData();
    this.readCSV();
  },
  data: () => ({
    selectedProductGroups: [],
    chartDialog: false,
    height: 780,
    jsonData: [],
    labels: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
    chartData: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  }),
  watch: {
    selectedProductGroups(val) {
      console.log('watch selectedProductGroups', val);
      let filter = this.jsonData.filter((item => val.includes(item.label)));
      console.log('filter', filter);
      this.chartData = {datasets: filter, labels: this.labels};
    }
  },
  computed: {
    chartStyles () {
      return {
        height: `${this.height}px`,
      }
    }
  },
  methods: {
    async getData() {
      let url = 'http://localhost:3000/';
      let response = await fetch(url);

      let data = await response.json(); // читаем ответ в формате JSON
      console.log('----uhu----');
      this.jsonData = data;
    },
    readCSV() {
      console.log('jsonData', jsonData);
      this.chartData = {datasets: jsonData, labels: this.labels};
      this.selectedProductGroups = jsonData.map(item => item.label)
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

.price-indexes__chart__loupe-btn-wrapper {
  text-align: end;
}

.chart-wrapper {
  width: 800px;
  height: 500px;
}
</style>