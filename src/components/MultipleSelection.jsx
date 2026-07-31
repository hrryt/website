import * as React from 'react';

function isEnabled(checked, index) {
  return checked.some((value, i) => i === index ? !checked : value);
}

export default function MultipleSelection({ id, legend, values, labels = values, defaults = values.map(() => true) }) {
  const [checked, setChecked] = React.useState(defaults);

  function setCheckedI(newValue, index) {
    setChecked(checked.map((value, i) => {
      if (i === index) { return newValue; }
      return value;
    }));
  }

  return (
    <fieldset key={id}>
      <legend>{legend}</legend>
      {values.map((value, i) => {
        const name = `${id}:${value}`;
        return (
          <div key={value} className="field-row">
            <input type="checkbox" id={name} name={name} checked={checked[i]} disabled={!isEnabled(checked, i)} onChange={e => setCheckedI(e.target.checked, i)} />
            <label htmlFor={name}>{labels[i]}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
