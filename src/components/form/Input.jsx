import React, {forwardRef} from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.name} className={props.labelClassName || "block text-sm/6 font-medium text-gray-400"}>
        {props.title}
      </label>
      <div className="mt-2">
        <input
          type={props.type}
          className={props.className || "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
          id={props.name}
          ref={ref}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          autoComplete={props.autoComplete}
          required={props.required}
        />
      </div>
      {props.errorMsg && (
        <div className={props.errorDiv}>{props.errorMsg}</div>
      )}
    </div>
  )
})

export default Input;
