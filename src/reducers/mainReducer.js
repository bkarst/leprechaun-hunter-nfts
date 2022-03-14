
const initialState = {
  balance: 0
}

const mainReducer = (state = initialState, action) => {
  // const router = useRouter()
  console.log('action', action);
  switch (action.type) {
    case "GET_BALANCE_FULFILLED": {
      return {...state, balance: action.payload}
      // return {...state, allAssets: action.payload, assets: action.payload, searchLoading: false}
    }

  }
  return state;
};

export default mainReducer;