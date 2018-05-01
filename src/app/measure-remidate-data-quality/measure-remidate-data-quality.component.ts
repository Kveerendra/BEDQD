import { Component, OnInit, Input, Inject,ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { MeasureRemidateDQService } from './measure-remidate-data-quality.service';
import { ChartComponent } from "angular2-chartjs";
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-measure-remidate-data-quality',
    templateUrl: './measure-remidate-data-quality.component.html',
    styleUrls: ['./measure-remidate-data-quality.component.css'],
    providers: [MeasureRemidateDQService,NgbDropdownConfig]
})
export class MeasureRemidateDataQualityComponent implements OnInit {
    @ViewChild('grid3Chart') chart1: ChartComponent;
    @ViewChild('grid4Chart') chart2: ChartComponent;
    openDQIssues: String;
    header: String;
    columnDefs;
    rowData = [];
    drop1 = [];
    drop2 = [];
    drop3 = [];
    LOBFilter ={};
    keysOfGrid3 = [];
    grid3loaded = false;
    grid4loaded = false;
    grid5loaded = false;
    grid6loaded = false;
    grid3config = {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: "30-60",
                data: [],
                backgroundColor: "#b3cccc",
                hoverBackgroundColor: "#b3cccc"
            }, {
                label: "<30",
                data: [],
                backgroundColor: "#0086b3",
                hoverBackgroundColor: "#0086b3"
            }, {
                label: ">60",
                data: [],
                backgroundColor: "#264d73",
                hoverBackgroundColor: "#264d73"
            }
            ]
        },

        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontFamily: "'Open Sans Bold', sans-serif",
                    },
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                    },
                    stacked: true,
                    scaleStartValue: 0
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#fff",
                    },
                    ticks: {
                        fontFamily: "'Open Sans Bold', sans-serif"

                    },
                    stacked: true,
                    position: "right",
                    display: true
                }]
            },
            legend: {
                position: "bottom",
                display: true
            },
        }
    };

    grid4config = {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: "30-60",
                data: [],
                backgroundColor: "#b3cccc",
                hoverBackgroundColor: "#b3cccc"
            }, {
                label: "<30",
                data: [],
                backgroundColor: "#0086b3",
                hoverBackgroundColor: "#0086b3"
            }, {
                label: ">60",
                data: [],
                backgroundColor: "#264d73",
                hoverBackgroundColor: "#264d73"
            }
            ]
        },

        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontFamily: "'Open Sans Bold', sans-serif",
                    },
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                    },
                    stacked: true,
                    scaleStartValue: 0
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#fff",
                    },
                    ticks: {
                        fontFamily: "'Open Sans Bold', sans-serif"

                    },
                    stacked: true,
                    position: "left",
                    display: true
                }]
            },
            legend: {
                position: "bottom",
                display: true
            },
        }
    };

    grid5config = {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: "Conformity",
                data: [],
                backgroundColor: "#b3cccc",
                hoverBackgroundColor: "#b3cccc"
            }, {
                label: "Completeness",
                data: [],
                backgroundColor: "#0086b3",
                hoverBackgroundColor: "#0086b3"
            }, {
                label: "Validity",
                data: [],
                backgroundColor: "#264d73",
                hoverBackgroundColor: "#264d73"
            }, {
                label: "Accuracy",
                data: [],
                backgroundColor: "#0099cc",
                hoverBackgroundColor: "#0099cc"
            }
            ]
        },

        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontFamily: "'Open Sans Bold', sans-serif",
                    },
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                    },
                    stacked: true,
                    scaleStartValue: 0
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#fff",
                    },
                    ticks: {
                        fontFamily: "'Open Sans Bold', sans-serif"

                    },
                    stacked: true,
                    position: "right",
                    display: true
                }]
            },
            legend: {
                position: "bottom",
                display: true
            },
        }
    };

    grid6config = {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: "Conformity",
                data: [],
                backgroundColor: "#b3cccc",
                hoverBackgroundColor: "#b3cccc"
            }, {
                label: "Completeness",
                data: [],
                backgroundColor: "#0086b3",
                hoverBackgroundColor: "#0086b3"
            }, {
                label: "Validity",
                data: [],
                backgroundColor: "#264d73",
                hoverBackgroundColor: "#264d73"
            }, {
                label: "Accuracy",
                data: [],
                backgroundColor: "#0099cc",
                hoverBackgroundColor: "#0099cc"
            }
            ]
        },

        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontFamily: "'Open Sans Bold', sans-serif",
                    },
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                    },
                    stacked: true,
                    scaleStartValue: 0
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#fff",
                    },
                    ticks: {
                        fontFamily: "'Open Sans Bold', sans-serif"

                    },
                    stacked: true,
                    position: "left",
                    display: true
                }]
            },
            legend: {
                position: "bottom",
                display: true
            },
        }
    };

    service: MeasureRemidateDQService;
    constructor(measureRemidateDQService: MeasureRemidateDQService,private cd: ChangeDetectorRef,ngbDropdownConfi:NgbDropdownConfig) {
        this.service = measureRemidateDQService;
        ngbDropdownConfi.autoClose='outside';
    }

    ngOnInit() {
        this.service.getData().then((dataaa) => {
            var grid3MapList;
            var grid4MapList;
            var grid5MapList;
            var dataset_grid3;
            var dataset_grid4;
            var dataset_grid5;
            var dataset_grid6;
            var yearQuarter = [];
            var lob = [];
            var sourceSystem = [];

            var openDQIssuesData = this.service.getdataQualityScoreData();
            var grid3Data = this.service.getopenDQPrioritySummary();
            var grid4Data = this.service.getopenDQPriorityDtlsLowPr();
            var appGridData = this.service.getissueSummaryLst();
            var issueDetailsMap = this.service.getissueTypeDetails();

            this.openDQIssues = (Math.round(openDQIssuesData["dqScore"])).toString();
            this.header = openDQIssuesData["header"].toString();

            this.keysOfGrid3 = Object.keys(grid3Data);
            this.grid3config.data.labels = this.keysOfGrid3;
            this.grid4config.data.labels = this.keysOfGrid3;
            this.grid5config.data.labels = this.keysOfGrid3;
            this.grid6config.data.labels = this.keysOfGrid3;

            for (const itr_1 in grid3Data) {
                grid3MapList = grid3Data[itr_1];
                for (const itr_2 in grid3MapList) {
                    dataset_grid3 = (-1) * parseInt(grid3MapList[itr_2]['highPriority']);
                    this.grid3config.data.datasets[itr_2].data.push(dataset_grid3);
                }
            }

            for (const itr_1 in grid4Data) {
                grid4MapList = grid4Data[itr_1];
                for (const itr_2 in grid4MapList) {
                    dataset_grid4 = parseInt(grid4MapList[itr_2]['lowPriority']);
                    this.grid4config.data.datasets[itr_2].data.push(dataset_grid4);
                }
            }
            for (const itr_3 in appGridData) {
                if(yearQuarter.indexOf(appGridData[itr_3]['yearQuarter']) == -1 && null != appGridData[itr_3]['yearQuarter']){
                    yearQuarter.push(appGridData[itr_3]['yearQuarter']);
                }
            }
            for (const itr_3 in appGridData) {
                if(lob.indexOf(appGridData[itr_3]['lob']) == -1 && null != appGridData[itr_3]['lob']){
                    lob.push(appGridData[itr_3]['lob']);
                    this.LOBFilter[appGridData[itr_3]['lob']] = true;

                }
            }
            for (const itr_4 in appGridData) {
                if(sourceSystem.indexOf(appGridData[itr_4]['sourceSystem']) == -1 && null != appGridData[itr_4]['sourceSystem']){
                    sourceSystem.push(appGridData[itr_4]['sourceSystem']);

                }
            }
            for(const itr_5 in issueDetailsMap){
                grid5MapList = issueDetailsMap[itr_5];
                for (const itr_2 in grid5MapList) {
                    dataset_grid5 = -1*parseInt(grid5MapList[itr_2]['priorQuarter']);
                    dataset_grid6 = grid5MapList[itr_2]['currentQuarter'];

                    this.grid5config.data.datasets[itr_2].data.push(dataset_grid5);
                    this.grid6config.data.datasets[itr_2].data.push(dataset_grid6);
                }
            }
            this.drop1 = yearQuarter;
            this.drop2 = lob;
            this.drop3 = sourceSystem;

            this.grid3loaded = true;
            this.grid4loaded = true;
            this.grid5loaded = true;
            this.grid6loaded = true;
        });
    }

    filterLOBData(e) {
        var labels = [];
        for (const key in this.LOBFilter) {
          if (this.LOBFilter[key]) {
            labels.push(key);
          }
        }
        this.chart1.data.labels = labels;
        this.chart1.chart.update();
        this.chart2.data.labels = labels;
        this.chart2.chart.update();
      }
    changeData1(name){
        document.getElementById("div1").style.display = "block";
        document.getElementById("div2").style.display = "none";
    }

    changeData2(name){
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "block";
    }

    changeData4(){
        document.getElementById("div4").style.display = "block";
        document.getElementById("div5").style.display = "block";
        document.getElementById("div3").style.display = "none";
    }

    changeData5(){
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div3").style.display = "block";
    }
}
