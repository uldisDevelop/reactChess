import { ajax } from '../../utils/index'
import produce from 'immer'

//types
export const CLEAR = 'items/clear'

export const FETCH_ITEMS_REQUEST = 'items/fetchItemsRequest'
export const FETCH_ITEMS_SUCCESS = 'items/fetchItemsSuccess'
export const FETCH_ITEMS_ERROR = 'items/fetchItemsError'

export const FETCH_ITEM_REQUEST = 'items/fetchItemRequest'
export const FETCH_ITEM_SUCCESS = 'items/fetchItemSuccess'
export const FETCH_ITEM_ERROR = 'items/fetchItemError'

export const CLEAR_DETAILS = 'items/clearDetails'


//inital state
const initialState = {
  items: [],
  loading: false,

  item: null,
  itemLoading: false
}

//reducer
export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {

    case FETCH_ITEMS_REQUEST:
      draft.loading = true;
      break;
    case FETCH_ITEMS_SUCCESS:
      draft.loading = false;
      draft.items = action.items;
      break;
    case FETCH_ITEMS_ERROR:
      draft.loading = false;
      draft.items = [];
      break;

    case FETCH_ITEM_REQUEST:
      draft.itemLoading = true;
      break;
    case FETCH_ITEM_SUCCESS:
      draft.itemLoading = false;
      draft.item = action.item;
      break;
    case FETCH_ITEM_ERROR:
      draft.itemLoading = false;
      draft.item = null;
      break;

    case CLEAR:
      draft.items = [];
      draft.loading = false;
      draft.item = null;
      draft.itemLoading = false;
      break;

    case CLEAR_DETAILS:
      draft.item = null;
      draft.itemLoading = false;
      break;


    default:
      return draft;
  }
});

//actions
export const fetchItemsRequest = () => ({ type: FETCH_ITEMS_REQUEST })
export const fetchItemsSuccess = ({ items }) => ({ type: FETCH_ITEMS_SUCCESS, items })
export const fetchItemsError = () => ({ type: FETCH_ITEMS_ERROR })

export const fetchItemRequest = () => ({ type: FETCH_ITEM_REQUEST })
export const fetchItemSuccess = ({ item }) => ({ type: FETCH_ITEM_SUCCESS, item })
export const fetchItemError = () => ({ type: FETCH_ITEM_ERROR })

export const clear = () => ({ type: CLEAR })
export const clearDetails = () => ({ type: CLEAR_DETAILS })

export const fetchItems = (page, pageSize, onLoad) => {
  return (dispatch) => {

    dispatch(fetchItemsRequest())

    ajax({
      url: `http://localhost:8000/items`,
      data: { pageSize, page },      
      key: 'fetchItems',
      onSuccess(data) {
        const [items, info] = data;
        const { itemCount } = info[0];

        dispatch(fetchItemsSuccess({ items }));
        onLoad(itemCount);
      },
      onError() {
        dispatch(fetchItemsError())
      }
    });

  }
}

export const fetchItem = (id) => {
  return async (dispatch) => {

    dispatch(fetchItemRequest())

    ajax({
      url: `http://localhost:8000/items/${id}`,      
      key: 'fetchItem',
      onSuccess(data) {
        const [items] = data;
        dispatch(fetchItemSuccess({ item: items[0] }))
      },
      onError() {
        dispatch(fetchItemError())
      }
    });
    
  }
}




