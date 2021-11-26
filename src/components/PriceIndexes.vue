<template>
  <div class="price-indexes">
    <header class="price-indexes__header">
      <span class="text-h6">Индексы потребительских цен на товары и услуги</span>
    </header>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              class="price-indexes_first-col"
              cols="12"
              sm="4"
              md="4"
            >
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
            <v-col
              cols="12"
              sm="8"
              md="8"
            >
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
              class="price-indexes_first-col"
              cols="12"
              sm="4"
              md="4"
            >
              <span class="text-h6">Группы товаров</span>
              <v-checkbox v-for="(item, index) in categories" :key="item"
                v-model="selectedCategories"
                :label="item"
                :color="colors[index]"
                :value="item"
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
        <LineChart v-if="dataAll" :chart-data="chartData" :options="options" :styles="chartStyles" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import jsonData from '@/assets/data/datasetAll.json';

export default {
  name: 'PriceIndexes',
  components: {
    LineChart,
  },
  async created() {
    await this.getData();
    // this.drawChart(this.selectedYear, this.selectedValueType, this.selectedCategories);
  },
  data: () => ({
    selectedCategories: [],
    chartDialog: false,
    height: 680,
    dataAll: [],
    categories: [],
    colors: [],
    selectedYear: '2021',
    selectedValueType: 'byDecember',
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
    selectedCategories(val) {
      console.log('---selectedCategories', val);
      this.drawChart(this.selectedYear, this.selectedValueType, val);
    },
    selectedYear(val) {
      this.drawChart(val, this.selectedValueType, this.selectedCategories);
    },
    selectedValueType(val) {
      console.log('---selectedValueType', val);
      this.drawChart(this.selectedYear, val, this.selectedCategories);
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
      let data = [];
      try {
        let url = 'http://localhost:3000/';
        let response = await fetch(url);
        data = await response.json();
      }
      catch(err) {
        // console.error('Get data from server failed', err);
        // запасной вариант)
        data = jsonData;
      }
      
      this.dataAll = data;
      this.colors = data.colors;
      this.categories = data.categories;
      this.selectedCategories = data.categories;
    },
    drawChart(year, type, categories) {
      if (categories.length === this.categories.length) {
        console.log('--dataset all', this.dataAll.data[year][type]);
        this.chartData = {datasets: this.dataAll.data[year][type], labels: this.dataAll.data['2020'].labels};
      } else {
        let dataset = this.dataAll.data[year][type];
        console.log('--dataset', dataset);
        let filteredData = dataset.filter((item => categories.includes(item.label)));
        this.chartData = {datasets: filteredData, labels: this.dataAll.data['2020'].labels};
      }
    },
  },
}
</script>

<style scoped>
.price-indexes {
  min-width: 800px;
}
.price-indexes__header {
  height: 50px;
  color: white;
  background-color: rgb(53 91 190);
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.price-indexes_first-col {
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