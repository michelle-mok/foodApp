import React, {useReducer, useContext} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const initialState = {
    userInfo: null,
    userCuisines: null,
    friends: null,
    friendCuisines: null,
    budget: null,

};

// const LOAD_USERS = "LOAD_USERS";
const LOAD_BUDGET = 'LOAD_BUDGET';
const LOAD_FRIENDS = 'LOAD_FRIENDS';
const LOAD_FRIENDCUISINES = 'LOAD_FRIENDCUISINES';

export function foodAppReducer (state, action) {
    switch (action.type) {
        // case LOAD_USERS:
        //     return {...state, allUsers:action.payload.allUsers};
        case LOAD_BUDGET:
            return {...state, budget: action.payload.budget};
        case LOAD_FRIENDS:
            return {...state, friends: action.payload.friends};
        case LOAD_FRIENDCUISINES:
            return {...state, friendCuisines: action.payload.friendCuisines};
        default:
            return state;
    }
}

// ######## action creators #########
// function loadUsers (usersObj) {
//     return {
//         type:LOAD_USERS,
//         payload: {
//             allUsers: usersObj
//         }
//     }
// }

function loadBudget (integer) {
    return {
        type: LOAD_BUDGET,
        payload: {
            budget: integer
        }
    }
}

function loadFriends (friendArray) {
    return {
        type: LOAD_FRIENDS,
        payload: {
            friends: friendArray
        }
    }
}

function loadFriendCuisines (friendCuisinesArray) {
    return {
        type: LOAD_FRIENDCUISINES,
        payload: {
            friendCuisines: friendCuisinesArray
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

// ############# 
export function getBudget (dispatch, integer) {
    console.log('price level', integer);
    dispatch (loadBudget(integer));
}

export function getFriends (dispatch, friendArray) {
    console.log('friend array', friendArray);
    dispatch (loadFriends(friendArray));
}

// ######## backend requests #######
const BACKEND_URL = 'http://localhost:3004';

export function getUsers(setUsers, setCheckedState) {
    axios
      .get(BACKEND_URL + '/users')
      .then((response) => {
          console.log('users object', response.data);
          setUsers(response.data.users);
           setCheckedState(new Array(response.data.users.length).fill(false));
      })
      .catch((error) => console.log(error));
}

export function getFriendCuisines(dispatch, friendArray) {
    console.log('friend array', friendArray);
    axios
        .post(BACKEND_URL + '/friendCuisines', {
            friends: friendArray
        })
        .then((response) => {
            console.log(response.data);
            dispatch(loadFriendCuisines(response.data));
        })
        .catch((error) => console.log(error));
}
