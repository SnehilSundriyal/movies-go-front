import React from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const Select = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-400">
                {props.title}
            </label>

            <div className="mt-2 grid grid-cols-1">
                <select
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={props.onChange}
                >
                    <option value="">{props.placeHolder}</option>
                    {props.options.map((option) => {
                        return (
                            <option
                                value={option.id}
                                key={option.id}
                            >
                                {option.value}
                            </option>
                        )
                    })}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
                <div className={props.errorDiv}>{props.errorMsg}</div>
            </div>
        </div>
    )
}

export default Select;