const LoadingText = ({ width }: { width?: number }) => {
  return (
    <div
      className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-4 ${
        width ? `w-[${width}px]` : 'w-full'
      }`}
    ></div>
  )
}

export default LoadingText
