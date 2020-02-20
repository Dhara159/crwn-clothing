import { takeLatest, all, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapShot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

    // PROMISE PATTEN
    // collectionRef.get().then(snapShot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //   dispatch(fetchCollectionsSuccess(collectionsMap));
    // }).catch(({ message }) => dispatch(fetchCollectionsFailure(message)));

    // OBSERVABLE PATTERN (Live updates using subscription)
    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // })

    // FETCH PATTERN (Won't use this as it returns data in nested pattern)
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents')
    //   .then(Response => Response.json())
    //   .then(collections => console.log(collections));
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}