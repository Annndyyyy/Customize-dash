import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.10);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: rgba(255,255,255,0.18);
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
  }
`;

const BackToDashboard = () => {
  const navigate = useNavigate();
  return (
    <BackButton onClick={() => navigate('/')}
      aria-label="Back to Dashboard">
      <FaArrowLeft />
      Back to Dashboard
    </BackButton>
  );
};

export default BackToDashboard; 