import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// Rich Text Editor wrapper
// Props: name, control, label, defaultValue
function RTE({ name = 'content', control, label, defaultValue = '' }) {
  if (!control) {
    console.warn('RTE: control prop is missing. Ensure you pass control from useForm().');
    return null;
  }
  return (
    <div className='w-full'>
      {label && <label className='text-sm text-gray-600 pl-1.5 block mb-1'>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;