import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ALL, ACTIVE, COMPLETED } from '../FilterTypes';
import { addToDo, changeFilter, deleteToDo, toggleToDoStatus, editToDo } from '../Redux/ToDo/ToDoActions';
import Item from './Item';

class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value.trim(),
        })
    }

    handleSubmit(event) {
        if (event.keyCode == 13 && this.state.input != '') {
            console.log(event.keyCode, this.state.input);
            this.props.addToDo(this.props.stickyId, this.state.input);
            this.setState({
                input: '',
            })
        }
    }

    render() {

        const toDos = this.props.toDos;
        const filter = this.props.filter;

        const toDosLeft = toDos.filter(toDo => toDo.status == ACTIVE).length;
        const toDoList = toDos.filter(toDo => (filter == ALL || filter == toDo.status));
         console.log(toDos,filter);

        const toDoItems = toDoList.map(toDo => {
            const checked = toDo.status === COMPLETED ? true : false;
            //console.log(toDo);
            return <Item key={toDo.id} stickyId={this.props.stickyId} id={toDo.id} task={toDo.task} checked={checked} deleteItem={this.props.deleteItem} toggleToDoStatus={this.props.toggleToDoStatus} editToDo={this.props.editToDo} />
        });

        return (
            <div className='wrapper' >
                <div className='container display-inline-block ' style={{backgroundColor: this.props.color}}>
                    <div className='creation-time'>{this.props.creationTime}</div>
                    <div className="add-to-do">
                        <input className='to-do-input' value={this.state.input} onChange={this.handleChange} onKeyUp={this.handleSubmit} placeholder="press enter to add" />
                    </div>
                    <div className="button-container margin-left-default">
                        <button id='all' className='filter-button' onClick={() => { this.props.changeFilter(this.props.stickyId, ALL); }} > All </button>
                        <button id='active' className='filter-button' onClick={() => { this.props.changeFilter(this.props.stickyId, ACTIVE); }} > Active </button>
                        <button id='completed' className='filter-button' onClick={() => { this.props.changeFilter(this.props.stickyId, COMPLETED); }} > Completed </button>
                    </div>

                    <ul className="to-do-list  margin-left-default">{toDoItems} </ul>

                    <ul className="margin-left-default"> <li id="to-dos-left"> {toDosLeft} remaining </li> </ul >
                    {/* <ul className="margin-left-default"><button id='clear-button' className="filter-button clear-color" onClick={this.clearList} >Clear</button></ul> */}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const sticky = state.listOfSticky.find((sticky) => sticky.stickyId == ownProps.stickyId);
    return {
        toDos: sticky.toDos,
        filter: sticky.filter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDo: (stickyId, task) => { dispatch(addToDo(stickyId, task)) },
        changeFilter: (stickyId, filter) => { dispatch(changeFilter(stickyId, filter)) },
        deleteItem: (stickyId, id) => { dispatch(deleteToDo(stickyId, id)) },
        toggleToDoStatus: (stickyId, id, status) => { dispatch(toggleToDoStatus(stickyId, id, status)) },
        editToDo: (stickyId, id, newTask) => { dispatch(editToDo(stickyId, id, newTask)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);