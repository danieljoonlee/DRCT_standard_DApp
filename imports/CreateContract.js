import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

class Child extends React.Component {
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  method() {
    window.alert('do stuff')
  }
  render() {
    return <h1>Hello World!</h1>
  }
}

export default (Child);