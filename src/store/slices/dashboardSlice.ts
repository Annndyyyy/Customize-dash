import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Widget {
  id: string;
  type: string;
  title: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  config: Record<string, any>;
}

interface DashboardState {
  widgets: Widget[];
  theme: 'light' | 'dark';
  layout: {
    cols: number;
    rowHeight: number;
  };
}

const initialState: DashboardState = {
  widgets: [],
  theme: 'light',
  layout: {
    cols: 12,
    rowHeight: 30,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(widget => widget.id !== action.payload);
    },
    updateWidgetPosition: (state, action: PayloadAction<{ id: string; position: Widget['position'] }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    updateWidgetConfig: (state, action: PayloadAction<{ id: string; config: Record<string, any> }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.config = { ...widget.config, ...action.payload.config };
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    updateLayout: (state, action: PayloadAction<Partial<DashboardState['layout']>>) => {
      state.layout = { ...state.layout, ...action.payload };
    },
  },
});

export const {
  addWidget,
  removeWidget,
  updateWidgetPosition,
  updateWidgetConfig,
  setTheme,
  updateLayout,
} = dashboardSlice.actions;

export default dashboardSlice.reducer; 