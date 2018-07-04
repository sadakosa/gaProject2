var React = require('react');
var LayoutContainer = require('./layout.jsx');

class loginForm extends React.Component {
    render() {
        return(
            <div>
                <form method='POST' action='/login'>
                    <input type='text' name='username' placeholder='username'></input>
                    <input type='password' name='password' placeholder='password'></input>
                    <input type='submit' value='submit'></input>
                </form>
            </div>
        );
    }
}

module.exports = loginForm;