import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions
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
  selector: 'app-general-teacher-statistic',
  templateUrl: './general-teacher-statistic.component.html',
  styleUrls: ['./general-teacher-statistic.component.css']
})
export class GeneralTeacherStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() numberOfRegisteredTeachers: number;
  numberOfNotRegisteredTeachers: number;

  constructor( private statisticsService: StatisticsService ) {
    this.statisticsService.getNumberOfTeachers().subscribe(totalTeachers => {
      this.numberOfNotRegisteredTeachers = totalTeachers - this.numberOfRegisteredTeachers;

      this.chartOptions = {
        series: [this.numberOfNotRegisteredTeachers, this.numberOfRegisteredTeachers],
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
    })

  }
  

  ngOnInit(): void {
    
  }

}
