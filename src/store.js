import React, {useReducer, useContext} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const initialState = {
    userInfo: null,
    userCuisines: null,
    friends: null,
    everyonesCuisines: null,
    budget: null,
    results: null,
    chatroom: null,
    checkedstate: null,
};

// const LOAD_USERS = "LOAD_USERS";
const LOAD_BUDGET = 'LOAD_BUDGET';
const LOAD_FRIENDS = 'LOAD_FRIENDS';
const LOAD_EVERYONESCUISINES = 'LOAD_FRIENDCUISINES';
const LOAD_USER = 'LOAD_USER';
const LOAD_USERCUISINES = 'LOAD_USERCUISINES';
const LOAD_RESULTS = 'LOAD_RESULTS';
const LOAD_CHATROOM = 'LOAD_CHATROOM';
const LOAD_CHECKEDSTATE = 'LOAD_CHECKEDSTATE';

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
        case LOAD_USERCUISINES: 
            return {...state, userCuisines: action.payload.userCuisines};
        case LOAD_RESULTS: 
            return {...state, results: action.payload.results};
        case LOAD_CHATROOM:
            return {...state, chatroom: action.payload.chatroom};
        case LOAD_CHECKEDSTATE:
            return {...state, checkedstate: action.payload.checkedState};
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

function loadUserCuisines (userCuisineArray) {
    return {
        type: LOAD_USERCUISINES,
        payload: {
            userCuisines: userCuisineArray,
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

function loadChatRoom (int) {
    return {
        type: LOAD_CHATROOM,
        payload: {
            chatroom: int,
        }
    }
}

function loadCheckedState (array) {
    return {
        type: LOAD_CHECKEDSTATE,
        payload: {
            checkedState: array,
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

export function getChatRoomId (dispatch, id, history) {
    console.log('chat room id', id);
    dispatch(loadChatRoom(id));
    history.push('/chat');
}

export function getCheckedState (dispatch, checkedStateArray) {
    console.log('checked state', checkedStateArray);
    dispatch(loadCheckedState(checkedStateArray));
}

// ######## backend requests #######
const BACKEND_URL = 'http://localhost:3004';

export function getUsers(setUsers) {
    axios
      .get(BACKEND_URL + '/users')
      .then((response) => {
          setUsers(response.data.users);
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
                dispatch(loadUser(response.data.userInfo));
                dispatch(loadUserCuisines(response.data.userCuisines));
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

export function setupChatRoom (idArray, nameString, history, dispatch) {
    axios
      .post(BACKEND_URL + '/setupChatRoom', 
      {friendIds: idArray, name: nameString})
      .then((response) => {
          console.log(response.data[0]);
          getChatRoomId(dispatch, response.data[0].id, history)
      })
      .catch((error) => console.log(error));
}

export function getChatRoom (id, setChatRoom, setMessages) {
    axios
        .post(BACKEND_URL + '/getChatRoom', {
            id: id,
        })
        .then((response) => {
            console.log(response.data);
            setChatRoom(response.data.chatroomDetails);
            setMessages(response.data.messageArray);
        })
        .catch((error) => console.log(error));
    }


export function loadRooms (setRooms) {
    axios
        .get(BACKEND_URL + '/getRooms')
        .then((response) => {
            console.log(response.data);
            setRooms(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

export function loadCuisines (setCuisines, setCheckedState) {
    axios
        .get(BACKEND_URL + '/cuisines')
        .then((response) => {
            console.log(response.data);
            setCuisines(response.data);
            setCheckedState(new Array(response.data.length).fill(false));
        })
        .catch((error) => console.log(error));
} 

export function newUser (dispatch, history, firstname, lastname, username, email, password, image, userCuisineArray) {
    axios
        .post(BACKEND_URL + '/userInfo', {
            firstName: firstname,
            lastName: lastname,
            username: username,
            email: email,
            password: password,
            profilePic: image,
            cuisines: userCuisineArray
        })
        .then((response) => {
            console.log(response.data);
            dispatch(loadUser(response.data.userInfo));
            dispatch(loadUserCuisines(response.data.userCuisines));
            history.push('/home');
        })
        .catch((error) => console.log(error))
}

export function updateUser (dispatch, firstname, lastname, username, email, image, userCuisineArray) {
    axios
        .put(BACKEND_URL + '/updateUserInfo', {
            firstName: firstname,
            lastName: lastname,
            username: username,
            email: email,
            profilePic: image,
            cuisines: userCuisineArray
        })
        .then((response) => {
            console.log(response.data);
            dispatch(loadUser(response.data.update[1][0]));
            dispatch(loadUserCuisines(response.data.updatedCuisines[1]));
        })
        .catch((error) => console.log(error))
}

export function getEditPageCuisines (setCheckedState, setCuisines, userCuisines) {
    console.log('user cuisines', userCuisines);
    const cuisineIds = [];
    userCuisines.forEach((cuisine) => {
        cuisineIds.push(cuisine.id);
    });

    axios
        .get(BACKEND_URL + '/cuisines')
        .then((response) => {
            console.log(response.data);
            setCuisines(response.data);
            const cuisineState = new Array(response.data.length).fill(false);
            console.log('cuisine state', cuisineState);
            const updatedCuisineState = cuisineState.map((cuisine, index) => cuisineIds.includes(index + 1) ? !cuisine : cuisine);
            console.log('updated cuisine state', updatedCuisineState);
            setCheckedState(updatedCuisineState);
        })
        .catch((error) => console.log(error));
}

export function uploadPhoto (formData, setImage) {
    console.log('inside upload photo');
    axios
        .post(BACKEND_URL + '/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
            console.log(response.data);
            setImage(response.data);
        })
        .catch ((error) =>  {
            console.log(error);
        })
}

export function getPhoto (image) {
    console.log('image path')
}