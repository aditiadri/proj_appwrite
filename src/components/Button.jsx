import React, { Children } from 'react'

export default function Button({
    Children,
    type="button",
    bgColor="bg-blue",


textColor="text-white",
className='',
...props
}) {
  return (
<button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor}
${className }`}{...props}>{Children}</button>
  )
    }

 