var React = require('react');

class layoutContainer extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous"></link>
                    <link rel="stylesheet" type="text/css" href="/style.css"/>
                </head>
                <body>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                        <a className="navbar-brand" href="#">WireFrame</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{position: 'relative', left: '80%'}}>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Log In</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/signup">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className='container' style={{position: 'relative', top: '80px'}}>
                        {this.props.children}
                    </div>
                    {/* <script crossOrigin src="script.js"></script> */}
                </body>
            </html>
        );
    }
}

module.exports = layoutContainer;