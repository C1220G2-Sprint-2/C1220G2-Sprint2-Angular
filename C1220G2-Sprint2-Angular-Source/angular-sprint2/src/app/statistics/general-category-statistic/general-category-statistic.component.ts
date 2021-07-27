import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  numberOfPassedCategories: number = 0;
  numberOfPendingCategories: number = 0;

  constructor(private statisticService: StatisticsService) {
  }

  ngOnInit(): void {
    console.log("Duplicated categories: " + this.duplicatedCategories);
    this.statisticService.getNumberOfPassedProjects().subscribe((numberOfPassed:number) => {
      this.numberOfPassedCategories = numberOfPassed;
      console.log("Passed categories: " + this.numberOfPassedCategories);
      this.statisticService.getNumberOfPendingProjects().subscribe((numberOfPendings: number) => {
        this.numberOfPendingCategories = numberOfPendings;
        console.log("Pending categories: " + this.numberOfPendingCategories);

        this.chartOptions = {
          series: [this.duplicatedCategories, this.numberOfPendingCategories, this.numberOfPassedCategories],
          labels: ["Đề tài trùng", "Đề tài đang duyệt", "Đề tài đã duyệt"],
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
        };
        
      })
    });

    // console.log("Number of duplicated categories: " + this.duplicatedCategories);
  }

}
