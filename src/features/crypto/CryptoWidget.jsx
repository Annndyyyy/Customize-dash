import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WidgetContainer from '../../components/WidgetContainer';
import BackToDashboard from '../../components/BackToDashboard';

const Select = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  outline: 1.5px solid rgba(255,255,255,0.18);
  transition: box-shadow 0.2s, outline 0.2s;
  &:focus {
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
    outline: 2px solid #a5b4fc;
  }
`;

const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CryptoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.10) 60%, rgba(120,120,255,0.10) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.13);
  border: none;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px rgba(120, 120, 255, 0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;

const PriceChange = styled.span`
  color: ${props => props.isPositive ? '#4ade80' : '#f87171'};
  font-weight: 600;
`;

const CryptoWidget = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: 'usd',
              ids: selectedCrypto,
              order: 'market_cap_desc',
              per_page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [selectedCrypto]);

  const handleCryptoChange = (event) => {
    const newCrypto = event.target.value;
    setSelectedCrypto(newCrypto);
  };

  return (
    <WidgetContainer>
      <BackToDashboard />
      <Select value={selectedCrypto} onChange={handleCryptoChange}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
      </Select>
      <CryptoList>
        {cryptoData.map(crypto => (
          <CryptoItem key={crypto.id}>
            <div>
              <strong>{crypto.name}</strong>
              <div>${crypto.current_price.toLocaleString()}</div>
            </div>
            <PriceChange isPositive={crypto.price_change_percentage_24h >= 0}>
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </PriceChange>
          </CryptoItem>
        ))}
      </CryptoList>
    </WidgetContainer>
  );
};

export default CryptoWidget; 