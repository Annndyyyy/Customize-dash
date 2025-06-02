import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { lightTheme } from './styles/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BentoDashboard from './pages/BentoDashboard';
import FullDashboardPage from './pages/FullDashboardPage';
import NewsWidget from './features/news/NewsWidget';
import RecipeWidget from './features/recipe/RecipeWidget';
import CountryWidget from './features/country/CountryWidget';
import CryptoWidget from './features/crypto/CryptoWidget';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<BentoDashboard />} />
            <Route path="/full-dashboard" element={<FullDashboardPage />} />
            <Route path="/widget/news" element={<NewsWidget />} />
            <Route path="/widget/recipe" element={<RecipeWidget />} />
            <Route path="/widget/country" element={<CountryWidget />} />
            <Route path="/widget/crypto" element={<CryptoWidget />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
