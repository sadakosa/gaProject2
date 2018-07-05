var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx')

class dashboard extends React.Component {
    render() {
        return (
            <LayoutContainer name={this.props.username}>
                <div className='row'>
                    <button>add a page</button>
                </div>
                <div id='projects'></div>
                <script src="dashboard.js"></script>
            </LayoutContainer>
        );
    }
}

module.exports = dashboard;