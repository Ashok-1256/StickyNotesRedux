import * as actionTypes from './ToDoTypes';
import { ALL, ACTIVE, COMPLETED } from '../../FilterTypes';

const initialState = {
    listOfSticky: [],
}
const _updateInStorage = (state) => {
    console.log('storage updated');
    localStorage.setItem('state',JSON.stringify(state));
}

const _deepClone = (listOfSticky) => {
    return listOfSticky.map(sticky => {
        let toDos = sticky.toDos.slice();
        return {
            ...sticky,
            toDos:toDos,
        }
    })
}

const _collectData = (state, stickyId, id) => {
    let listOfSticky = _deepClone(state.listOfSticky);
    let toDos = listOfSticky.find((sticky) => sticky.stickyId == stickyId).toDos;
    const index = toDos.findIndex( toDo => toDo.id === id);

    return [listOfSticky, toDos, index]; 
}


export const toDoReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ADD_STICKY : {
            const creationTime = new Date().toLocaleString();
            let listOfSticky = state.listOfSticky.filter(() => true);

            listOfSticky.push({
                stickyId: listOfSticky.length,
                creationTime: creationTime,
                toDos: [],
                filter: ALL,
                stickyDeleteStatus: false,  
            })

            const newState = {
                ...state,
                listOfSticky: listOfSticky
            }
            _updateInStorage(newState);   
            return newState;

        }

        case actionTypes.TOGGLE_STICKY_DELETE_STATUS : {
            const { stickyId } = action.payload;
            let listOfSticky = state.listOfSticky.filter(() => true); // [...listofsticky]
            const index = listOfSticky.findIndex(sticky => sticky.stickyId === stickyId);
            console.log(listOfSticky[index].stickyDeleteStatus);
            listOfSticky[index].stickyDeleteStatus = !listOfSticky[index].stickyDeleteStatus;

            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            }
            _updateInStorage(newState);   
            return newState;

        }

        case actionTypes.DELETE_STICKY : {
            let listOfSticky = state.listOfSticky.filter((sticky) => sticky.stickyDeleteStatus == false);

            const newState = {
                ...state,
                listOfSticky: listOfSticky
            }
            _updateInStorage(newState);   
            return newState;


        }

        case actionTypes.ADD_TO_DO : {
            const { stickyId, task } = action.payload;
            let [ listOfSticky, toDos, index ] = _collectData(state, stickyId);

            toDos.push({
                task: task,
                status: ACTIVE,
                id: toDos.length,
            })

            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            }
            _updateInStorage(newState);   
            return newState;

        }

        case actionTypes.EDIT_TO_DO : {
            const { stickyId, id, newTask } = action.payload;
            let [ listOfSticky, toDos, index ] = _collectData(state, stickyId, id);

            toDos[index].task = newTask;
            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            } 
            return newState;
            
        }

        case actionTypes.DELETE_TO_DO : {
            const { stickyId, id } = action.payload;
            let [ listOfSticky, toDos, index ] = _collectData(state, stickyId, id);

            toDos.splice(index, 1);
            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            }
            _updateInStorage(newState);   
            return newState; 
            
        }

        case actionTypes.TOGGLE_TO_DO_STATUS : {
            const { stickyId, id, status } = action.payload;
            let [ listOfSticky, toDos, index ] = _collectData(state, stickyId, id);

            toDos[index].status = status;
            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            }

            _updateInStorage(newState);   
            return newState;
            
        }

        case actionTypes.CHANGE_FILTER : {
            const { stickyId, filter } = action.payload;
            let [ listOfSticky, toDos, index ] = _collectData(state, stickyId);

            let  sticky = listOfSticky.find((sticky) => sticky.stickyId == stickyId);
            sticky.filter = filter;

            const newState = {
                ...state,
                listOfSticky: listOfSticky,
            }

            _updateInStorage(newState);   
            return newState;

            
        }

        case actionTypes.FETCH_FROM_STORAGE : {
            let state = JSON.parse(localStorage.getItem('state'));
            if(!state){
                state = {
                    listOfSticky: [],
                }
            }
            const listOfSticky = state.listOfSticky.map((sticky, index) => {
                return {
                    ...sticky,
                    stickyId: index,
                    toDos:sticky.toDos.map((toDo, index) => {
                        return {
                            ...toDo,
                            id:index,
                        }
                    })

                }
            })

            return state;
            
        }

        default : return state
    }

}