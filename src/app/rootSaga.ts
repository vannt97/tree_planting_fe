import { all } from "redux-saga/effects";
import warrantySaga from "src/modules/warranty/warrantySaga";

export default function* rootSaga() {
  yield all([warrantySaga()]);
}
