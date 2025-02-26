import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { Avatar } from '@mui/material';

const ProfileCard = ({ studentData, onClose }) => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentData?.leetcodeUsername) {
        return;
      }
      
      try {
        setLoading(true);
        const query = {
          query: `
          {
            matchedUser(username: "${studentData.leetcodeUsername}") {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }`
        };

        const response = await axios.post('/api/graphql', query, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data?.data?.matchedUser) {
          const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;
          setLeetcodeStats(stats);
          setError(null);
        } else {
          setError('User not found or no data available');
        }
      } catch (err) {
        setError('Failed to fetch LeetCode statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentData]);

  const handleClose = () => {
    onClose(false);
  };

  const getDifficultyCount = (difficulty) => {
    return leetcodeStats?.find(stat => stat.difficulty === difficulty)?.count || 0;
  };

  const totalProblemsSolved = getDifficultyCount('Easy') + getDifficultyCount('Medium') + getDifficultyCount('Hard');

  const donutChartOptions = {
    chart: {
      type: 'donut',
      foreColor: '#fff',
    },
    labels: ['Easy', 'Medium', 'Hard'],
    colors: ['#4CAF50', '#FFC107', '#F44336'],
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const count = opts.w.config.series[opts.seriesIndex];
        return `${count}`;
      },
      style: {
        colors: ['#fff']
      }
    }
  };

  if (loading) return (
    <div className="p-8 bg-black bg-opacity-95 min-h-screen absolute top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 bg-black bg-opacity-95 min-h-screen absolute top-0 left-0 right-0 z-50 flex flex-col items-center justify-center">
      <div className="bg-gray-800 text-white rounded-lg p-4 max-w-md w-[90%] mx-auto border border-red-500 relative">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-2 text-white hover:text-gray-300 rounded-full"
        >
          <CloseIcon />
        </button>
        <div className="p-4">
          <h3 className="text-red-500 mb-2">Error Loading Profile</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-black bg-opacity-95 min-h-screen absolute top-0 left-0 right-0 z-50">
      <div className="bg-gray-800 text-white rounded-xl relative shadow-lg">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-2 text-white hover:text-gray-300 rounded-full"
        >
          <CloseIcon />
        </button>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Header */}
            <div className="col-span-1 md:col-span-2 flex items-center gap-8 p-4">
              <div className="relative">
                <Avatar
                  src={studentData?.avatar || '/default-avatar.png'}
                  alt="Profile"
                  sx={{ 
                    width: 96, 
                    height: 96,
                    bgcolor: '#9CA3AF',
                    fontSize: '2rem',
                  }}
                  className="z-10"
                >
                  {studentData.name ? studentData.name.charAt(0).toUpperCase() : 'S'}
                </Avatar>
                <div className="absolute inset-0 rounded-full border-4 border-red-500 -z-0"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-white">
                  {studentData?.name || 'Student Name'}
                </h2>
                <p className="text-gray-400">
                  University No: {studentData?.universityNo || 'N/A'}
                </p>
              </div>
            </div>

            {/* LeetCode Donut Chart */}
            <div className="col-span-1">
              <div className="bg-gray-700 text-white rounded-lg p-6 h-full flex flex-col justify-center">
                <h3 className="text-xl mb-4">LeetCode Statistics</h3>
                <ReactApexChart
                  options={donutChartOptions}
                  series={[
                    getDifficultyCount('Easy'),
                    getDifficultyCount('Medium'),
                    getDifficultyCount('Hard')
                  ]}
                  type="donut"
                  height={300}
                />
              </div>
            </div>

            {/* Performance Scores Table */}
            <div className="col-span-1">
              <div className="bg-gray-700 text-white rounded-lg p-6 h-full flex flex-col justify-center">
                <h3 className="text-xl mb-4">Performance Scores</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">Category</th>
                      <th className="py-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Aptitude</td>
                      <td className="py-2">{studentData?.scores?.aptitude || 0}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Technical</td>
                      <td className="py-2">{studentData?.scores?.technical || 0}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Programming</td>
                      <td className="py-2">{studentData?.scores?.programming || 0}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Overall</td>
                      <td className="py-2">{studentData?.scores?.overall || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 