import React from 'react';

let imagesDatas = require('json!../data/imagesData.json');

function genImageURL (imagesDatasArr){
  for(var i = 0,j = imagesDatasArr.length; i<j;i++){
    var singleImageData = imagesDatasArr[i]
    singleImageData.imageURL = require('../images/'+singleImageData.fileName)
    imagesDatasArr[i] = singleImageData;
    console.log(singleImageData.imageURL,singleImageData.fileName);
  }
  return imagesDatasArr;
}
imagesDatas = genImageURL(imagesDatas);

var ImgFigure = React.createClass ({
    /*
      *imgFigure的点击处理函数
    */
    handleClick: function(e){
      if(this.props.arrange.isCenter){
        this.props.inverse();
      }else{
        this.props.center();
      }
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
        (['MozTransform','msTransform','WebkitTransform','transform']).forEach(function(value){
          styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }.bind(this));
      }
  
      if(this.props.arrange.isCenter){
        styleObj.zIndex = 11;
      }
      
      var imgFigureClassName = "img-figure";
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
  
      return(
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className="img-back" onClick={this.handleClick}>
              <p> {this.props.data.desc} </p>
            </div>
          </figcaption>
        </figure>
      );
    }
  });

export default ImgFigure;

  