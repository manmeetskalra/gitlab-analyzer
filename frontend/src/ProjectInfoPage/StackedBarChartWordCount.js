import { Bar } from "react-chartjs-2";

function StackedBarChartWordCount({
  members, 
  commentWordCountArray, 
  issueWordCountArray,
}) { 
  let colorListComment = [];
  let colorIssueComment = [];

  for (var i = 0; i < members.length; i++) { 
    colorListComment.push("rgba(253, 17, 165, 0.7");
    colorIssueComment.push("rgba(56,255,21,0.7");
  }

  return (
    <div>
      <Bar
        data={{
          labels: members,
          datasets: [
            {
              label: "Comment (word count)",
              data: commentWordCountArray,
              maintainAspectRatio: true,
              backgroundColor: colorListComment,
              borderWidth: 4,
            },

            {
              label: "Issue (word count)",
              data: issueWordCountArray,
              maintainAspectRatio: true,
              backgroundColor: colorIssueComment,
              borderWidth: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Word count",
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
                  labelString: "Word count",
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

export default StackedBarChartWordCount;
