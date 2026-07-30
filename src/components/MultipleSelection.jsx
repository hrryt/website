import * as React from 'react';

export default function MultipleSelection({ legend, values, labels = values, defaults = values.map(() => true) }) {
  return (
    <fieldset ref={ref}>
      <legend>{legend}</legend>
      {values.map((value, i) => (
        <div className="field-row">
          <input type="checkbox" name={value} defaultChecked={defaults[i]}></input>
          <label for={value}>{labels[i]}</label>
        </div>
      ))}
    </fieldset>
  );
}
