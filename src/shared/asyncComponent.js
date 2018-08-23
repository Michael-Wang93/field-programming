import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
        let component = {};

        //两种动态导入方式，一个是直接传入class，一个是直接传入一个回调方法
        if(typeof importComponent === 'string') {
            const componentData = await import(importComponent);
            component = componentData.default;
        } else {
            component = importComponent;
        }
        this.setState({
            component: component
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}