import React, { useState, useCallback } from "react";
import Checkbox from "../Checkbox";
import CheckboxComponent from "../CheckboxComponent";
import "./styles.css";

const checkboxFields = [
  {
    name: "checkbox1",
    key: "checkBox1",
    label: "Check Box 1",
    checked: false
  },
  {
    name: "checkbox2",
    key: "checkBox2",
    label: "Check Box 2",
    checked: false
  },
  {
    name: "checkbox3",
    key: "checkBox3",
    label: "Check Box 3",
    checked: false
  },
  {
    name: "checkbox4",
    key: "checkBox4",
    label: "Check Box 4",
    checked: false
  }
];

const useCheckboxMapHandler = initialState => {
  const [checkboxItems, setCheckbox] = useState(initialState);

  const handleChange = useCallback(({ target: { name, checked } }) => {
    setCheckbox(prevState => {
      return new Map(prevState).set(name, checked);
    });
  }, []);

  const resetValues = useCallback(() => setCheckbox(initialState), [
    initialState
  ]);

  return {
    checkboxItems,
    handleChange,
    resetValues
  };
};

const useCheckboxHandler = initialState => {
  const [checkboxes, setCheckbox] = useState(initialState);

  const handleEventChange = useCallback(({ target }) => {
    console.log(target);
    setCheckbox(prevState =>
      prevState.map(item =>
        item.name === target.name
          ? { ...item, checked: !item.checked }
          : { ...item }
      )
    );
  }, []);

  const resetCheckboxValues = useCallback(() => setCheckbox(initialState), [
    initialState
  ]);

  return {
    handleEventChange,
    resetCheckboxValues,
    checkboxes
  };
};

const App = () => {
  const { checkboxItems, handleChange, resetValues } = useCheckboxMapHandler(
    new Map()
  );
  const {
    checkboxes,
    handleEventChange,
    resetCheckboxValues
  } = useCheckboxHandler(checkboxFields);

  return (
    <div className="app">
      <h1>Updating (Map Object in Hook)</h1>
      {checkboxFields.map(({ key, name }) => (
        <label key={key}>
          {name}
          <Checkbox
            name={name}
            checked={checkboxItems.get(name)}
            onChange={handleChange}
          />
        </label>
      ))}
      <button onClick={resetValues}>Reset</button>
      <h1>Updating (Array of Objects)</h1>
      {checkboxes.map(({ key, name, checked }) => (
        <label key={key}>
          {name}
          <Checkbox
            name={name}
            checked={checked}
            onChange={handleEventChange}
          />
        </label>
      ))}
      <button onClick={resetCheckboxValues}>Reset</button>
      <h1>Updating (Map Object in Component)</h1>
      <CheckboxComponent checkboxes={checkboxFields} />
    </div>
  );
};

export default App;
