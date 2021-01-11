import React, { Component } from 'react'
class Registervoter extends Component {

    render() {
      return (
        <div>  
        <div>  
        Voter ID : {this.props.id}
        </div>
        <div>
        Voter Choice: {this.props.voterc}
        </div>
        </div>
      );
    }
  }
  
  export default Registervoter;