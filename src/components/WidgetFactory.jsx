import React from 'react';
import CryptoWidget from '../features/crypto/CryptoWidget';
import CountryWidget from '../features/country/CountryWidget';
import RecipeWidget from '../features/recipe/RecipeWidget';
import NewsWidget from '../features/news/NewsWidget';

const WidgetFactory = ({ widget, onRemove, onConfigUpdate }) => {
  switch (widget.type) {
    case 'crypto':
      return <CryptoWidget widget={widget} onRemove={onRemove} onConfigUpdate={onConfigUpdate} />;
    case 'country':
      return <CountryWidget widget={widget} onRemove={onRemove} onConfigUpdate={onConfigUpdate} />;
    case 'recipe':
      return <RecipeWidget widget={widget} onRemove={onRemove} onConfigUpdate={onConfigUpdate} />;
    case 'news':
      return <NewsWidget widget={widget} onRemove={onRemove} onConfigUpdate={onConfigUpdate} />;
    default:
      return <div>Unknown widget type: {widget.type}</div>;
  }
};

export default WidgetFactory; 