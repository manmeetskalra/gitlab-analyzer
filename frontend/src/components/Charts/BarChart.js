import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({data,codeContribution, barLabel1, barColour1, barLabel2, barColour2, maintainRatio=true}) => {
    let xAxis = data.map(d => d.year);
    let yAxis1;
    let yAxis2;

    let options = {
        scaleShowValues: true,
        scales: {
            xAxis: [
                {
                    ticks: {
                        autoSkip: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                        stepSize: 1,
                  },
                },
              ],
            },
        maintainAspectRatio: maintainRatio
    };

    let dataConfig = {
        labels: xAxis,
        datasets: [
          {
            label: barLabel1,
            data: '',
            backgroundColor: barColour1,
          },
        ],
    };

    if (codeContribution) {
        yAxis1 = data.map(d => d.MRDaily);
        yAxis2 = data.map(d => -d.CommitDaily);

        options.scales.yAxes[0]['stacked'] = true;
        options.scales['xAxes'] = [{'stacked': true}];
        options['animation'] = {'duration': 300};

        dataConfig.datasets.push({
            label: barLabel2, 
            data: yAxis2, 
            backgroundColor: barColour2,
        });
    } else {
        yAxis1 = data.map(d => d.data);
    }

    dataConfig.datasets[0].data = yAxis1;

    return(
        <Bar data={dataConfig} options={options}>{console.log(dataConfig)}</Bar>
    )

}

export default BarChart; 