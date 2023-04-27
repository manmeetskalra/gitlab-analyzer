import { Bar } from "react-chartjs-2";

function StackedBarChart({
  members,
  commitCountArray, 
  MRCountArray, 
  commentCountArray, 
  issueCountArray, 
}) {
  let colorListCommit = [];
  let colorListMR = [];
  let colorListComment = [];
  let colorIssueComment = [];

  for (var i = 0; i < members.length; i++) {
    colorListCommit.push("rgba(53,63,196,0.7)");
    colorListMR.push("rgba(40, 240, 230, 0.7");
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
              label: "Commit count",
              data: commitCountArray,
              maintainAspectRatio: true,
              backgroundColor: colorListCommit,
              borderWidth: 4,
            },

            {
              label: "Merge request count",
              data: MRCountArray,
              maintainAspectRatio: true,
              backgroundColor: colorListMR,
              borderWidth: 4,
            },

            {
              label: "Comments (count)",
              data: commentCountArray,
              maintainAspectRatio: true,
              backgroundColor: colorListComment,
              borderWidth: 4,
            },

            {
              label: "Issues (count)",
              data: issueCountArray,
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
            text: "Contribution by count",
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
                  labelString: "Contribution",
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

export default StackedBarChart;
