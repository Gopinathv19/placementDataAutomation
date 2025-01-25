import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import './ProfileCard.css';
import CloseIcon from '@mui/icons-material/Close';

const ProfileCard = ({ studentData, onClose }) => {
  // Progress chart options
  const progressOptions = {
    chart: {
      height: 150,
      type: 'radialBar',
      foreColor: '#fff',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        track: {
          background: '#2d2d2d',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '1.5rem',
            color: '#fff',
          },
        },
      },
    },
    fill: {
      colors: ['#ff4d4d']
    },
    labels: ['Progress'],
  };

  // Distribution chart options
  const distributionOptions = {
    chart: {
      type: 'donut',
      foreColor: '#fff',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%'
        }
      }
    },
    labels: ['Easy', 'Medium', 'Hard'],
    colors: ['#00b8a3', '#ffa116', '#ff375f'],
    legend: {
      position: 'bottom'
    }
  };

  return (
    <Box className="profile-container">
      <Card className="profile-card">
        <CardContent>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            {/* Profile Header */}
            <Grid item xs={12} className="profile-header">
              <Avatar
                src={studentData?.avatar || '/default-avatar.png'}
                sx={{ width: 100, height: 100 }}
                className="profile-avatar"
              />
              <Box className="profile-info">
                <Typography variant="h4" className="student-name">
                  {studentData?.name || 'Student Name'}
                </Typography>
                <Typography variant="subtitle1" className="university-no">
                  University No: {studentData?.universityNo || 'N/A'}
                </Typography>
              </Box>
            </Grid>

            {/* Statistics Grid */}
            <Grid item xs={12} md={4}>
              <Card className="stats-card">
                <CardContent>
                  <Typography variant="h6">Problems Solved</Typography>
                  <Box className="progress-chart">
                    <ReactApexChart
                      options={progressOptions}
                      series={[studentData?.problemsSolvedPercentage || 0]}
                      type="radialBar"
                      height={200}
                    />
                    <Typography variant="h4" className="total-solved">
                      {studentData?.problemsSolved || 0}
                    </Typography>
                    <Typography variant="subtitle2">
                      out of {studentData?.totalProblems || 0}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Distribution Chart */}
            <Grid item xs={12} md={4}>
              <Card className="stats-card">
                <CardContent>
                  <Typography variant="h6">Difficulty Distribution</Typography>
                  <ReactApexChart
                    options={distributionOptions}
                    series={[
                      studentData?.easySolved || 0,
                      studentData?.mediumSolved || 0,
                      studentData?.hardSolved || 0
                    ]}
                    type="donut"
                    height={250}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <Card className="stats-card">
                <CardContent>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Box className="activity-list">
                    {studentData?.recentActivity?.map((activity, index) => (
                      <Typography key={index} variant="body2" className="activity-item">
                        {activity}
                      </Typography>
                    )) || 'No recent activity'}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileCard; 