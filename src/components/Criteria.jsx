import React, { useEffect, useState, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FaceIcon from '@material-ui/icons/Face';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { makeStyles } from "@material-ui/core/styles";
import './Criteria.css';
import "@reach/combobox/styles.css";
import { Link } from 'react-router-dom';
import { getUsers, getBudget, getEveryonesCuisines, foodAppContext, getFriends, getOneUser } from '../store.js';

const useStyles = makeStyles({
    inputRoot: {
        boxShadow: 'inset 8px 8px 8px #cbced1, inset 8px 8px 8px #fff',
        borderRadius: 25,
        border: 'none',
        color: '#555',
        outline: 'none',
        outlineWidth: 0,
    },
});

const budget = [
    { id: 1, label: 'inexpensive' },
    { id: 2, label: 'middle of the range' },
    { id: 3, label: 'expensive' },
    { id: 4, label: 'top of the range' },
]

function Criteria() {
    const { store, dispatch } = useContext(foodAppContext);
    const [users, setUsers] = useState([]);
    const [budgetOption, setBudgetOption] = useState();
    const [everyonesIdsArray, setEveryonesIdsArray] = useState([]);
    const classes = useStyles();

    const { userInfo } = store
    console.log('userInfo', userInfo);

    useEffect(() => {
        if (!userInfo) {
            getOneUser(dispatch);
        }
        getUsers(setUsers);
    }, []);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const style = {
        width: 350,
        marginLeft: 5,
        marginTop: 40,
    }

    const handleCheck = (e) => {
        console.log(e.target.checked);
        console.log(e.target.value);

        if (e.target.checked) {
            setEveryonesIdsArray([...everyonesIdsArray, Number(e.target.value)]);
        } else {
            setEveryonesIdsArray(everyonesIdsArray.filter((friend) => friend !== Number(e.target.value)));
        }
    }

    const handleSubmit = () => {
        getBudget(dispatch, budgetOption);
        console.log(everyonesIdsArray);

        const friendInfoArray = [];
        everyonesIdsArray.forEach((idNum) => {
            const friendIndex = users.findIndex((user) => user.id === idNum);
            console.log(friendIndex);
            friendInfoArray.push({
                id: idNum,
                username: users[friendIndex].username,
            })
        })
        console.log('friend info', friendInfoArray);
        everyonesIdsArray.push(userInfo.id);
        if (everyonesIdsArray.length > 1) {
            getFriends(dispatch, friendInfoArray);
        }
        getEveryonesCuisines(dispatch, everyonesIdsArray);

    }
    console.log(budgetOption);
    // console.log('users', users);
    // console.log('checked state', checkedState);
    return (
        <div className="criteria">
            <div className="page-header">
                {userInfo && (
                    <h2>Hello {userInfo.firstName} !</h2>
                )}
            </div>
            <div className="criteria-header">
                <div className="criteria-header-icon">
                    <MonetizationOnOutlinedIcon />
                </div>
                Choose your price level
            </div>
            <div className="select-budget">
                <Autocomplete
                    id="budget-select"
                    style={style}
                    options={budget}
                    classes={{
                        inputRoot: classes.inputRoot,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                        setBudgetOption(newValue.id);
                    }}
                    renderOption={(option) => (
                        <React.Fragment>
                            {option.id}. {option.label}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            value={params.id}
                            placeholder="choose price level"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </div>
            <div className="criteria-header">
                <div className="criteria-header-icon">
                    <FaceIcon />
                </div>
                Choose your friends
            </div>
            {users && (
                <div className="select">
                    <Autocomplete
                        multiple
                        id="checkboxes-users"
                        options={users}
                        disableCloseOnSelect
                        getOptionLabel={(user) => user.username}
                        renderOption={(user, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    key={user.id}
                                    value={user.id}
                                    onChange={(e) => { handleCheck(e) }}
                                />
                                {user.username}
                            </React.Fragment>
                        )}
                        style={style}
                        classes={{
                            inputRoot: classes.inputRoot,
                        }}
                        renderInput={(params) => (
                            <div className="friend">
                                <TextField {...params} variant="outlined" placeholder="Choose friends" />
                            </div>
                        )}
                    />
                </div>
            )}
            < Link to='/map'>
                <button className="login-button" onClick={handleSubmit}>Next step ! </button>
            </Link>
        </div>
    )
}

export default Criteria
