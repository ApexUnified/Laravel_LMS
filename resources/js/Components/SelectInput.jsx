import React from 'react'

export default function SelectInput({ Name, Id, CustomCss, Required = false, InputName, Error, items, Action, Value, itemKey, Multiple = false }) {
    return (
        <>
            <div className={`${CustomCss} w-full`}>
                <label htmlFor={Id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    {InputName}
                    {Required && <span className="text-red-500 dark:text-white"> *</span>}
                </label>

                <div className="relative">
                    <select
                        name={Name}
                        id={Id}
                        onChange={Action}
                        required={Required}
                        value={Value}
                        className="dark:bg-dark-900 border-error-300 shadow-theme-xs focus:border-error-300 focus:ring-error-500/10 dark:border-error-700 dark:focus:border-error-800 w-full  rounded-lg border bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                        {...Multiple ? { multiple: true } : {}}
                    >
                        <option value="" hidden>Select {InputName}</option>
                        {items.map((item, index) => {
                            return (
                                <option key={index} value={item.id ?? item[itemKey]}>{item[itemKey]}</option>
                            )
                        })}
                    </select>


                </div>


                <div className="h-5">
                    {Error &&
                        (
                            <p className="text-red-500 dark:text-white mt-1.5">
                                {Error}
                            </p>
                        )
                    }
                </div>
            </div>
        </>
    )
}
