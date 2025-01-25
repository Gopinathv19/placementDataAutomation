import React,{useState,useEffect} from "react"
import Common from "../../common/Common"
import "./chart.css"
import ReactApexChart from "react-apexcharts"
import axios from "axios"

const Charts = ({ sectionData }) => {
  const[chartData,setChartData] =useState({
    donutData:[],
    barData:[],
    lineData:{
      leetcode:[],
      aptitude:[],
      overall:[]
    }
  })

  useEffect(() => {
    const fetchChartData = async () => {  // 'async' was misspelled as 'assync'
      try {
        const response = await axios.get('http://localhost:8080/cse/students/charts');
        const { donutData, barData, lineData } = response.data;
        setChartData({ donutData, barData, lineData });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }; 
    
    fetchChartData();
  }, []);
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
      labels: ['Easy', 'Medium', 'Hard'],
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

  const bardata = {
    series: [
      {
        name: "Performance",
        data: chartData.barData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#6B7280",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Verbal', 'Logical', 'Numerical'],
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Score (%)',
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
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
        },
        colors: ['#3B82F6']
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

  const line = {
    series: [
      {
        name: "Leetcode",
        data: chartData.lineData.leetcode,
      },
      {
        name: "Aptitude",
        data: chartData.lineData.aptitude,
      },
      {
        name: "Overall",
        data: chartData.lineData.overall,
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
          text: 'Score (%)',
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
      <section className='charts grid2'>
        <div className='cardBox'>
          <Common title='Leetcode Performance' />
          <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Aptitude Performance' />
          <ReactApexChart options={bardata.options} series={bardata.series} type='bar' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Overall Performance' />
          <ReactApexChart options={line.options} series={line.series} type='line' height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts