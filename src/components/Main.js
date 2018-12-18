require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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

//获取区间内的一个随机数
function getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low)+low)
}

//获取0-30度之间的一个任意正负数
function get30DegRandom(){
  return ((Math.random()>0.5? '':'')+Math.ceil( Math.random() * 30 ));
}

var ImgFigure = React.createClass ({
  /*
    *imgFigure的点击处理函数
  */
  handleClick: function(e){
    this.props.isInverse();
    e.stopPropagation();
    e.preventDefault();
  },

  render: function(){
    
    var styleObj = {};
    
    //  如果props属性中指定了这张图片的位置,则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    //  如果图片的旋转角度有值并且不为0,添加旋转
    if(this.props.arrange.rotate){
      (['Moz','ms','Webkit','']).forEach(function(value){
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg';
      }.bind(this));
    }


    var imgFigureClassName = "img-figure";
        imgFigureClassName += this.props.arrange.isInverse? ' is-inverse' : '';

    return(
      <figure className="img-figure" style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p> {this.props.data.desc} </p>
          </div>
        </figcaption>
      </figure>
    );
  }
});

var App = React.createClass ({
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

  /*
    * 翻转图片
    * @param centerIndex 指定居中排布哪个图片
    * @return{Function} 这是一个闭包函数,其中return一个真正待被执行的函数
  */
  isInverse: function(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }.bind(this);
  },


  /*
    * 重新布局所有图片
    * @param centerIndex
  */
  rearrange: function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,

        hPosRangeLeftSecx = hPosRange.leftSecX,
        hPosRangeRightSecx = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        
        topImgNum = Math.ceil(Math.random() * 2),  // 取一个或者不取 
        topImgSpliceIndex = 0,
        imgsArrCenterArr = imgsArrangeArr.splice(centerIndex,1);

        imgsArrCenterArr[0].pos = centerPos;       // 首先居中的centerIndex的图片
        imgsArrCenterArr[0].rotate = 0;            // 居中centerIndex的图片不需要旋转

        // 取出布局上侧的图片的状态
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index] = {
            pos : {
              top:  getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate : get30DegRandom()
          }
        });

        //布局左右两侧的图片
        for(var i = 0 , j = imgsArrangeArr.length, k = j / 2 ; i < j ; i ++){
          var hPosRangeLORX = null;
          
          //前半部分布局左边,右半部分布局右边
          if( i < k ){
            hPosRangeLORX = hPosRangeLeftSecx;
          }else{
            hPosRangeLORX = hPosRangeRightSecx;
          }

          imgsArrangeArr[i] = {
            pos:  {
              top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate : get30DegRandom()
          }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
  },

  getInitialState: function(){
    return{
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,  //旋转角度
        //   isInverse: false   // 图片正反面
        // }
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

    //获取一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);
    
    //计算中心图片的位置
    this.Constant.centerPos = {
      left: halfstageW - halfImgW,
      top: halfstageH - halfImgH
    }

    //计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfstageW - halfImgW * 3;
    
    this.Constant.hPosRange.rightSecX[0] = halfstageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfstageH - halfImgW * 3;
    this.Constant.vPosRange.x[0] = halfstageW - imgW;
    this.Constant.vPosRange.x[1] = halfstageW;

    this.rearrange(0);
  },

  render() {
    var controllerUnits = [],
          imgFigures = [];
        
    imagesDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0 ,
            top: 0
          },
          rotate: 0 ,
          isInverse: false  
        }  
      }
      imgFigures.push(<ImgFigure data={value} key={'imgFigures'+index} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} isInverse={this.isInverse(index)}/>)       
    }.bind(this));
    
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
