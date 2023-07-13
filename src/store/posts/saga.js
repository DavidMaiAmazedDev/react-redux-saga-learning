import { takeLatest, takeEvery, put, putResolve, call } from "redux-saga/effects";

import { GET_POSTS, GET_POST_DETAILS, GET_POST_DETAILS_SUCCESS } from "./actionTypes";

import {
  getPostsSuccess,
  getPostsFail,
  getPostDetailsSuccess,
  getPostDetailsFail,
} from "./actions";

import { getPosts, getPostDetails } from "../../helpers/backend_helper";

function* onGetPosts() {
  try {
    const response = yield call(getPosts);
    console.log(response)
    yield putResolve(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* onGetPostDetails({ payload: id }) {
  try {
    const response = yield call(getPostDetails, id);
    yield put(getPostDetailsSuccess(response));
  } catch (error) {
    yield put(getPostDetailsFail(error.response));
  }
}

function* CartSaga() {
  // eslint-disable-next-line no-undef
  yield takeEvery(GET_POSTS, onGetPosts);
  yield takeLatest(GET_POST_DETAILS, onGetPostDetails);
}

export default CartSaga;
