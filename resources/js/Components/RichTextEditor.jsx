import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function RichTextEditor({ value, onChange, Id, InputName, Required = false, Error }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean']
        ]
    };
    return (
        <>
            <label htmlFor={Id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                {InputName}
                {Required && <span className="text-red-500 dark:text-white"> *</span>}
            </label>

            <ReactQuill
                className='dark:text-white dark:bg-gray-900 '
                theme="snow"
                value={value}
                style={{
                    borderRadius: '8px',
                }}
                onChange={onChange}
                modules={modules}

            />

            <div className="h-5">
                {Error &&
                    (
                        <p className="text-red-500 dark:text-white mt-1.5">
                            {Error}
                        </p>
                    )
                }
            </div>
        </>
    )
}
