import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(135deg, #23243a 60%, #3a2d5b 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 260px;
  min-height: 180px;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
  }
`;

interface WidgetContainerProps {
  children: React.ReactNode;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

export default WidgetContainer;
