import * as action_type from "../actions/actionTypes";

const initialState = {
  clothData: [],
  productIds:[],
  cart:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case action_type.fetchClothData:
      return { ...state, clothData: action.payload };
    case action_type.filterBasedOnClothType:
      return { ...state, clothData: action.payload }; 
    case action_type.filterBasedOnClothSize:
      return { ...state, clothData: action.payload };
    case action_type.filterBasedOnSearchValue:
        return {...state,clothData:action.payload};
    case action_type.storeProductIds:
        return {...state,productIds:action.payload};
    default:
      return state;
  }
};

export default reducer;
