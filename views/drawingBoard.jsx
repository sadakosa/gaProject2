var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx');

class drawingBoard extends React.Component {
    render () {
        return (
            <LayoutContainer name={this.props.username}>
                <div className='row'>
                    <button className='btn btn-light' id='rect' style={{margin: '5px', width: '150px'}}>Rectangle</button>
                    <button className='btn btn-light' id='cir' style={{margin: '5px', width: '150px'}}>Circle</button>
                    <button className='btn btn-light' id='text' style={{margin: '5px', width: '150px'}}>Text</button>
                    {/* <button className='btn btn-light' id='tri' style={{margin: '5px', width: '150px'}}>Triangle</button> */}
                    <button className='btn btn-light' id='line' style={{margin: '5px', width: '150px'}}>Line</button>
                    <button className='btn btn-light' id='img' style={{margin: '5px', width: '150px'}}>Img</button>
                    <button className='btn btn-light' id='save' style={{margin: '5px', width: '150px'}}>Save</button>
                </div>
                <div>
                    <canvas id="myCanvas" width="600" height="500" style={{border:'1px solid #000000', position: 'relative', margin: '0 auto'}}></canvas>
                </div>
                <script src='/drawingBoard.js'></script>
            </LayoutContainer>
        );
    }
}

module.exports = drawingBoard;
