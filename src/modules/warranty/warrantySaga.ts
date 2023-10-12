import { PayloadAction } from "@reduxjs/toolkit";
import warrantyApi from "src/api/warrantyApi";
import { Warranty } from "src/models";
import { call, takeLatest } from "redux-saga/effects";
import { warrantyActions } from "./warrantSlice";

function* createWarranty(action: PayloadAction<Warranty>) {
  try {
    const response: any = yield call(
      warrantyApi.registerWarranty,
      action.payload
    );
  } catch (error) {}
}

export default function* studentSaga() {
  yield takeLatest(warrantyActions.createWarranty.type, createWarranty);
}
