import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'; // Switch used to only show one component per url 
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';


const App = () => {
    // switch shows only one route for any path that we go to: the 1st matching route gets passed & nothing else
    return (
        // we set id to be a param
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={StreamList} />
                        <Route path='/streams/new' exact component={StreamCreate} />
                        <Route path='/streams/edit/:id' exact component={StreamEdit} />
                        <Route path='/streams/delete/:id' exact component={StreamDelete} />
                        <Route path='/streams/:id/' exact component={StreamShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
