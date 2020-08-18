import React, { Component } from "react";
/*eslint-disable no-eval */
/* eslint-disable */

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "0",
            equation: ""
        }
        this.numInput = this.numInput.bind(this);
        this.operInput = this.operInput.bind(this);
        this.decInput = this.decInput.bind(this);
        this.calculate = this.calculate.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }
    numInput(e) {
        if (this.state.equation.match(/[0-9\/]$/) && !this.state.equation.includes("=")) {
            if (this.state.equation.match(/[+\-*\/]/) == null) {
                let val = this.state.equation + e.currentTarget.value;
                this.setState({
                    display: val,
                    equation: val
                });
            } else {
                this.setState({
                    display: this.state.display + e.currentTarget.value,
                    equation: this.state.equation + e.currentTarget.value
                });
            }
        } else if (this.state.equation.match(/[+\-*\/]$/)) {
            let val = this.state.equation + e.currentTarget.value;
            this.setState({
                display: e.currentTarget.value,
                equation: val
            });
        } else if ((this.state.display === "0" && e.currentTarget.value !== "0") || (this.state.equation.includes("="))) {
            this.setState({
                display: e.currentTarget.value,
                equation: e.currentTarget.value
            });
        }
    }

    operInput(e) {
        if (this.state.equation.includes("=")) {
            let val = this.state.display;
            val += e.currentTarget.value;
            this.setState({
                equation: val
            });
        } else {
            if (this.state.equation !== "" && this.state.equation.match(/[*\-\/+]$/) == null) {
                let val = this.state.equation;
                val += e.currentTarget.value;
                this.setState({
                    equation: val
                });
            } else if (this.state.equation.match(/[*\-\/+]$/) != null) {
                let val = this.state.equation;
                val = val.substring(0, (val.length - 1));
                val += e.currentTarget.value;
                this.setState({
                    equation: val
                });
            }
        }
    }

    decInput(e) {
        if (this.state.equation === "" || this.state.equation.includes("=")) {
            let val = '0.';
            this.setState({
                display: val,
                equation: val
            });
        } else if (this.state.equation.match(/[+\-*\/]$/)) {
            let val = '0.';
            this.setState({
                display: val,
                equation: this.state.equation + val
            });
        } else if (!this.state.display.includes(".")) {
            this.setState({
                display: this.state.display + e.currentTarget.value,
                equation: this.state.equation + e.currentTarget.value
            });
        }
    }

    clearInput() {
        this.setState({
            display: "0",
            equation: ""
        });
    }

    calculate() {
        if (this.state.equation.includes("=")) {
            let val = `${this.state.display} = ${this.state.display}`;
            this.setState({
                equation: val
            });
        } else if (this.state.equation !== "" && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/) == null) {
            let result = Number.isInteger(eval(this.state.equation)) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
            let val = this.state.equation;
            val += ` = ${result}`;
            this.setState({
                display: result,
                equation: val
            });
        }
    }

    render() {
        return (
            <div className="calculator_body">
                <Display equation={this.state.equation} display={this.state.display} />
                <div className="calculator_bottons">
                    <Button id="AC" value="AC" display="AC" class="grid-item first-row" click={this.clearInput} />
                    <Button id="sign" value="sign" display="+/-" class="grid-item first-row" /* click={this.changeSign} */ />
                    <Button id="percentage" value="percentage" display="%" class="grid-item first-row" />
                    <Button id="divide" value="/" display="/" class="grid-item first-row" click={this.operInput} />
                    <Button id="seven" value="7" display="7" class="grid-item" click={this.numInput} />
                    <Button id="eight" value="8" display="8" class="grid-item" click={this.numInput} />
                    <Button id="nine" value="9" display="9" class="grid-item" click={this.numInput} />
                    <Button id="multiply" value="*" display="x" class="grid-item" click={this.operInput} />
                    <Button id="four" value="4" display="4" class="grid-item" click={this.numInput} />
                    <Button id="five" value="5" display="5" class="grid-item" click={this.numInput} />
                    <Button id="six" value="6" display="6" class="grid-item" click={this.numInput} />
                    <Button id="subtract" value="-" display="-" class="grid-item" click={this.operInput} />
                    <Button id="one" value="1" display="1" class="grid-item" click={this.numInput} />
                    <Button id="two" value="2" display="2" class="grid-item" click={this.numInput} />
                    <Button id="three" value="3" display="3" class="grid-item" click={this.numInput} />
                    <Button id="add" value="+" display="+" class="grid-item" click={this.operInput} />
                    <Button id="zero" value="0" display="0" class="grid-item item-1" click={this.numInput} />
                    <Button id="decimal" value="." display="." class="grid-item" click={this.decInput} />
                    <Button id="calculate" value="=" display="=" class="grid-item" click={this.calculate} />
                </div>
            </div>
        );
    }

}

const Display = props => <div className="calculator_display"><span className="equation">{props.equation}</span><span className="display">{props.display}</span></div>

const Button = props => <button type="button" id={props.id} value={props.value} className={props.class} onClick={props.click}>{props.display}</button>

export default App;

