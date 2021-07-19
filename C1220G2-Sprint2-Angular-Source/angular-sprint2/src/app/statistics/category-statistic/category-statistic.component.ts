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

  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "Số lần đăng ký",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
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
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
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
        categories: [
          ["Thuật", "Toán"],
          ["Giáo", "Dục"],
          ["Môi", "Trường"],
          ["Quản", "Lý"],
          ["Thư", "Viện"],
          ["Công", "Tuy"],
          ["Quy Hoạch", "Động"],
          ["Trường", "Học"]
        ],
        position: "top",
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
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
  }

  ngOnInit(): void {
  }

}
