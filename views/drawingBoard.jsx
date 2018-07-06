var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx');

class drawingBoard extends React.Component {
    render () {
        return (
            <LayoutContainer name={this.props.username}>
                <div className='row'>
                    <div className='btnGroup' style={{margin: '0 auto'}}>
                        <button className='btn btn-light' id='rect' style={{margin: '5px', width: '150px'}}>Rectangle</button>
                        <button className='btn btn-light' id='cir' style={{margin: '5px', width: '150px'}}>Circle</button>
                        <button className='btn btn-light' id='text' style={{margin: '5px', width: '150px'}}>Text</button>
                        {/* <button className='btn btn-light' id='tri' style={{margin: '5px', width: '150px'}}>Triangle</button> */}
                        <button className='btn btn-light' id='line' style={{margin: '5px', width: '150px'}}>Line</button>
                        <button className='btn btn-light' id='img' style={{margin: '5px', width: '150px'}}>Img</button>
                        <button className='btn btn-light' id='save' style={{margin: '5px', width: '150px'}}>Save</button>
                    </div> 
                </div>

                <div className='row'>
                    <div id='objList'>
                        <h1><u>List of Objects</u></h1>
                    </div>

                    <div>
                        <canvas id="myCanvas" width="600" height="500"></canvas>
                    </div>

                    <div id='properties'>
                    <h1><u>Properties Bar</u></h1>
                    </div>
                </div>
                
                <script src='/drawingBoard.js'></script>
            </LayoutContainer>
        );
    }
}

module.exports = drawingBoard;
