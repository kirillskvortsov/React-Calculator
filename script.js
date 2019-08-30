class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <button 
        onClick={this.props.onClick}
        className={this.props.stylename}
        id={this.props.id}
      >
        {this.props.value}
      </button>
    );
  };
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: null,
      negative: false,
      first: '',
      second: '',
      dot: true,
      isfirst: true,
      num1: 0,
      reset: false,
    }
    
    this.add = this.add.bind(this);
    this.dot = this.dot.bind(this);
    this.reset = this.reset.bind(this);
    this.sign = this.sign.bind(this);
    this.op = this.op.bind(this);
    this.equals = this.equals.bind(this);
    this.percent = this.percent.bind(this);
  }
  
  add(e) {
    if(this.state.reset && !this.state.operation) {
      this.reset();
      this.setState({
        first: e.target.innerHTML 
      });
    } else {
      if(this.state.isfirst) {
        if (this.state.first == '0') {
          this.setState({
          first: e.target.innerHTML 
        });
        } else {
          this.setState({
            first: this.state.first + e.target.innerHTML 
          });
        }
      } else {
        if (this.state.second == '0') {
          this.setState({
          first: e.target.innerHTML 
        });
        } else {
          this.setState({
            second: this.state.second + e.target.innerHTML 
          });
        }
      }
    }
  };
  
  dot(e) {
    if(this.state.reset && !this.state.operation) {
      this.reset();
      this.setState({
        first: '0.'
      });
    } else {
      if(this.state.isfirst) {
        if (this.state.dot) {
          this.setState({
            dot: false,
            first: this.state.first ? this.state.first + '.' : '0.'
          });
        }
      } else {
        if (this.state.dot) {
          this.setState({
            dot: false,
            second: this.state.second ? this.state.second + '.' : '0.'
          });
        }
      }
    }
  };
  
  reset() {
    this.setState({
      operation: null,
      negative: false,
      first: '',
      second: '',
      dot: true,
      isfirst: true,
      num1: 0,
      reset: false
    });
  };
  
  sign() {
    if(this.state.isfirst && this.state.first) {
      this.setState({
        negative: !this.state.negative,
        first: Number.parseFloat(this.state.first) * (-1)
      });
    } else if(!this.state.isfirst && this.state.second) {
      this.setState({
        negative: !this.state.negative,
        second: Number.parseFloat(this.state.second) * (-1)
      });
    }
  };
  
  op(e) {
    this.setState({
      operation: e.target.innerHTML,
      isfirst: false,
      negative: false,
      dot: true,
    });
    if(this.state.isfirst) {
      this.setState({
        num1: Number.parseFloat(this.state.first),
      });
    } else {
      this.equals();
      this.setState({
        operation: e.target.innerHTML,
        isfirst: false,
        negative: false,
        dot: true,
        reset: false,
      });
    }
  }
 
  percent() {
    if (this.state.operation) {
      let num2 = Number.parseFloat(this.state.second);   
      let result = 0;
      switch(this.state.operation) {
        case '+': result = this.state.num1 * (1 + num2 / 100); break;
        case '-': result = this.state.num1 * (1 - num2 / 100); break;
        case 'X': result = this.state.num1 * (num2 / 100); break;
        case '/': result = this.state.num1 / (num2 / 100); break;
      }
      
      this.setState({
        num1: result,
        operation: null,
        negative: result < 0 ? true : false,
        first: result,
        second: '',
        dot: true,
        isfirst: true,
        reset: true,
      });
    }
  }
  
  equals() {
    if (this.state.operation) {
      let num2 = Number.parseFloat(this.state.second);    
      let result = 0;
      switch(this.state.operation) {
        case '+': result = this.state.num1 + num2; break;
        case '-': result = this.state.num1 - num2; break;
        case 'X': result = this.state.num1 * num2; break;
        case '/': result = this.state.num1 / num2; break;
        case '%': result / 100; break;
      }
      
      if(result.toString().length > 12) {
        if (result > 999999999999 || result < -999999999999) {
          result = Number.parseFloat(result).toExponential(4);
        } else if (result < 0.0001 && result > 0 || result > -0.0001 && result < 0){
          result = Number.parseFloat(result).toExponential(4);
        } else {
          result = Number.parseFloat(result).toFixed(4);
        }
      }

      this.setState({
        num1: result,
        operation: null,
        negative: result < 0 ? true : false,
        first: result,
        second: '',
        dot: true,
        isfirst: true,
        reset: true,
      });
    }
  }
  
  render() {
    const result = this.state.isfirst || !this.state.second ? this.state.first ? this.state.first : '0' : this.state.second ? this.state.second : '0';
    
    return(
      <div id="main">
        <p id="result">{result}</p>
        
        <div id="btns">
          <Button stylename="grey" value={"AC"} onClick={this.reset} />
          <Button stylename="grey" value={"+/-"} onClick={this.sign} />
          <Button stylename="grey" value={"%"} onClick={this.percent} />
          <Button stylename="yellow" value={"/"} onClick={this.op} />

          <Button stylename="darkgrey" value={7} onClick={this.add} />
          <Button stylename="darkgrey" value={8} onClick={this.add} />
          <Button stylename="darkgrey" value={9} onClick={this.add} />
          <Button stylename="yellow" value={"X"} onClick={this.op} />

          <Button stylename="darkgrey" value={4} onClick={this.add} />
          <Button stylename="darkgrey" value={5} onClick={this.add} />
          <Button stylename="darkgrey" value={6} onClick={this.add} />
          <Button stylename="yellow" value={"-"} onClick={this.op} />

          <Button stylename="darkgrey" value={1} onClick={this.add} />
          <Button stylename="darkgrey" value={2} onClick={this.add} />
          <Button stylename="darkgrey" value={3} onClick={this.add} />
          <Button stylename="yellow" value={"+"} onClick={this.op} />

          <Button stylename="darkgrey" id="wide" value={0} onClick={this.add} />
          <Button stylename="darkgrey" value={"."} onClick={this.dot} />
          <Button stylename="yellow" value={"="} onClick={this.equals} />
        </div>
      </div>
    );
  };
}

ReactDOM.render(<Calculator />, document.getElementById('react'));