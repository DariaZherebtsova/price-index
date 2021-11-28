<template>
  <div class="price-indexes">
    <v-card flat tile class="price-indexes__card">
      <v-card-title class="price-indexes__header">
        Индексы потребительских цен на товары и услуги
      </v-card-title>  
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="price-indexes_first-col" cols="12" sm="4" md="4">
              <span class="text-h6">Данные по годам</span>
              <v-radio-group
                v-model="selectedYear"
                column
              >
                <v-radio
                  label="2020"
                  value="2020"
                  color="indigo"
                ></v-radio>
                <v-radio
                  label="2021"
                  value="2021"
                  color="indigo"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <span class="text-h6">Отображение значений</span>
              <v-radio-group
                v-model="selectedValueType"
                column
              >
                <v-radio
                  label="к декабрю предыдущего года"
                  value="byDecember"
                  color="indigo"
                ></v-radio>
                <v-radio
                  label="к предыдущему месяцу"
                  value="toPreviousMonth"
                  color="indigo"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="price-indexes_first-col" cols="12" sm="12" md="4">
              <span class="text-h6">Группы товаров</span>
              <v-checkbox v-for="(item, index) in categories" :key="item"
                v-model="selectedCategories"
                :label="item"
                :color="colors[index]"
                :value="item"
                hide-details
              ></v-checkbox> 
            </v-col>
            <v-col cols="12" sm="12" md="8">
              <v-card width="800" class="pa-2 mt-3">
                <div class="price-indexes__chart__loupe-btn-wrapper">
                  <v-btn
                    color="grey"
                    icon
                    @click.stop="isOpenChartDialog = true"
                  >
                    <v-icon>mdi-magnify-plus</v-icon>
                  </v-btn>
                </div>
                <PriceIndexesChart
                  v-if="dataAll"
                  :chart-data="chartData"
                  :options="chartOptions"
                  :isEnlarged="isOpenChartDialog"
                >
                  <canvas id="price-indexes-chart"></canvas>
                </PriceIndexesChart>
                <div v-else class="price-indexes__spinner">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    :size="70"
                    :width="7"
                  ></v-progress-circular>
                </div>
              </v-card>  
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="isOpenChartDialog"
    >
      <v-card class="price-indexes__chart pa-2">
        <div class="price-indexes__chart__loupe-btn-wrapper">
          <v-btn
            color="grey"
            icon
            @click.stop="isOpenChartDialog = false"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </div>
        <PriceIndexesChart
          v-if="isOpenChartDialog"
          :chart-data="chartData"
          :options="largeChartOptions"
          :isEnlarged="isOpenChartDialog"
        >
          <canvas id="price-indexes-chart-large"></canvas>
        </PriceIndexesChart>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PriceIndexesChart from '@/components/PriceIndexesChart.vue';
import jsonData from '@/assets/data/datasetAll.json';

export default {
  name: 'PriceIndexes',
  components: {
    PriceIndexesChart,
  },
  async created() {
    await this.getData();
  },
  data: () => ({
    selectedCategories: [],
    isOpenChartDialog: false,
    height: 680,
    dataAll: null,
    categories: [],
    colors: [],
    selectedYear: '2020',
    selectedValueType: 'byDecember',
    chartData: {
      labels: [],
      datasets: []
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      elements: {
        point:{
          radius: 0
        }
      }
    },
  }),
  watch: {
    selectedCategories(val) {
      this.drawChart(this.selectedYear, this.selectedValueType, val);
    },
    selectedYear(val) {
      this.drawChart(val, this.selectedValueType, this.selectedCategories);
    },
    selectedValueType(val) {
      this.drawChart(this.selectedYear, val, this.selectedCategories);
    },
  },
  computed: {
    largeChartOptions() {
      return {
        ...this.chartOptions,
        legend: {
          display: true,
          position: 'bottom',
        }
      };
    }
  },
  methods: {
    async getData() {
      let data = [];
      // try {
      //   let url = 'http://localhost:3000/';
      //   let response = await fetch(url);
      //   data = await response.json();
      // }
      // catch(err) {
      //   console.error('Get data from server failed', err);
      // }

      // запасной вариант)
      data = jsonData;
      
      this.dataAll = data;
      this.colors = data.colors;
      this.categories = data.categories;
      this.selectedCategories = data.categories; //  вызывает drawChart
    },
    drawChart(year, type, categories) {
      if (categories.length === this.categories.length) {
        this.chartData = {datasets: this.dataAll.data[year][type], labels: this.dataAll.data[year].labels};
      } else {
        let dataset = this.dataAll.data[year][type];
        let filteredData = dataset.filter((item => categories.includes(item.label)));
        this.chartData = {datasets: filteredData, labels: this.dataAll.data[year].labels};
      }
    },
  },
}
</script>

<style scoped>
.price-indexes {
  max-width: 1000px;
  min-width: 600px;
  height: 100vh;
}

.price-indexes__header {
  color: white;
  background-color: rgb(53 91 190);
  padding-left: 30px;
}

.price-indexes__card {
  height: 100vh;
}

.price-indexes_first-col {
  max-width: 280px;
}

.price-indexes__spinner {
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.price-indexes__chart {
  width: 90vw;
  height: 90vh;
}

.price-indexes__chart__loupe-btn-wrapper {
  text-align: end;
}
</style>