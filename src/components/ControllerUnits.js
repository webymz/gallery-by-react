import React from 'react';
// 控制组件
var ControllerUnits = React.createClass({
    handleClick: function(e){
  
      //  如果点击的是当前正在选中态的按钮,则翻转图片,否则将对应的图片居中
      if (this.props.arrange.isCenter){
        this.props.inverse();
      } else {
        this.props.center();
      }
  
      e.preventDefault();
      e.stopPropagation();
    },
    render: function(){
      var controllerUnitsClassName = "controller-unit";
      
      //  如果对应的是居中图片，显示控制按钮的居状态
      if(this.props.arrange.isCenter){
          controllerUnitsClassName += " is-center";
      }
      //如果是同时对应的是翻转图片,显示控制按钮的翻转态
      if(this.props.arrange.isInverse){
        controllerUnitsClassName += " is-inverse";
      }
  
      return(
        <span className={controllerUnitsClassName} onClick={this.handleClick}></span>
      );
    }
  });

export default ControllerUnits;
