import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton, CircularProgress } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import './ProfileCard.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const ProfileCard = ({ studentData, onClose }) => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [studentScores, setStudentScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const leetcodeResponse = await axios.post('https://leetcode.com/graphql', {
          query: `{
            matchedUser(username:"${studentData?.leetcodeUsername}"){
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }`
        });
        
       
 
        const scoresResponse = await axios.get(`http://localhost:8080/cse/students/${studentData?.universityNo}/scores`);
      
        setLeetcodeStats(leetcodeResponse.data.data.matchedUser);
        setStudentScores(scoresResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch student statistics');
      } finally {
        setLoading(false);
      }
    };

    if (studentData?.leetcodeUsername) {
      fetchData();
    }
  }, [studentData]);

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
            show: true,
            fontSize: '14px',
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
    labels: ['Total Solved'],
  };

  const scoresOptions = {
    chart: {
      type: 'bar',
      foreColor: '#fff',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      }
    },
    colors: ['#3B82F6'],
    xaxis: {
      categories: ['Aptitude', 'Technical', 'Programming', 'Overall'],
    },
  };

  if (loading) return (
    <Box className="profile-container" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box className="profile-container" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card className="error-card">
        <CardContent>
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error}
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

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

            {/* LeetCode Progress */}
            <Grid item xs={12} md={6}>
              <Card className="stats-card">
                <CardContent>
                  <Typography variant="h6">LeetCode Statistics</Typography>
                  <Box className="progress-chart">
                    <ReactApexChart
                      options={progressOptions}
                      series={[leetcodeStats?.submitStats?.acSubmissionNum?.[0]?.count || 0]}
                      type="radialBar"
                      height={300}
                    />
                    <Box className="leetcode-stats">
                      <Typography variant="body2">
                        Easy: {leetcodeStats?.submitStats?.acSubmissionNum?.[1]?.count || 0}
                      </Typography>
                      <Typography variant="body2">
                        Medium: {leetcodeStats?.submitStats?.acSubmissionNum?.[2]?.count || 0}
                      </Typography>
                      <Typography variant="body2">
                        Hard: {leetcodeStats?.submitStats?.acSubmissionNum?.[3]?.count || 0}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Student Scores */}
            <Grid item xs={12} md={6}>
              <Card className="stats-card">
                <CardContent>
                  <Typography variant="h6">Performance Scores</Typography>
                  <ReactApexChart
                    options={scoresOptions}
                    series={[{
                      name: 'Score',
                      data: [
                        studentScores?.aptitude || 0,
                        studentScores?.technical || 0,
                        studentScores?.programming || 0,
                        studentScores?.overall || 0
                      ]
                    }]}
                    type="bar"
                    height={300}
                  />
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