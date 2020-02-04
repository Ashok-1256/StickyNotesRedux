import React from 'react';
import { COMPLETED, ACTIVE } from '../FilterTypes';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            editMode: false,
            checked: this.props.checked,
        }

        this.changeModeToEdit = this.changeModeToEdit.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }

    changeModeToEdit() {
        this.setState((state) => ({
            editMode: true,
        }));
    }

    handleChange(event) {
        this.setState({
            task: event.target.value,
        })
    }

    editTask(event) {
        let task = this.state.task.trim();
        console.log(event.keyCode, task);
        if (event.keyCode == 13) {
            this.setState({
                task: task,
                editMode: false,
            })
            if (task !== "") {
                this.props.editToDo(this.props.stickyId, this.props.id, task);
            } else {
                this.props.deleteItem(this.props.stickyId, this.props.id);
            }
        }

    }

    toggleStatus(event){
        const status = event.target.checked ? COMPLETED : ACTIVE ;
        this.props.toggleToDoStatus(this.props.stickyId, this.props.id, status);
        this.setState({
            checked: status == COMPLETED ? true : false,
        })
    }

    render() {
        const id = this.props.id;
        let toDo;
        const editInput = <li> <input value={this.state.task} onChange={this.handleChange} onKeyUp={this.editTask} autoFocus /></li>;
        const toDoTask = <li onDoubleClick={this.changeModeToEdit}> {this.state.task} </li>

        toDo = this.state.editMode ? editInput : toDoTask;

        return (
            <ul className="">
                <li> <input className='checkbox' type='checkbox' checked={this.state.checked} onChange={this.toggleStatus} /> </li>
                {toDo}
                <li className="delete-icon" onClick={() => { this.props.deleteItem(this.props.stickyId, this.props.id) }}> X </li>
            </ul>
        );
    }
}

export default Item;