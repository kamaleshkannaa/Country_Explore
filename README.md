# Country Explorer

A modern, full-stack web application that lets you explore countries around the world using the REST Countries API.

## Features

- View all countries in an attractive card layout
- Search countries by:
  - Country name
  - Country code (CCA2/CCA3)
  - Capital city
- Filter countries by continent/region
- Click any country to view detailed information including:
  - Flag and basic info
  - Population, area, and geography
  - Languages and currencies
  - Timezones and country codes
  - Link to Google Maps
- Fully responsive design (mobile, tablet, desktop)
- Modern, clean UI with smooth animations

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

**Backend:**
- Node.js + Express
- REST Countries API integration
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

**Option 1 - Run Both Together (Recommended):**
```bash
npm start
```
This runs both the Express backend and Vite frontend concurrently.
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

**Option 2 - Run Separately:**

Terminal 1 - Start the Express Backend:
```bash
npm run server
```

Terminal 2 - Start the Frontend:
```bash
npm run dev
```

The frontend is configured to proxy API requests to the backend automatically.

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
country-explorer/
├── server/
│   └── index.js           # Express backend server
├── src/
│   ├── components/
│   │   ├── CountryCard.tsx      # Country card component
│   │   ├── CountryDetail.tsx    # Detailed country modal
│   │   └── SearchBar.tsx        # Search and filter component
│   ├── services/
│   │   └── api.ts               # API service layer
│   ├── types/
│   │   └── country.ts           # TypeScript interfaces
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── package.json
└── vite.config.ts               # Vite configuration with proxy
```

## API Endpoints

The Express backend provides these endpoints:

- `GET /api/countries` - Get all countries
- `GET /api/countries/name/:name` - Search by country name
- `GET /api/countries/code/:code` - Search by country code
- `GET /api/countries/region/:region` - Get countries by region
- `GET /api/countries/capital/:capital` - Search by capital city

## Usage

1. **View All Countries**: On load, all countries are displayed
2. **Search**:
   - Select search type (Name, Code, or Capital)
   - Enter search term
   - Click "Search" or press Enter
3. **Filter by Region**: Select a region from the dropdown
4. **View Details**: Click any country card to see detailed information
5. **Close Details**: Click the X button to close the detail modal

## Design Features

- Clean, modern interface with blue gradient background
- Card-based layout with hover effects
- Responsive grid (1-4 columns based on screen size)
- Modal overlay for country details
- Loading states with animated spinner
- Error handling with user-friendly messages
- Accessible design with semantic HTML

## REST Countries API

This application uses the free [REST Countries API](https://restcountries.com/) to fetch country data.
