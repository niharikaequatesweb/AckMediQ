import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
dotenv.config();
const app = express();
app.use(express.json());

// Step 1: Redirect user to Zoom OAuth
app.get('/auth/zoom', (req, res) => {
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`;
    res.redirect(zoomAuthUrl);
});

// Step 2: Exchange code for access token
app.get('/auth/zoom/callback', async (req, res) => {
    const { code } = req.query;
    const tokenUrl = 'https://zoom.us/oauth/token';
    const auth = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(tokenUrl, null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.ZOOM_REDIRECT_URI
            },
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        // Save access_token securely (e.g., in DB or session)
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Step 3: Create a Zoom meeting
app.post('/api/create-meeting', async (req, res) => {
    const { access_token, topic, start_time } = req.body;
    try {
        const response = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            {
                topic,
                type: 2, // Scheduled meeting
                start_time, // ISO8601 format
                duration: 30,
                settings: { join_before_host: true }
            },
            {
                headers: { Authorization: `Bearer ${access_token}` }
            }
        );
        res.json(response.data); // Contains join_url for patient and start_url for doctor
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
