import { useState } from "react";

const Chip=({label='', checked=false})=>{
  const [isChecked, setIsChecked]=useState(checked)
  const handleChange=({target:{checked}}:any)=>{
    console.log(checked);
    setIsChecked(checked)
  }
  return (
    <div>
      <span>
        <label
          className={` 
          whitespace-nowrap
        border
        rounded-full
        p-1
        px-2
        flex
        justify-center
        items-center
        w-min
        hover:border-primary
        cursor-pointer
        shadow-sm
        active:shadow-none
        ${isChecked ? ' bg-success text-black shadow-white ' : ' bg-base-100 '} 
        `}
        >
          {label}
          <input className="hidden" onChange={handleChange} type={'checkbox'} />
        </label>
      </span>
    </div>
  );
}

export default Chip