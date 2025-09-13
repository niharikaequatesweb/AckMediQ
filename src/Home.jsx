
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    MenuItem,
    IconButton,
    Divider,
    Paper,
    Link
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TranslateIcon from '@mui/icons-material/Translate';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const doctors = ["Dr. Sharma", "Dr. Patel", "Dr. Singh"];

export default function Home({ onStart }) {
    const [selectedDoctor, setSelectedDoctor] = React.useState(doctors[0]);
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    return (
        <Box sx={{ bgcolor: "#e0eafc", minHeight: "100vh", width: '100vw', overflowX: 'hidden' }}>
            {/* Navbar */}
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <MedicalServicesIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        MediAssist AI
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Book</Button>
                    <Button color="inherit">Join</Button>
                    <Button color="inherit">Reports</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ width: '100vw', pt: 8, pb: 4 }}>
                <Grid container spacing={4} alignItems="center" sx={{ width: '100vw', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h2" fontWeight={700} color="primary" gutterBottom sx={{ textAlign: 'center' }}>
                        Smarter Doctor–Patient Consultations with AI Assistance
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                        Video consults, live transcription, and AI-powered medical guidance in one place.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" size="large" startIcon={<EventAvailableIcon />} sx={{ fontWeight: 600 }} onClick={() => setShowForm(true)}>
                            Book Appointment
                        </Button>
                        <Button variant="outlined" size="large" startIcon={<VideoCallIcon />} sx={{ fontWeight: 600 }} onClick={onStart}>
                            Join Video Call
                        </Button>
                    </Box>
                    {showForm && (
                        <Box sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            bgcolor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        }}>
                            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: "rgba(255,255,255,0.95)", width: 600, maxWidth: '90vw', mx: 'auto', position: 'relative' }}>
                                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setShowForm(false)}>
                                    <span style={{ fontSize: 24, fontWeight: 'bold' }}>&times;</span>
                                </IconButton>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Book a Consultation</Typography>
                                <TextField label="Patient Name" fullWidth sx={{ mb: 2 }} />
                                <TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} />
                                <TextField label="Contact Number" type="tel" fullWidth sx={{ mb: 2 }} />
                                <TextField
                                    select
                                    label="Symptoms"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    defaultValue="Minecraft addiction"
                                >
                                    <MenuItem value="Minecraft addiction">Minecraft addiction</MenuItem>
                                    <MenuItem value="Cough">Cough</MenuItem>
                                    <MenuItem value="Fever">Fever</MenuItem>
                                    <MenuItem value="Headache">Headache</MenuItem>
                                    <MenuItem value="Diabetes">Diabetes</MenuItem>
                                    <MenuItem value="High BP">High BP</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    select
                                    label="Choose Doctor"
                                    value={selectedDoctor}
                                    onChange={e => setSelectedDoctor(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {doctors.map(doc => (
                                        <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                                    ))}
                                </TextField>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={date}
                                        onChange={newValue => setDate(newValue)}
                                        sx={{ mb: 2, width: '100%' }}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                    <TimePicker
                                        label="Time"
                                        value={time}
                                        onChange={newValue => setTime(newValue)}
                                        sx={{ mb: 2, width: '100%' }}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </LocalizationProvider>
                                <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} fullWidth sx={{ fontWeight: 600 }}>
                                    Confirm Booking
                                </Button>
                            </Paper>
                        </Box>
                    )}
                </Grid>
            </Box>

            {/* Steps Section */}
            <Box sx={{ width: '100vw', py: 6 }}>
                <Typography variant="h4" align="center" fontWeight={700} gutterBottom>How It Works</Typography>
                <Grid container spacing={4} justifyContent="center" sx={{ width: '100vw', margin: 0 }}>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: "center" }}>
                            <EventAvailableIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                            <Typography fontWeight={600}>Book a call</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: "center" }}>
                            <VideoCallIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                            <Typography fontWeight={600}>Join secure video consultation</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: "center" }}>
                            <TranslateIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                            <Typography fontWeight={600}>Live transcript & AI guidance</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: "center" }}>
                            <SecurityIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                            <Typography fontWeight={600}>Get your summary instantly</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Features Section */}
            <Box sx={{ width: '100vw', py: 6 }}>
                <Typography variant="h4" align="center" fontWeight={700} gutterBottom>Features</Typography>
                <Grid container spacing={4} justifyContent="center" sx={{ width: '100vw', margin: 0 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <TranslateIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography fontWeight={600}>Real-time speech-to-text</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <MedicalServicesIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography fontWeight={600}>AI-suggested next questions</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <TranslateIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography fontWeight={600}>Bilingual patient summary</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography fontWeight={600}>Secure video call recording</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: "#1976d2", color: "#fff", py: 3, mt: 6, width: '100vw' }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '100vw', px: 4 }}>
                    <Box>
                        <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>Privacy Policy</Link>
                        <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>Terms</Link>
                        <Link href="#" color="inherit" underline="hover">Contact Us</Link>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Built at Hackathon 2025 🚀
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
