import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WidgetContainer from '../../components/WidgetContainer';
import BackToDashboard from '../../components/BackToDashboard';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const WidgetTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  margin-bottom: 14px;
  font-size: 1.08rem;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  outline: 1.5px solid rgba(255,255,255,0.18);
  box-sizing: border-box;
  transition: box-shadow 0.2s, outline 0.2s;
  &:focus {
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
    outline: 2px solid #a5b4fc;
  }
  &::placeholder {
    color: #cccccc; /* Adjust color as needed */
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  box-sizing: border-box;
  outline: 1.5px solid rgba(255,255,255,0.18);
  transition: box-shadow 0.2s, outline 0.2s;
  &:focus {
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
    outline: 2px solid #a5b4fc;
  }
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const NewsCard = styled.a`
  display: flex;
  gap: 18px;
  background: linear-gradient(135deg, rgba(255,255,255,0.10) 60%, rgba(120,120,255,0.10) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.13);
  padding: 16px 18px;
  text-decoration: none;
  color: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
  align-items: flex-start;
  max-width: 100%;
  box-sizing: border-box;
  border: none;
  &:hover {
    box-shadow: 0 8px 32px rgba(120, 120, 255, 0.18);
    background: linear-gradient(135deg, rgba(120,120,255,0.18) 60%, rgba(255,255,255,0.18) 100%);
    transform: translateY(-4px) scale(1.03);
  }
`;

const NewsImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 14px;
  background: #e0e7ef;
  flex-shrink: 0;
  max-width: 100%;
`;

const NewsInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
`;

const NewsMeta = styled.div`
  font-size: 0.85rem;
  color: #c7d2fe;
  margin-bottom: 6px;
`;

const NewsDesc = styled.p`
  margin: 0;
  color: #e0e7ef;
  font-size: 0.97rem;
  line-height: 1.4;
`;

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'in', name: 'India' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'au', name: 'Australia' },
  { code: 'ca', name: 'Canada' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'jp', name: 'Japan' },
  { code: 'ru', name: 'Russia' },
  { code: 'cn', name: 'China' },
];

const NewsWidget = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('us');
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = searchTerm
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&language=en&apiKey=${apiKey}`
          : `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [searchTerm, country, apiKey]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  return (
    <WidgetContainer>
      <BackToDashboard />
      <WidgetHeader>
        <WidgetTitle>News</WidgetTitle>
      </WidgetHeader>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FilterSelect value={country} onChange={handleCountryChange}>
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </FilterSelect>
      </SearchContainer>
      <NewsList>
        {loading ? (
          <div>Loading...</div>
        ) : articles.length === 0 ? (
          <div>No news found.</div>
        ) : (
          articles.map(article => (
            <NewsCard href={article.url} target="_blank" rel="noopener noreferrer" key={article.url}>
              {article.urlToImage && <NewsImage src={article.urlToImage} alt={article.title} />}
              <NewsInfo>
                <NewsTitle>{article.title}</NewsTitle>
                <NewsMeta>
                  {article.source.name} &middot; {new Date(article.publishedAt).toLocaleDateString()}
                </NewsMeta>
                <NewsDesc>{article.description}</NewsDesc>
              </NewsInfo>
            </NewsCard>
          ))
        )}
      </NewsList>
    </WidgetContainer>
  );
};

export default NewsWidget; 