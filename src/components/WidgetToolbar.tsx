import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget } from '../store/slices/dashboardSlice';
import { RootState } from '../store';

const Toolbar = styled.div`
  background: #fff;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.08);
  border-radius: 16px;
  padding: 24px 32px;
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #1e40af;
    transform: translateY(-2px) scale(1.04);
  }
`;

const WidgetToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);

  const handleAddWidget = (type: string) => {
    const defaultW = 4;
    const defaultH = 4;
    
    const maxY = widgets.length > 0 ? Math.max(...widgets.map(w => w.position.y + w.position.h)) : 0;
    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Widget`,
      position: {
        x: 0,
        y: maxY, 
        w: defaultW,
        h: defaultH,
      },
      config: {},
    };
    dispatch(addWidget(newWidget));
  };

  return (
    <Toolbar>
      <Button onClick={() => handleAddWidget('crypto')}>
        Add Crypto Widget
      </Button>
      <Button onClick={() => handleAddWidget('country')}>
        Add Country Widget
      </Button>
      <Button onClick={() => handleAddWidget('recipe')}>
        Add Recipe Widget
      </Button>
      <Button onClick={() => handleAddWidget('news')}>
        Add News Widget
      </Button>
      {}
    </Toolbar>
  );
};

export default WidgetToolbar; 