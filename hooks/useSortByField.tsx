import { useEffect, useState } from 'react'

const useSortByField = (array: any[]) => {
  useEffect(() => {
    setArraySorted(array)
  }, [array])
  const [sortReverse, setSortReverse] = useState(true)
  const [arraySorted, setArraySorted] = useState(array)

  const sortByField = (arr: any[], fieldName: string, reverse?: boolean) => {
    const auxArr = [...arr]
    return auxArr.sort((a, b) => {
      if (a[fieldName] < b[fieldName]) return reverse ? -1 : 1
      if (a[fieldName] > b[fieldName]) return reverse ? 1 : -1
      return 0
    })
  }

  const handleSortBy = (fieldName: string) => {
    setArraySorted(sortByField(array, fieldName, sortReverse))
    setSortReverse(!sortReverse)
  }

  return { arraySorted, handleSortBy }
}

export default useSortByField
