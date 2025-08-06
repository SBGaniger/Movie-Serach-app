# 🎬 Movie Search App

A modern, responsive React.js application for searching movies and building your personal favorites collection using the OMDB API.

![Movie Search App](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Movie+Search+App)

## ✨ Features

### 🔍 Search Functionality
- Search movies by title with instant results
- Clean, intuitive search interface with suggestions
- Real-time search validation and error handling

### 🎭 Movie Information
- Display movie cards with poster, title, year, and type
- Detailed movie information modal with:
  - Plot summary
  - Cast and crew information
  - Ratings (IMDb, Metascore, Rotten Tomatoes)
  - Genre, runtime, release date
  - Awards and box office information

### ❤️ Favorites Management
- Add/remove movies to/from favorites
- Persistent storage using localStorage
- Dedicated favorites section with statistics
- Clear all favorites functionality

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Dark mode toggle with system preference detection
- Smooth animations and transitions
- Mobile-first responsive layout
- Loading indicators and error states
- Accessibility features

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- OMDB API key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Rename `.env` file and add your OMDB API key:
   ```env
   REACT_APP_OMDB_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start searching for your favorite movies!

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
movie-search-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── MovieCard.jsx      # Movie display card
│   │   ├── MovieDetails.jsx   # Modal for detailed info
│   │   └── Favorites.jsx      # Favorites management
│   ├── App.jsx               # Main application component
│   ├── index.js              # Application entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## 🔑 API Configuration

The app uses the OMDB API (The Open Movie Database) to fetch movie data:

- **Base URL**: `http://www.omdbapi.com/`
- **Search Endpoint**: `?apikey=YOUR_KEY&s=SEARCH_TERM`
- **Details Endpoint**: `?apikey=YOUR_KEY&i=IMDB_ID`

### Getting Your API Key
1. Visit [omdbapi.com](http://www.omdbapi.com/apikey.aspx)
2. Choose the free plan (1,000 requests per day)
3. Enter your email and verify
4. Copy your API key to the `.env` file

## 🎯 Usage Tips

### Searching Movies
- Enter any movie title in the search bar
- Results appear as cards with basic information
- Click "Details" to view comprehensive movie information
- Use the heart icon to add/remove from favorites

### Managing Favorites
- Click the "Favorites" tab to view your collection
- See statistics about your favorite movies and series
- Remove individual favorites or clear all at once
- Favorites persist between browser sessions

### Dark Mode
- Toggle between light and dark themes using the moon/sun icon
- Preference is saved and restored on app reload
- Automatic system theme detection on first visit

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **OMDB API** - Movie database and information
- **Local Storage** - Persistent favorites storage

## 📱 Responsive Design

The app is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design Features

- **Modern UI** - Clean, minimalist interface
- **Smooth Animations** - CSS transitions and transforms
- **Accessibility** - ARIA labels and keyboard navigation
- **Error Handling** - Graceful error states and messages
- **Loading States** - Visual feedback during API calls

## 🔮 Future Enhancements

Potential features for future versions:
- User authentication and cloud sync
- Movie recommendations based on favorites
- Advanced filtering and sorting options
- Movie trailers and streaming links
- Social sharing capabilities
- Watchlist functionality

## 🐛 Troubleshooting

### Common Issues

**API Key Error**
- Ensure your API key is correctly set in `.env`
- Verify the key is valid at omdbapi.com
- Check for any trailing spaces or quotes

**No Search Results**
- Try different search terms
- Check internet connection
- Verify API key quota hasn't been exceeded

**Styling Issues**
- Clear browser cache
- Ensure Tailwind CSS is properly installed
- Check for any console errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Support

If you have any questions or need help:
- Check the troubleshooting section above
- Review the OMDB API documentation
- Create an issue in the project repository

---

**Happy movie searching! 🍿** 