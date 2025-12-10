import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';

app.get('/api/countries', async (req, res) => {
  try {
    const response = await fetch(`${REST_COUNTRIES_API}/all`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/api/countries/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await fetch(`${REST_COUNTRIES_API}/name/${name}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error searching countries:', error);
    res.status(404).json({ error: 'No countries found' });
  }
});

app.get('/api/countries/code/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const response = await fetch(`${REST_COUNTRIES_API}/alpha/${code}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching country by code:', error);
    res.status(404).json({ error: 'Country not found' });
  }
});

app.get('/api/countries/region/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const response = await fetch(`${REST_COUNTRIES_API}/region/${region}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    res.status(404).json({ error: 'No countries found in this region' });
  }
});

app.get('/api/countries/capital/:capital', async (req, res) => {
  try {
    const { capital } = req.params;
    const response = await fetch(`${REST_COUNTRIES_API}/capital/${capital}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries by capital:', error);
    res.status(404).json({ error: 'No countries found with this capital' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
