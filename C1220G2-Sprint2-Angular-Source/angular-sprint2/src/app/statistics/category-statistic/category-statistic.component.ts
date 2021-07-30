import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { CategoryStatistic } from 'src/app/models/category-statistic.model';
import { StatisticsService } from '../services/statistics.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  position: string;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-category-statistic',
  templateUrl: './category-statistic.component.html',
  styleUrls: ['./category-statistic.component.css']
})
export class CategoryStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // public chartOptions: Partial<ChartOptions>;
  categoryStatistics: CategoryStatistic[]
  categoryNames: string[] = [];
  numberOfRegisters: number[] = [];
  numberOfRegisteredCategories: number;
  duplicatedCategories: number = 0;

  constructor( private statisticsService: StatisticsService ) {
    this.statisticsService.getCategoryStatistic().subscribe(categoryStatistics => {
      this.categoryStatistics = categoryStatistics;
      this.numberOfRegisteredCategories = this.categoryStatistics.length;
      this.categoryStatistics.forEach(e => {
        // console.log("Category name: " + e.category_name);
        this.categoryNames.push(e.category_name);
        this.numberOfRegisters.push(e.number_of_registers);
        if (e.number_of_registers > 1) {
          this.duplicatedCategories += e.number_of_registers;
        }
      });

      // console.log("number of duplicated categories: " + this.duplicatedCategories);
      // console.log("Number of register: " + this.numberOfRegisters);
      const randomColors = this.getColors();
      this.chartOptions = {
          series: [
            {
              name: "Số lần đăng ký",
              data: this.numberOfRegisters
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: randomColors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            show: true
          },
          xaxis: {
            categories: this.categoryNames,
            position: "top",
            labels: {
              style: {
                colors: randomColors,
                fontSize: "12px"
              }
            }     
          },
          title: {
            text: "Thống kê danh mục đề tài sinh viên đăng ký",
            floating: false,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444"
            }
          }
      };
    });
  }

  ngOnInit(): void {
  }

  getColors(): string[] {
    let randomColors: string[] = [];
    for (let i = 1; i <= this.numberOfRegisteredCategories; i++) {
      let color = Math.floor(Math.random()*16777215).toString(16);
      randomColors.push('#' + color);
    }
    return randomColors;
  }

}
