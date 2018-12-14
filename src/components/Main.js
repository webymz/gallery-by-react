require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

// var imagesDatas = require('../data/imagesData.json');
// function genImageURL (imagesDatasArr){
//   for(var i = 0,j = imagesDatasArr.length; i<j;i++){
//     var singleImageData = imagesDatasArr[i]
//     singleImageData.genImageURL = require('.images/'+singleImageData.fileName)
//     imagesDatasArr[i] = singleImageData;
//   }
//   return imagesDatasArr;
// }
// imagesDatas = genImageURL(imagesDatas);
// console.log(imagesDatas);


class AppComponent extends React.Component {
  render() {
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <section className = "stage">
        <section className = "img-sec"></section>
        <nav className = "controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
