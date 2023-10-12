import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Warranty } from "src/models";

export interface WarrantySlice {
  loading: boolean;
}

const initialState: WarrantySlice = {
  loading: false,
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {
    createWarranty(state, action: PayloadAction<Warranty>) {},
  },
});

// Actions
export const warrantyActions = warrantySlice.actions;

// Reducer
const warrantyReducer = warrantySlice.reducer;
export default warrantyReducer;
