import { Bar } from "react-chartjs-2";

function StackedBarChartScore({
  members, 
  commitScoreArray, 
  MRScoreArray, 
}) {
  let colorListCommit = [];
  let colorListMR = [];

  for (var i = 0; i < members.length; i++) {
    colorListCommit.push("rgba(53,63,196,0.7)");
    colorListMR.push("rgba(40, 240, 230, 0.7");
  }

  return (
    <div>
      <Bar
        data={{
          labels: members,
          datasets: [
            {
              label: "Commit score",
              data: commitScoreArray,
              maintainAspectRatio: true,
              backgroundColor: colorListCommit,
              borderWidth: 4,
            },

            {
              label: "Merge request score",
              data: MRScoreArray,
              maintainAspectRatio: true,
              backgroundColor: colorListMR,
              borderWidth: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Contribution scores",
            fontSize: 30,
          },

          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Members",
                },
                stacked: true,
              },
            ],
            yAxes: [
              {
                ticks: { beginAtZero: true },
                scaleLabel: {
                  display: true,
                  labelString: "Contribution score",
                },
                stacked: true,
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default StackedBarChartScore;
