import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter(widget => widget.id !== action.payload);
    },
    updateWidgetPosition: (state, action) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    updateWidgetConfig: (state, action) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.config = { ...widget.config, ...action.payload.config };
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateLayout: (state, action) => {
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