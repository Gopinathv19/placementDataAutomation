import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton, CircularProgress, TextField, Button, InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/cse/v1/students/search`, {
          params: { q: searchTerm }
        });
        setSearchResults(response.data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (student) => {
    setSelectedStudent(student);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleProfileChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Log the data being sent
      console.log('Sending data:', selectedStudent);
      
      const response = await axios.put(
        `http://localhost:8080/cse/v1/students/${selectedStudent.universityNo}/updateAll`, 
        selectedStudent,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data) {
        alert('Profile updated successfully');
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(`Failed to update profile: ${err.response?.status} - ${err.response?.data || err.message}`);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        <div className="search-container">
          <TextField
            label="Search by name, roll no, or university no..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          {loading && <CircularProgress size={24} />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && searchResults.length > 0 && (
            <Box className="search-results">
              {searchResults.map((result) => (
                <Box
                  key={result.universityNo}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <Typography variant="body1">{result.name}</Typography>
                  <Typography variant="body2">University No: {result.universityNo}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </div>

        {selectedStudent && (
          <Card className="profile-card">
            <CardContent>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => setSelectedStudent(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} className="profile-header">
                  <Avatar
                    src={selectedStudent.avatar || '/default-avatar.png'}
                    sx={{ width: 100, height: 100 }}
                    className="profile-avatar"
                  />
                  <Box className="profile-info">
                    <Typography variant="h4" className="student-name">
                      {selectedStudent.name}
                    </Typography>
                    
                    {/* Basic Info */}
                    <TextField
                      label="University No"
                      name="universityNo"
                      value={selectedStudent.universityNo || ''}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Class Name"
                      name="className"
                      value={selectedStudent.className || ''}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Roll No"
                      name="rollNo"
                      value={selectedStudent.rollNo || ''}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Gender"
                      name="gender"
                      value={selectedStudent.gender || ''}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="LeetCode Username"
                      name="leetcodeUsername"
                      value={selectedStudent.leetcodeUsername || ''}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* LeetCode Scores */}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>LeetCode Statistics</Typography>
                    <TextField
                      label="Easy Problems Solved"
                      name="easyProblemsSolved"
                      type="number"
                      value={selectedStudent.easyProblemsSolved || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Medium Problems Solved"
                      name="mediumProblemsSolved"
                      type="number"
                      value={selectedStudent.mediumProblemsSolved || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Hard Problems Solved"
                      name="hardProblemsSolved"
                      type="number"
                      value={selectedStudent.hardProblemsSolved || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* Aptitude Test Scores */}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Aptitude Test Scores</Typography>
                    <TextField
                      label="Aptitude Test 1"
                      name="aptiTest1Score"
                      type="number"
                      value={selectedStudent.aptiTest1Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Aptitude Test 2"
                      name="aptiTest2Score"
                      type="number"
                      value={selectedStudent.aptiTest2Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Aptitude Test 3"
                      name="aptiTest3Score"
                      type="number"
                      value={selectedStudent.aptiTest3Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* Technical Aptitude Scores */}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Technical Aptitude Scores</Typography>
                    <TextField
                      label="Technical Test 1"
                      name="techAptiTest1Score"
                      type="number"
                      value={selectedStudent.techAptiTest1Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Technical Test 2"
                      name="techAptiTest2Score"
                      type="number"
                      value={selectedStudent.techAptiTest2Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Technical Test 3"
                      name="techAptiTest3Score"
                      type="number"
                      value={selectedStudent.techAptiTest3Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* Programming Test Scores */}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Programming Test Scores</Typography>
                    <TextField
                      label="Programming Test 1"
                      name="programmingTest1Score"
                      type="number"
                      value={selectedStudent.programmingTest1Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Programming Test 2"
                      name="programmingTest2Score"
                      type="number"
                      value={selectedStudent.programmingTest2Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Programming Test 3"
                      name="programmingTest3Score"
                      type="number"
                      value={selectedStudent.programmingTest3Score || 0}
                      onChange={handleProfileChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* Action Buttons */}
                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => setSelectedStudent(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;