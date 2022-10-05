import { useState } from "react";

const EventsFilter = () => {
  return (
    <div>
      <h2 className="text-center text-2xl">Encuentra un evento para tí</h2>
      <div className=" max-w-sm mx-auto my-2">
        <h3 className="mb-2">Por deporte:</h3>
        <div className="flex mx-auto justify-around ">
          <FilterChip label="Natación" />
          <FilterChip label="Ciclismo" />
          <FilterChip label="Carrera" />
        </div>
      </div>
      <div className=" max-w-sm mx-auto ">
        <h3 className="mb-2">Por fecha:</h3>
        <div className="flex mx-auto justify-around flex-wrap gap-2 ">
          <FilterChip label="Pasados" />
          <FilterChip label="Esta semana" />
          <FilterChip label="Este mes " />
          <FilterChip label="Este año" />
        </div>
      </div>
    </div>
  );
}

const FilterChip=({label='', checked=false})=>{
  const [isChecked, setIsChecked]=useState(checked)
  const handleChange=({target:{checked}})=>{
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

export default EventsFilter;