import {useState,useEffect} from "react"
import Common from "../../common/Common"
import ReactApexChart from "react-apexcharts"
import axios from "axios"

const Charts = ({ batch }) => {
  const[chartData,setChartData] =useState({
    donutData:[],
    lineData:{
      leetcode:[],
      aptitude:[],
      overall:[]
    }
  })

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`/cse/v1/students/charts/${batch}`);
        const { donutData, lineData } = response.data;

        // checking the response from the backend
        console.log(response.data)

        // Check if the data is empty
        if (donutData.length === 0 && lineData.leetcode.length === 0) {
          setChartData({ donutData: [], lineData: { leetcode: [], aptitude: [], overall: [] } });
        } else {
          setChartData({ donutData, lineData });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchChartData();
  }, [batch]);

  // Render nothing if there's no data
  if (chartData.donutData.length === 0 && chartData.lineData.leetcode.length === 0) {
    return <p>No data available for the selected batch.</p>;
  }

  const data = {
    series: chartData.donutData,
    options: {
      chart: {
        type: "donut",
        foreColor: "#6B7280",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        }
      },
      fill: {
        colors: ['#3B82F6', '#10B981', '#F59E0B'],
      },
      stroke: {
        colors: ['#ffffff'],
        width: 2
      },
      legend: {
        position: 'bottom',
        markers: {
          fillColors: ['#3B82F6', '#10B981', '#F59E0B']
        }
      },
      labels: ['A', 'B', 'C'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
              },
              value: {
                show: true,
                fontSize: '16px',
                formatter: function (val) {
                  return val + '%'
                }
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '22px',
                color: '#6B7280',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%'
                }
              }
            },
          },
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  }

  const line = {
    series: [
      {
        name: "CSE A ",
        data: chartData.lineData.csea,
      },
      {
        name: "CSE B",
        data: chartData.lineData.cseb,
      },
      {
        name: "CSE C",
        data: chartData.lineData.csec,
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        foreColor: "#6B7280",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          }
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ['#3B82F6', '#10B981', '#F59E0B']
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
          size: 9
        }
      },
      xaxis: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      yaxis: {
        title: {
          text: '[Month_Name]',
          style: {
            color: '#6B7280'
          }
        },
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        markers: {
          width: 8,
          height: 8,
          strokeWidth: 0,
          fillColors: ['#3B82F6', '#10B981', '#F59E0B'],
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      }
    },
  }

  return (
    <>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 rounded-md p-5">
          <Common title='Leetcode Performance' />
          <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
        </div>
        <div className="bg-gray-700 rounded-md p-5">
          <Common title='Overall Performance' />
          <ReactApexChart options={line.options} series={line.series} type='line' height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts