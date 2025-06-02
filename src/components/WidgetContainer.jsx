import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.10);
  padding: 24px;
  min-width: 350px;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.textPrimary};
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${props => props.theme.textSecondary};
  &:hover {
    color: ${props => props.theme.textPrimary};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 420px;
`;

const WidgetContainer = ({ widget, onRemove, onConfigUpdate, children }) => (
  <Container>
    <Header>
      <Title>{widget.title}</Title>
      <Controls>
        <Button onClick={() => onRemove(widget.id)}>×</Button>
      </Controls>
    </Header>
    <Content>{children}</Content>
  </Container>
);

export default WidgetContainer; 