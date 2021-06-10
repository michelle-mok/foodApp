import React, {useReducer, useContext} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const initialState = {
    allUsers: null,
};

const LOAD_USERS = "LOAD_USERS";

export function foodAppReducer (state, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, allUsers:action.payload.allUsers};
        default:
            return state;
    }
}

// ######## action creators #########
function loadUsers (usersObj) {
    return {
        type:LOAD_USERS,
        payload: {
            allUsers: usersObj
        }
    }
}

// ######### Provider ########
export const foodAppContext = React.createContext(null);
const { Provider } =foodAppContext;

export function FoodAppProvider ({ children }) {
    const [store, dispatch] = useReducer(foodAppReducer, initialState);

    return <Provider value={{ store, dispatch }}>{children}</Provider>
}

// ######## backend requests #######
const BACKEND_URL = 'http://localhost:3004';

export function getUsers(dispatch) {
    axios
      .get(BACKEND_URL + '/users')
      .then((response) => {
          console.log('users object', response.data);
          dispatch(loadUsers(response.data.users));
      })
}