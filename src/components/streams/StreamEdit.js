import _ from 'lodash';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm'; // must import a component we want to talk to!


class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => { // this is going to be a callback function to streamform just like streamcreate
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        // **** initialValues is a very special property name with redux form 
        // WE USE THE NAMES INSIDE THE RENDER & Field components inside of StreamForm 
        // our stream is an object with a title & description property 
        //when we pass in to initialValues this.props.stream, every property is used as some initial value for the form 
        // the pick fxn is from lodash
        return (
            <div>
                <h3>Edit A Stream</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] } //returns our list of streams & finds the one with the approriate id 
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

