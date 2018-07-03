var React = require('react');
var layoutContainer = require('./layout.jsx')

class hello extends React.Component {
    render() {
        return (
            <layoutContainer>
                <div>hello</div>
            </layoutContainer>
        );
    }
}

module.exports = hello;