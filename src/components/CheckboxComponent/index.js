import React, { Fragment, Component } from "react";
import Checkbox from "../Checkbox";

class CheckboxComponent extends Component {
  state = { checkedItems: new Map() };

  handleChange = ({ target: { name, checked } }) => {
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(name, checked)
    }));
  };

  handleReset = () => this.setState({ checkedItems: new Map() });

  render() {
    return (
      <Fragment>
        {this.props.checkboxes.map(item => (
          <label key={item.key}>
            {item.name}
            <Checkbox
              name={item.name}
              checked={this.state.checkedItems.get(item.name)}
              onChange={this.handleChange}
            />
          </label>
        ))}
        <button onClick={this.handleReset}>Reset</button>
      </Fragment>
    );
  }
}

export default CheckboxComponent;
