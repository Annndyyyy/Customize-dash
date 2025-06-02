import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridLayout from 'react-grid-layout';
import styled from 'styled-components';
import { updateWidgetPosition, removeWidget, updateWidgetConfig } from '../store/slices/dashboardSlice';
import WidgetFactory from '../components/WidgetFactory';
import WidgetToolbar from '../components/WidgetToolbar';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const DashboardContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { widgets, layout } = useSelector(state => state.dashboard);

  const handleLayoutChange = (newLayout) => {
    newLayout.forEach(item => {
      dispatch(updateWidgetPosition({
        id: item.i,
        position: {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        },
      }));
    });
  };

  const handleRemoveWidget = (id) => {
    dispatch(removeWidget(id));
  };

  const handleConfigUpdate = (id, config) => {
    dispatch(updateWidgetConfig({ id, config }));
  };

  return (
    <DashboardContainer>
      <WidgetToolbar />
      <GridLayout
        className="layout"
        layout={widgets.map(widget => ({
          i: widget.id,
          x: widget.position.x,
          y: widget.position.y,
          w: widget.position.w,
          h: widget.position.h,
        }))}
        cols={layout.cols}
        rowHeight={layout.rowHeight}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-header"
        compactType="vertical"
        preventCollision={false}
      >
        {widgets.map(widget => (
          <div key={widget.id}>
            <WidgetFactory
              widget={widget}
              onRemove={handleRemoveWidget}
              onConfigUpdate={handleConfigUpdate}
            />
          </div>
        ))}
      </GridLayout>
    </DashboardContainer>
  );
};

export default DashboardLayout;