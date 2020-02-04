import React, { Component } from 'react';
import ToDo from './ToDo';

function ToDoContainer(props) {

   function handleCheckBox(event){
        props.toggleStickyDeleteStatus(props.stickyId);
        console.log(event.target.checked,'todo container rendered');
    }

    return (
        <div>
            <span><ToDo stickyId={props.stickyId}  creationTime={props.creationTime} color={props.color} /> </span>
            <span className='margin-left-container-size'><input type='checkbox' className='delete-checkbox' checked={props.stickyDeleteStatus} onChange={handleCheckBox}></input></span>
        </div>
    )
}


export default ToDoContainer;