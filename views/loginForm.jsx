var React = require('react');
var LayoutContainer = require('./layout.jsx');

class loginForm extends React.Component {
    render() {
        return(
            <LayoutContainer>
                <div>
                    <form method='POST' action='/login'>
                        <input type='text' name='email' placeholder='email'></input>
                        <input type='password' name='password' placeholder='password'></input>
                        <input type='submit' value='submit'></input>
                    </form>
                    <script src='/login.js'></script>
                </div>
            </LayoutContainer>
        );
    }
}

module.exports = loginForm;