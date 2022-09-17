import * as action_types from "./actionTypes";
import jsonData from "../../dummy.json";

export const fetchClothData = () => (dispatch) => {
  const clothData = [...jsonData.hoodie, ...jsonData.tshirt];
  dispatch({ type: action_types.fetchClothData, payload: clothData });
  return clothData;
};

export const filterBasedOnClothType = (clothType) => (dispatch) => {
  let clothData;
  if (clothType === "all") {
    clothData = [...jsonData.hoodie, ...jsonData.tshirt];
  } else {
    clothData = jsonData[`${clothType}`];
  }
  dispatch({ type: action_types.filterBasedOnClothType, payload: clothData });
  return clothData;
};

export const filterBasedOnClothSize =
  (clothSize, stateClothType) => async (dispatch) => {
    let filteredClothData;
    let clothData;
    if (stateClothType === "all") {
      clothData = [...jsonData.hoodie, ...jsonData.tshirt];
    } else {
      clothData = jsonData[`${stateClothType}`];
    }
    if (clothSize === "all") {
      filteredClothData = clothData;
    } else {
      filteredClothData = clothData.filter(
        (element) => element.size === clothSize
      );
    }
    dispatch({
      type: action_types.filterBasedOnClothSize,
      payload: filteredClothData,
    });
    return filteredClothData;
  };

export const filterBasedOnSearchValue =
  (searchValue, stateClothType) => (dispatch) => {
    let clothData;
    if (stateClothType === "all") {
      clothData = [...jsonData.hoodie, ...jsonData.tshirt];
    } else {
      clothData = jsonData[`${stateClothType}`];
    }
    // let pattern = `/^${searchValue}/i`;
    let pattern = new RegExp(`^${searchValue}`, "i");
    console.log(pattern);
    let filterArr = clothData.filter((element) => {
      if (pattern.test(element.name)) {
        return element;
      }
    });
    dispatch({
      type: action_types.filterBasedOnSearchValue,
      payload: filterArr,
    });
    return filterArr;
  };

export const storeProductIds = (ids) => (dispatch) => {
  dispatch({
    type:action_types.storeProductIds,
    payload:ids
  })
  return ids;
};

