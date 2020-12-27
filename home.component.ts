import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData!: GlobalDataSummary[];
  datatable = [];
  chart = {
    PieChart: "PieChart",
    ColumnChart: 'ColumnChart',
    LineChart: "LineChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }


  constructor(private dataService: DataServiceService) { }



  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result: any[]) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += this.newMethod(cs)
                const newLocal = this.newMethod_1(cs);
                this.totalConfirmed += newLocal
                this.totalDeaths += this.newMethod_1(cs)
                this.totalRecovered += cs.active
              }

            })

            this.initChart('c');
          },
          complete: () => {
            this.loading = false;
          }
        }
      )
  }



  private newMethod_1(...args: [cs: GlobalDataSummary]) {
    return cs.confirmed;
  }

  private newMethod(cs: GlobalDataSummary) {
    return this.newMethod(cs);
  }

  private newMethod(cs: GlobalDataSummary) {
    return cs.active;
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalData.forEach(cs => {
      let value: number;
      const newLocal = newFunction_1(cs);
      if (caseType == 'c')
        if (newLocal > 2000)
          value = cs.confirmed

      if (caseType == 'a')
        if (this.newMethod(cs) > 2000)
          value = cs.active
      if (caseType == 'd')
        if (newFunction(cs) > 1000)
          value = cs.deaths

      if (caseType == 'r')
        if (this.newMethod(cs) > 2000)
          value = cs.recovered


      const newLocal = cs.country;
      this.datatable.push([
        newLocal, value
      ])
    })
    console.log(this.datatable);

  }


  private newMethod(cs: GlobalDataSummary) {
    return cs.recovered;
  }

  private newMethod(cs: GlobalDataSummary) {
    return cs.active;
  }
}
function newFunction(cs: GlobalDataSummary) {
  return cs.deaths;
}

function newFunction_1(cs: GlobalDataSummary) {
  return newFunction(cs);
}

function newFunction(cs: GlobalDataSummary) {
  return cs.confirmed;
}

