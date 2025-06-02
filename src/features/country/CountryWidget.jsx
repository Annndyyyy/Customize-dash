import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WidgetContainer from '../../components/WidgetContainer';
import BackToDashboard from '../../components/BackToDashboard';

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

const CountryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
`;

const CountryCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.10) 60%, rgba(120,120,255,0.10) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.13);
  padding: 18px 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  border: none;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px rgba(120, 120, 255, 0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;

const Flag = styled.img`
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 10px;
`;

const CountryName = styled.h4`
  margin: 0 0 6px 0;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
`;

const CountryDetail = styled.p`
  margin: 2px 0;
  font-size: 0.97rem;
  color: #c7d2fe;
`;

const CountryWidget = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data = response.data;
        setCountries(data);
        setFilteredCountries(data);
        const uniqueRegions = Array.from(new Set(data.map(country => country.region))).filter(region => typeof region === 'string');
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchLower) ||
        country.name.official.toLowerCase().includes(searchLower)
      );
    }
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <WidgetContainer>
      <BackToDashboard />
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FilterSelect value={selectedRegion} onChange={handleRegionChange}>
          <option value="all">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </FilterSelect>
      </SearchContainer>
      <CountryList>
        {filteredCountries.map(country => (
          <CountryCard key={country.name.common}>
            <Flag src={country.flags.png} alt={country.flags.alt} />
            <div>
              <CountryName>{country.name.common}</CountryName>
              <CountryDetail>Capital: {country.capital?.[0] || 'N/A'}</CountryDetail>
              <CountryDetail>Population: {country.population.toLocaleString()}</CountryDetail>
              <CountryDetail>Region: {country.region}</CountryDetail>
            </div>
          </CountryCard>
        ))}
      </CountryList>
    </WidgetContainer>
  );
};

export default CountryWidget; 