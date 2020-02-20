import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    // PROMISE PATTEN
    collectionRef.get().then(snapShot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(({ message }) => dispatch(fetchCollectionsFailure(message)));

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

  };
};

export const updateCollections = (collections) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collections
});