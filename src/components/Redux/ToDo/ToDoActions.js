import * as actionTypes from './ToDoTypes';

export const addSticky = () => {
    return {
        type: actionTypes.ADD_STICKY
    }
}

export const deleteSticky = () => {
    return {
        type: actionTypes.DELETE_STICKY,
        
    }
}

export const toggleStickyDeleteStatus = (stickyId) => {
    return {
        type: actionTypes.TOGGLE_STICKY_DELETE_STATUS,
        payload: {
            stickyId: stickyId
        }
    }
}

export const addToDo = (stickyId, task) => {
    return {
        type: actionTypes.ADD_TO_DO,
        payload:{
            task: task,
            stickyId: stickyId,
        }
    }
}

export const editToDo = (stickyId, id, newTask) => {
    return {
        type: actionTypes.EDIT_TO_DO,
        payload:{
            task: newTask,
            stickyId: stickyId,
            id: id,
        }
    }
}

export const deleteToDo = (stickyId, id) => {
    return {
        type: actionTypes.DELETE_TO_DO,
        payload:{
            stickyId: stickyId,
            id: id,
        }
    }
}

export const toggleToDoStatus = (stickyId, id, status) => {
    return {
        type: actionTypes.TOGGLE_TO_DO_STATUS,
        payload:{
            status: status,
            stickyId: stickyId,
            id: id,
        }
    }
}

export const changeFilter = (stickyId, filter) => {
    return {
        type: actionTypes.CHANGE_FILTER,
        payload:{
            filter:filter,
            stickyId: stickyId
        }
    }
}

export const fetchFromStorage = () => {
    return {
        type: actionTypes.FETCH_FROM_STORAGE,
    }
}


