require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
let imagesDatas = require('json!../data/imagesData.json');

function genImageURL (imagesDatasArr){
  for(var i = 0,j = imagesDatasArr.length; i<j;i++){
    var singleImageData = imagesDatasArr[i]
    singleImageData.imageURL = require('../images/'+singleImageData.fileName)
    imagesDatasArr[i] = singleImageData;
  }
  return imagesDatasArr;
}
imagesDatas = genImageURL(imagesDatas);
console.log(imagesDatas)



var imgFigure = React.createClass ({
  render:function(){
    return(
      <figure>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});


class App extends React.Component {
  render() {
    var controllerUnits = [],
          imgFigures = [];
          
    imagesDatas.forEach((value,index) => {
      imgFigures.push(<imgFigure data={value} key={'imgFigures'+index}/>)       
    });
    
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <section className = "stage">
        <section className = "img-sec">
          {imgFigures}
        </section>
        <nav className = "controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

App.defaultProps = {
};

export default App;
