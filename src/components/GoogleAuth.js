import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => { // have to load up additional module first 
            window.gapi.client.init({ // init returns a promise 
                clientId: '468602297688-vcv3p435rc10ui9793e778cplb4jq723.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => { // this function is called when our api library is ready to go 
                this.auth = window.gapi.auth2.getAuthInstance(); // the instance 
                this.onAuthChange(this.auth.isSignedIn.get()); // get whether user is signed in =) 
                this.auth.isSignedIn.listen(this.onAuthChange); // called anytime the user's authentication status changes...
                //... returns T or F. So if it changes, then we again call onAuthChange & the appropriate...
                //...action creator to update our state in the redux store 
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId()); // when we call this action creator...
            //...we also call the ID of the user who has signed in 
        } else {
            this.props.signOut(); // *signIn & signOut are our action creators**
        }
    };

    onSignInClick = () => {
        this.auth.signIn(); // signs the user in; triggers update in redux state
    };

    onSignOutClick = () => {
        this.auth.signOut(); // signs the user out; triggers update in redux state 
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) { // the isSignedIn here is coming from our redux store 
            return null;
        } else if (this.props.isSignedIn) { // we got the variable from our mapStateToProps 
            return (
                <button onClick={this.onSignOutClick} className="ui red button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }



    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    // isSignedIn is going to have a value of null, true, or false :) 
    return { isSignedIn: state.auth.isSignedIn } // our authReducer returned an object, so auth represents an object 
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);