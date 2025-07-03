import React from "react";

const Checkbox = (props) => {
  return (
    <div className="relative flex gap-3 py-4">
      <div className="shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            checked={props.checked}
            id={props.id}
            name={props.name}
            value={props.value}
            type="checkbox"
            onChange={props.onChange}
            className="checkbox appearance-none col-start-1 row-start-1 rounded-sm appearance-none"

          />
        </div>
      </div>
      <div className="min-w-0 px-3 text-sm/6">
        <label htmlFor={props.id} className="font-medium text-gray-200 select-none">
          {props.title}
        </label>
      </div>

    </div>
  );
};

export default Checkbox;