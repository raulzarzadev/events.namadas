const LoadingTitle = ({ width }:{width?:number}) => {
  return (
    <div
      className={`h-4 bg-gray-200 rounded-full dark:bg-gray-700  mb-4 ${
        width ? `w-[${width}px]` : 'w-full'
      }`}
    ></div>
  )
}

export default LoadingTitle
