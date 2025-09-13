
import React from 'react';
import { Box, Grid, Paper, Typography, Button, Modal, TextField, List, ListItem, ListItemText, Chip } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import VideocamIcon from '@mui/icons-material/Videocam';

const transcriptMock = [
  { speaker: 'Doctor', name: 'Dr. Sharma', text: 'Hello, can you tell me about your health?' },
  { speaker: 'Patient', name: 'Mr. Singh', text: 'I smoke 10 cigarettes daily.' },
];

const questionsMock = [
  { type: 'open', text: 'For how many years have you been smoking?' },
  { type: 'binary', text: 'Do you have any breathing issues?' },
];

const emotionMock = { status: 'stressed', icon: <SentimentDissatisfiedIcon color="error" /> };

export default function App() {
  const [summaryOpen, setSummaryOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState(questionsMock);

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'transparent', fontFamily: 'Inter, Roboto, Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden' }}>
      {/* Top Emotion Alert */}
      <Box sx={{ p: 2, bgcolor: emotionMock.status === 'stressed' ? '#fff3f3' : '#f3fff3', display: 'flex', alignItems: 'center', width: '100%', borderRadius: 3, mt: 32 / 8, mb: 32 / 8, boxShadow: '0 2px 8px rgba(25,118,210,0.04)' }}>
        {emotionMock.icon}
        <Typography sx={{ ml: 1, fontWeight: 600, fontSize: 18, color: emotionMock.status === 'stressed' ? '#d32f2f' : '#388e3c' }}>
          Patient seems {emotionMock.status}
        </Typography>
      </Box>
      {/* Main Layout */}
      <Grid container spacing={0} sx={{ width: '100vw', height: 'calc(100vh - 120px)', m: 0, p: 0 }}>
        {/* Left: Meeting Window */}
        <Grid item sx={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
          <Paper elevation={0} sx={{ width: '90%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 16px rgba(25,118,210,0.07)', border: 'none', m: 0 }}>
            <VideocamIcon sx={{ fontSize: 72, color: '#90caf9', mb: 3 }} />
            <Typography variant="h6" color="#222" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>Meeting Window</Typography>
          </Paper>
        </Grid>
        {/* Right: Conversation with inline suggestions */}
        <Grid item sx={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
          <Paper elevation={0} sx={{ width: '100%', height: '100%', p: 3, overflowY: 'auto', bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 16px rgba(25,118,210,0.07)', border: 'none', m: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, letterSpacing: 0.5, mb: 2, color: '#1976d2' }}>Conversation</Typography>
            <List sx={{ width: '100%' }}>
              {transcriptMock.map((line, idx) => (
                <React.Fragment key={idx}>
                  <ListItem sx={{ mb: 2, borderBottom: '1px solid #f0f0f0', pb: 2, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                    <Chip label={line.speaker} color={line.speaker === 'Doctor' ? 'primary' : 'secondary'} sx={{ mr: 1, fontWeight: 500, fontSize: 15 }} />
                    <ListItemText primary={line.text} secondary={line.name} sx={{ '.MuiListItemText-primary': { fontWeight: 500, fontSize: 17 }, '.MuiListItemText-secondary': { fontSize: 13, color: '#bdbdbd' } }} />
                  </ListItem>
                  {/* Inline AI suggestion after each message if available */}
                  {questions[idx] && (
                    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', bgcolor: '#eef2f6', mt: 1, mb: 2, borderRadius: 2, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)', border: '1px solid #eaeaea', px: 2, py: 2 }}>
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <TextField fullWidth defaultValue={questions[idx].text} variant="outlined" size="small" sx={{ mr: 1, bgcolor: '#fff', borderRadius: 1 }} />
                        <Button variant="contained" color="success" sx={{ mr: 1, textTransform: 'none', boxShadow: 'none', borderRadius: 2 }}>Approve</Button>
                        <Button variant="outlined" color="primary" sx={{ textTransform: 'none', borderRadius: 2 }}>Swap</Button>
                      </Box>
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, ml: 0.5, fontWeight: 400 }}>
                        <strong>AI Suggestion</strong>
                      </Typography>
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      {/* Bottom Bar */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', bgcolor: 'transparent', borderTop: 'none', width: '100%', borderRadius: 0, mb: 0 }}>
        <Button variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 3, boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }} onClick={() => setSummaryOpen(true)}>End Call & Show Summary</Button>
      </Box>
      {/* Session Summary Modal */}
      <Modal open={summaryOpen} onClose={() => setSummaryOpen(false)}>
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.12)', border: '1px solid #eaeaea' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, letterSpacing: 0.5, color: '#1976d2' }}>Session Summary</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1, color: '#222' }}>Key Responses:</Typography>
          <List>
            {transcriptMock.map((line, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={line.text} secondary={line.name} sx={{ '.MuiListItemText-primary': { fontWeight: 500, fontSize: 15 }, '.MuiListItemText-secondary': { fontSize: 12, color: '#bdbdbd' } }} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 2, mb: 1, color: '#222' }}>Questions Asked:</Typography>
          <List>
            {questions.map((q, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={q.text} sx={{ '.MuiListItemText-primary': { fontWeight: 500, fontSize: 15 } }} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" sx={{ mt: 2, textTransform: 'none', fontWeight: 600, borderRadius: 3, boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }} onClick={() => setSummaryOpen(false)}>Close</Button>
        </Paper>
      </Modal>
    </Box>
  );
}
