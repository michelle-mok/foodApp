import React, {useReducer, useContext} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const initialState = {
    userInfo: null,
    friends: null,
    everyonesCuisines: null,
    budget: null,
    results: null,
};

// const LOAD_USERS = "LOAD_USERS";
const LOAD_BUDGET = 'LOAD_BUDGET';
const LOAD_FRIENDS = 'LOAD_FRIENDS';
const LOAD_EVERYONESCUISINES = 'LOAD_FRIENDCUISINES';
const LOAD_USER = 'LOAD_USER';
const LOAD_RESULTS = 'LOAD_RESULTS';

export function foodAppReducer (state, action) {
    switch (action.type) {
        // case LOAD_USERS:
        //     return {...state, allUsers:action.payload.allUsers};
        case LOAD_BUDGET:
            return {...state, budget: action.payload.budget};
        case LOAD_FRIENDS:
            return {...state, friends: action.payload.friends};
        case LOAD_EVERYONESCUISINES:
            return {...state, everyonesCuisines: action.payload.everyonesCuisines};
        case LOAD_USER: 
            return {...state, userInfo: action.payload.userInfo};
        case LOAD_RESULTS: 
            return {...state, results: action.payload.results};
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

function loadEveryonesCuisines (everyonesCuisinesArray) {
    return {
        type: LOAD_EVERYONESCUISINES,
        payload: {
            everyonesCuisines: everyonesCuisinesArray
        }
    }
}

function loadUser (userInfoObj) {
    return {
        type: LOAD_USER,
        payload: {
            userInfo: userInfoObj,
        }
    }
}

function loadResults (resultObj) {
    return {
        type: LOAD_RESULTS,
        payload: {
            results: resultObj,
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

export function getResults (dispatch, resultArray, history) {
    console.log('result array', resultArray);
    dispatch(loadResults(resultArray));
    history.push('/results');
}

// ######## backend requests #######
const BACKEND_URL = 'http://localhost:3004';

export function getUsers(setUsers, setCheckedState) {
    axios
      .get(BACKEND_URL + '/users')
      .then((response) => {
          setUsers(response.data.users);
          setCheckedState(new Array(response.data.users.length).fill(false));
      })
      .catch((error) => console.log(error));
}

export function getEveryonesCuisines(dispatch, everyoneArray) {
    console.log('everyone array', everyoneArray);
    axios
        .post(BACKEND_URL + '/everyonesCuisines', {
            everyone: everyoneArray
        })
        .then((response) => {
            console.log(response.data);
            dispatch(loadEveryonesCuisines(response.data));
        })
        .catch((error) => console.log(error));
}

export function userLogin (dispatch, username, password, history) {
    console.log (username, password);
    axios
        .post(BACKEND_URL + '/login', {
            username: username,
            password: password,
        })
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                dispatch(loadUser(response.data));
                history.push('/home');
            } else {
                history.push('/');
            }
        })
        .catch((error) => console.log(error));
}

export function getSuggestedPeople (setSuggestedPeople) {
    axios
      .get(BACKEND_URL + '/suggestedPeople')
      .then((response) => {
          console.log(response.data);
          setSuggestedPeople(response.data);
      })
      .catch((error) => console.log(error));
}