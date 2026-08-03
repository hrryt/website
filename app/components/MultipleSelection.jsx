import * as React from 'react';

export default function MultipleSelection({ variable, setVariable, id, legend, values, labels = values }) {
  const checked = values.map(value => variable.includes(value));

  function updateVariable(e, index) {
    const newChecked = checked.map((value, i) => i === index ? e.target.checked : value);
    const validChecked = newChecked.some(Boolean) ? newChecked : checked.map((value) => !value);
    setVariable(values.filter((_, i) => validChecked[i]));
  }

  return (
    <fieldset key={id}>
      <legend>{legend}</legend>
      {values.map((value, i) => {
        const name = `${id}:${value}`;
        return (
          <div key={value} className="field-row">
            <input type="checkbox" id={name} name={name} checked={checked[i]} onChange={e => updateVariable(e, i)} />
            <label htmlFor={name}>{labels[i]}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
