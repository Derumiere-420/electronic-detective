import { call, all, put, take } from "redux-saga/effects";
import { GET_SETUP_DATA, RECEIVE_GET_SETUP_DATA } from "../actions/index";
import {getSetupDataFile} from "../api/Api";
//import * as Api from "../api/Api";

export function* getSetupDataSaga() {
  yield take(GET_SETUP_DATA);
  const publicUrl = process.env.PUBLIC_URL || "";

  const [sheet, characters, locations, questions, weapons, addresses] = yield all([
    call(getSetupDataFile, `${publicUrl}/json/casesheet.json`),
    call(getSetupDataFile, `${publicUrl}/json/characters.json`),
    call(getSetupDataFile, `${publicUrl}/json/locations.json`),
    call(getSetupDataFile, `${publicUrl}/json/questions.json`),
    call(getSetupDataFile, `${publicUrl}/json/weapons.json`),
    call(getSetupDataFile, `${publicUrl}/json/addresses.json`)
  ]);

  yield put({
    type: RECEIVE_GET_SETUP_DATA,
    setupData: { sheet, characters, locations, questions, weapons, addresses }
  });
}
