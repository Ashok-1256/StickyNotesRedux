import React from 'react';
import StickyContainer from './Sticky/StickyContainer';
import { Provider } from 'react-redux';
import store from './Redux/ToDo/Store';
import Image from './Image';
const src = 'https://picsum.photos/200';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        return (
            <Provider store={store}>
                <StickyContainer />
            </Provider>
        );
        // return (<Image src={'z' + src}></Image>)
    }
}

export default App;
