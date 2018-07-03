var React = require('react');
var LayoutContainer = require('./layout.jsx');

class signupForm extends React.Component {
    render() {
        return (
            
                <form method='POST' action='/signup'>
                    <input type='text' name='username' placeholder='username'></input>
                    <input type='text' name='first_name' placeholder='first_name'></input>
                    <input type='text' name='last_name' placeholder='last_name'></input>
                    <input type='text' name='email' placeholder='email'></input>
                    <input type='password' name='password' placeholder='password'></input>
                    <input type='password' name='password2' placeholder='password2'></input>
                    <input type='submit' value='submit'></input>
                </form>
            
        );
    }
}

module.exports = signupForm;