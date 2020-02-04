import React, { Component, useState, useEffect } from "react";

const EditableText = ({ initialText, editMode, editTask }) => {

    const [text, setText] = useState(initialText);
    const [editMode, setEditMode] = useState(editMode);

    useEffect(()=>{
        if(!editMode){
            editTask();
        }
        

    }, [editMode]);

    function handleChange(event){
        setText(event.target.value);
    }

    function onKeyUp(event){
        if(event.keyCode == 13){
            setEditMode(false);
        }
    }

    function onMouseLeave(){
        setEditMode(false);
    }

    function changeModeToEdit(){
        setEditMode(true);
    }

    const editInput = <li> <input value={text} onChange={handleChange} onMouseLeave={onMouseLeave} onKeyUp={onKeyUp} autoFocus /></li>;
    const toDoTask = <li onDoubleClick={changeModeToEdit}> {text} </li>

    if(editMode){
        return editInput;
    }
    return toDoTask;
}
 
export default EditableText;