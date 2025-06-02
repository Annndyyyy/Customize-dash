import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaUtensils, FaGlobe, FaBitcoin } from 'react-icons/fa';

const widgets = [
  {
    key: 'news',
    title: 'News',
    icon: <FaNewspaper size={32} />,
    description: 'Latest headlines and updates',
  },
  {
    key: 'recipe',
    title: 'Recipes',
    icon: <FaUtensils size={32} />,
    description: 'Find and explore recipes',
  },
  {
    key: 'country',
    title: 'Country Info',
    icon: <FaGlobe size={32} />,
    description: 'Explore countries and stats',
  },
  {
    key: 'crypto',
    title: 'Crypto Prices',
    icon: <FaBitcoin size={32} />,
    description: 'Track cryptocurrency prices',
  },
];

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

const DashboardTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin: 0;
`;

const ViewFullDashboardButton = styled.button`
  background: rgba(255,255,255,0.10);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: rgba(255,255,255,0.18);
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  padding: 48px 24px;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #23243a 60%, #3a2d5b 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  color: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  min-height: 220px;
  &:hover {
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
    transform: translateY(-4px) scale(1.03);
  }
`;

const IconWrap = styled.div`
  margin-bottom: 18px;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const Desc = styled.p`
  margin: 0;
  color: #c7d2fe;
  font-size: 1.05rem;
`;

const BentoDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <DashboardHeader>
        <DashboardTitle>Widget Summary</DashboardTitle>
        <ViewFullDashboardButton onClick={() => navigate('/full-dashboard')}>
          View Full Dashboard
        </ViewFullDashboardButton>
      </DashboardHeader>
      <Grid>
        {widgets.map(widget => (
          <Card key={widget.key} onClick={() => navigate(`/widget/${widget.key}`)}>
            <IconWrap>{widget.icon}</IconWrap>
            <Title>{widget.title}</Title>
            <Desc>{widget.description}</Desc>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default BentoDashboard;