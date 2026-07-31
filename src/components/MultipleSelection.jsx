import * as React from 'react';

export default function MultipleSelection({ id, legend, values, labels = values, defaults = values.map(() => true) }) {
  const [checked, setChecked] = React.useState(defaults);

  function updateChecked(newValue, index) {
    const newChecked = checked.map((value, i) => i === index ? newValue : value);
    setChecked(newChecked.some(Boolean) ? newChecked : checked.map((value) => !value));
  }

  return (
    <fieldset key={id}>
      <legend>{legend}</legend>
      {values.map((value, i) => {
        const name = `${id}:${value}`;
        return (
          <div key={value} className="field-row">
            <input type="checkbox" id={name} name={name} checked={checked[i]} onChange={e => updateChecked(e.target.checked, i)} />
            <label htmlFor={name}>{labels[i]}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
