import { Component, OnInit, ViewChild } from '@angular/core';

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
import { TeacherStatistic } from 'src/app/models/teacher-statistic.model';
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
  selector: 'app-teacher-statistic',
  templateUrl: './teacher-statistic.component.html',
  styleUrls: ['./teacher-statistic.component.css']
})
export class TeacherStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  teacherStatistic: TeacherStatistic[] = [];
  numberOfRegisterTeachers: number = 0;
  teacherNames: string[] = [];
  numberOfRegisters: number[] = [];

  constructor( private statisticsService: StatisticsService ) {
    this.statisticsService.getTeacherStatistic().subscribe(data => {
      this.teacherStatistic = data;
      this.numberOfRegisterTeachers = this.teacherStatistic.length;
      this.teacherStatistic.forEach(e => {
        // console.log("teacher name: " + e.teacher_name);
        this.teacherNames.push(e.teacher_name);
        // console.log("number of register: " + e.number_of_registers);
        this.numberOfRegisters.push(e.number_of_registers);
      });

      const randomColors = this.getColors();
      this.chartOptions = {
        series: [
          {
            name: "Số lần đăng ký",
            // data: [21, 22, 10, 28, 20, 15, 11]
            data: this.numberOfRegisters
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
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
          categories: this.teacherNames,
          position: "top",
          labels: {
            style: {
              colors: randomColors,
              fontSize: "12px"
            }
          }
        },
        title: {
          text: "Thống kê tình trạng đăng ký giáo viên",
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
    for (let i = 1; i <= this.numberOfRegisterTeachers; i++) {
      let color = Math.floor(Math.random()*16777215).toString(16);
      randomColors.push('#' + color);
    }
    return randomColors;
  }

}
