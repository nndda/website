import {Chart, RadarController, LineElement, PointElement, RadialLinearScale, Filler} from "chart.js";
// import {Chart} from "chart.js/auto";

Chart.register(RadarController, LineElement, PointElement, RadialLinearScale, Filler);

const data = {
  labels: [
    "Art/Illustration",
    "Game Dev",
    "Web Dev",
  ],
  datasets: [{
    data: [50, 75, 68],
    fill: true,
    backgroundColor: "transparent",
    borderColor: "#fedf0f",
    pointBackgroundColor: "#fedf0f",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(255, 99, 132)"
  }]
};

const config = {
  type: "radar" as const,
  data: data,
  options: {
    responsive: true,
    // elements: {
    //   line: {
    //     borderWidth: 4,
    //     borderColor: "#fff",
    //   }
    // },
    scales: {
        r: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: {
                color: "#fff4",
            },
            ticks: {
                    display: false,
                },
            angleLines: {
              color: "#fedf0f"
            },
            pointLabels:{
                font: {
                    size: 16,
                    color: "#fedf0f",
                },
            },
            title: {
                display: false,
                // color: "red",
            }
        },
    }
  },
};

const radarChart = new Chart(
    <HTMLCanvasElement>document.getElementById("tool-radar-chart"),
    config
)