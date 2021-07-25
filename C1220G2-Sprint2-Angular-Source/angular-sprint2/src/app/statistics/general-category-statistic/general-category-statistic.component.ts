import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";
import { StatisticsService } from '../services/statistics.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-general-category-statistic',
  templateUrl: './general-category-statistic.component.html',
  styleUrls: ['./general-category-statistic.component.css']
})
export class GeneralCategoryStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() duplicatedCategories: number;
  numberOfPassedCategories: number;
  numberOfPendingCategories: number;

  constructor(private statisticService: StatisticsService) {
    // console.log("Number of duplicated categories: " + this.duplicatedCategories);
    this.chartOptions = {
      series: [5, 4],
      labels: ["Giáo viên còn trống", "Giáo viên đã được đăng ký"],
      chart: {
        width: 350,
        type: "donut"
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

    // this.statisticService.getNumberOfPassedProjects().subscribe(numberOfPassed => {
    //   this.numberOfPassedCategories = numberOfPassed;

    //   console.log("Duplicated categories: " + this.duplicatedCategories);
    //   console.log("Passed categories: " + this.numberOfPassedCategories);
      
    // });
    
  }

  ngOnInit(): void {
  }

}
