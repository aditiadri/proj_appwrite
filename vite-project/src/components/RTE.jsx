import React from 'react';
import { useEffect } from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE(name,control,label,defaultValue='') {
  return (
<div className='w-full'>{label && <label className='text-sm text-gray-300 pl-1.5'>{label}</label>}
<Controller name={name||"content"}></Controller>
</div>
  )
}

export default RTE 