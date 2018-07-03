var React = require('react');

class layoutContainer extends React.Component {
    render() {
        return (
            <html>
                <head>
                    {/* <link rel="stylesheet" type="text/css" href="/style.css"/> */}
                </head>
                <body>
                    {this.props.children}
                    {/* <script src="script.js"></script> */}
                </body>
            </html>
        );
    }
}

module.exports = layoutContainer;