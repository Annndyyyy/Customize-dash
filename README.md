<<<<<<< HEAD
# Customizable-Dashboard-Builder1
=======
# Customizable Dashboard Builder

A dynamic, responsive dashboard web application that allows users to add, configure, and arrange various widgets, simulating real-world data visualization tools.

## Features

- Drag-and-drop widget arrangement
- Resizable widgets
- Multiple widget types:
  - Crypto Info Widget
  - News Aggregator Widget
  - Recipe Finder Widget
  - Book Explorer Widget
  - Country Info Dashboard
  - Movie Database Widget
  - GitHub Profile Viewer
- Responsive design
- Theme customization
- Local state persistence

## Tech Stack

- React with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- React Router for navigation
- React Grid Layout for widget arrangement
- Various public APIs for data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_NEWS_API_KEY=your_news_api_key
   REACT_APP_CRYPTO_API_KEY=your_crypto_api_key
   REACT_APP_MEALDB_API_KEY=1
   REACT_APP_OMDB_API_KEY=your_omdb_api_key
   REACT_APP_GITHUB_API_KEY=your_github_api_key
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/         # Reusable components
├── features/          # Feature-specific components and logic
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components
├── services/         # API services
├── store/            # Redux store configuration
├── styles/           # Global styles
└── utils/            # Utility functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
>>>>>>> 2c4f80e (Initial commit)
