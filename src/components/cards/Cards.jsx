import React, { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import axios from "axios"
import "./cards.css"
import Common from "../../common/Common"

const Cards = () => {
  const [eligibilityData, setEligibilityData] = useState([189, 11]);
  const [genderData, setGenderData] = useState([55, 45]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [eligibilityResponse, genderResponse] = await Promise.all([
          axios.get('http://localhost:8080/cse/students/eligibility'),
          axios.get('http://localhost:8080/cse/students/genderScore')
        ]);
        console.log(eligibilityResponse.data);
        console.log(genderResponse.data);

        setEligibilityData([
          eligibilityResponse.data.eligible,
          eligibilityResponse.data.notEligible
        ]);
        setGenderData([
          genderResponse.data.boys,
          genderResponse.data.girls
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const EligibilityData = {
    series: eligibilityData,
    options: {
      chart: {
        height: 250,
        type: "donut",
      },
      labels: ['Eligible Students', 'Not Eligible'],
      colors: ['#4CAF50', '#FF5252'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                formatter: function (val) {
                  return Math.round(val);  // Show actual numbers
                }
              },
              total: {
                show: true,
                label: 'Total:X',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                formatter: function () {
                  return `${eligibilityData[0] + eligibilityData[1]}`
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
          return opts.w.config.labels[opts.seriesIndex] + ': ' + Math.round(val);
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        markers: {
          width: 12,
          height: 12,
          radius: 6
        }
      }
    }
  }

  const BoysVsGirlsData = {
    series: genderData,
    options: {
      chart: {
        height: 250,
        type: "donut",
      },
      labels: ['Boys', 'Girls'],
      colors: ['#3B82F6', '#EC4899'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                formatter: function (val) {
                  return Math.round(val);  // Show actual numbers
                }
              },
              total: {
                show: true,
                label: 'Total:x',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                formatter: function () {
                  return `${genderData[0] + genderData[1]}`
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
          return opts.w.config.labels[opts.seriesIndex] + ': ' + Math.round(val);
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        markers: {
          width: 12,
          height: 12,
          radius: 6
        }
      }
    }
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className='cards grid'>
        <div className='cardBox' style={{ gridColumn: "span 2" }}>
          <Common title='Students Eligibility' />
          <div className='circle'>
            <div className='row'>
              <ReactApexChart 
                options={EligibilityData.options} 
                series={EligibilityData.series} 
                type="donut" 
                height={250} 
              />
            </div>
          </div>
        </div>
        <div className='cardBox' style={{ gridColumn: "span 2" }}>
          <Common title='Boys Vs Girls' />
          <div className='circle'>
            <div className='row1'>
              <ReactApexChart 
                options={BoysVsGirlsData.options} 
                series={BoysVsGirlsData.series} 
                type="donut" 
                height={250} 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards