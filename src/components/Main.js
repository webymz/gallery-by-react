require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

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
// console.log(imagesDatas)


var ImgFigure = React.createClass ({
  render:function(){
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});

// var ImgFigure = props => {
//   return(
//     <figure className="img-figure">
//         <img src={props.data.imageURL} alt={props.data.title}/>
//         <figcaption>
//           <h2>{props.data.title}</h2>
//         </figcaption>
//     </figure>
//   )
// }


// class App extends Component 
var App = React.createClass({
  
  Constant: {
    conterPos:{
      left: 0,
      right: 0
    },
    hPosRange:{         //水平方向的取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{         //垂直方向的取值范围
      x:[0,0],
      topY:[0,0]
    }
  },

  // 重新布局所有图片
  // @param centerIndex
  
  rearrange: function(centerIndex){

  },

  getInitialStage: function(){
    return{
      imgsArrangeArr: [
        {
          pos: {
            left: '0',
            top: '0'
          }
        }
      ]
    }
  },

  //组件加载后，为每张图片计算其位置的范围
  componentDidMount: function() {

    //获取舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfstageW = Math.ceil(stageW/2),
        halfstageH = Math.ceil(stageH/2);

    console.log(stageDOM)

    //获取一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);
    
    console.log(imgFigureDOM)


    //计算中心图片的位置
    this.Constant.centerPos = {
      left: halfstageW - halfstageW,
      top: halfImgH - halfImgH
    }


    //计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfstageW - halfImgW;
    
    this.Constant.hPosRange.rightSecX[0] = halfstageW = halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfstageH - halfImgW * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
  },

  render() {
    var controllerUnits = [],
          imgFigures = [];
        
    imagesDatas.forEach((value,index) => {
      // if(!this.state.imgsArrangeArr[index]){
      //   this.stage.imgsArrangeArr[index] = {
      //     pos: {
      //       left: 0,
      //       top: 0
      //     }
      //   }  
      // }
      imgFigures.push(<ImgFigure data={value} key={'imgFigures'+index} ref={'imgFigure'+index}/>)       
    });
    
    return (
      <section className = "stage" ref="stage">
        <section className = "img-sec">
          {imgFigures}
        </section>
        <nav className = "controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
})



export default App;
