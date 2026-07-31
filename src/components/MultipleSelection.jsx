import * as React from 'react';

export default function MultipleSelection({ id, legend, values, labels = values, defaults = values.map(() => true) }) {
  return (
    <fieldset key={id}>
      <legend>{legend}</legend>
      {values.map((value, i) => {
        const name = `${id}:${value}`;
        return (
          <div key={value} className="field-row">
            <input type="checkbox" id={name} name={name} defaultChecked={defaults[i]} />
            <label htmlFor={name}>{labels[i]}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
