import { createStore } from 'redux';
import shortid from 'shortid';
import strContain from '../utils/strContain';
import initialState from './initialState';

//selectors
export const getFilteredCards = ({cards, searchString}, columnId) => cards
  .filter(card => card.columnId === columnId && strContain(card.title, searchString));
export const getAllColumns = (state => state.columns);
export const getListById = ({ lists }, listId) => lists.find(list => list.id === listId);
export const getColumnsByList = ({columns}, listId) => columns.filter(column => column.listId === listId);
export const getAllLists = (state => state.lists);

// action creators
export const addColumn = payload => ({ type: 'ADD_COLUMN', payload });
export const addCard = payload => ({ type: 'ADD_CARD', payload });
export const filter = payload => ({ type: 'FILTER', payload });
export const addList = payload => ({ type: 'ADD_LIST', payload });

const listsReducer = (statePart = [], action) => {
  switch(action.type) {
    case 'ADD_LIST':
      return [...statePart, { ...action.payload, id: shortid() }];
    default:
      return statePart;
  }
}

const columnsReducer = (statePart = [], action) => {
  switch(action.type) {
    case 'ADD_COLUMN':
      return [...statePart, { ...action.payload, id: shortid() }];
    default:
      return statePart;
  }
}

const cardsReducer = (statePart = [], action) => {
  switch(action.type) {
    case 'ADD_CARD':
      return [...statePart, { ...action.payload, id: shortid() }];
    case 'TOGGLE_CARD_FAVORITE':
      return statePart.map(card => (card.id === action.payload) ? { ...card, isFavorite: !card.isFavorite } : card);
    default:
      return statePart;
  }
}

const searchStringReducer = (statePart = '', action) => {
  switch(action.type) {
    case 'UPDATE_SEARCHSTRING':
      return action.payload
    default:
      return statePart;
  }
}

const reducer = (state, action) => {

    const newState = {
      lists: listsReducer(state.lists, action),
      columns: columnsReducer(state.columns, action),
      cards: cardsReducer(state.cards, action),
      searchString: searchStringReducer(state.searchString, action)
    };
  
    return newState;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;