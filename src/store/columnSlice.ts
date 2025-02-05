import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColumnState = {
  order: string[];
};

const initialState: ColumnState = {
  order: ["id", "organization", "parentOrganization", "decisions", "delegations", "status"],
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumnOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
    },
  },
});

export const { setColumnOrder } = columnSlice.actions;
export default columnSlice.reducer;
