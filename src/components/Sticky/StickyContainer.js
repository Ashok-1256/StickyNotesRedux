import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToDoContainer from './ToDoContainer';
import { addSticky, deleteSticky, toggleStickyDeleteStatus, fetchFromStorage } from '../Redux/ToDo/ToDoActions';
import { colors } from './BackgroundColors';

class StickyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        this.props.fetchFromStorage();
    }

    componentDidMount(){
        window.addEventListener('load', this.fetchData);
    }

    componentWillUnmount(){
        window.removeEventListener('load', this.fetchData);
    }

    render() {
        // console.log('sticky container re rendered ');

        const allSticky = this.props.listOfSticky.map((sticky, index) => {
            return (
                    <ToDoContainer stickyId={sticky.stickyId} key={'toDo' + sticky.stickyId} creationTime={sticky.creationTime} stickyDeleteStatus={sticky.stickyDeleteStatus} 
                        toggleStickyDeleteStatus={this.props.toggleStickyDeleteStatus} color={colors[index % colors.length]}/>
            )
        })

        return (
            <div>
                <button className='primary-button margin-bottom-default' onClick={this.props.addSticky}>Add Sticky</button>
                <button className='secondary-button margin-bottom-default margin-left-default' onClick={this.props.deleteSticky}> Delete Sticky</button>
                {allSticky}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listOfSticky: state.listOfSticky,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSticky: () => { dispatch(addSticky()) },
        toggleStickyDeleteStatus: (stickyId) => { dispatch(toggleStickyDeleteStatus(stickyId)) },
        deleteSticky: () => { dispatch(deleteSticky()) },
        fetchFromStorage: () => { dispatch(fetchFromStorage()) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StickyContainer);