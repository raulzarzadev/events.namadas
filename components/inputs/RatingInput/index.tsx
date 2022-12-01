const RatingInput = () => {
  const handleChange = ({ target: { name, value } }: any) => {
    console.log({ name, value })
  }
  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="rating rating-sm">
          <input
            type="radio"
            name="rating-6"
            className="mask mask-star-2 bg-orange-400"
            onChange={handleChange}
          />
          <input
            type="radio"
            name="rating-6"
            className="mask mask-star-2 bg-orange-400"
            checked
            onChange={handleChange}
          />
          <input
            type="radio"
            name="rating-6"
            className="mask mask-star-2 bg-orange-400"
            onChange={handleChange}
          />
          <input
            type="radio"
            name="rating-6"
            className="mask mask-star-2 bg-orange-400"
            onChange={handleChange}
          />
          <input
            type="radio"
            name="rating-6"
            className="mask mask-star-2 bg-orange-400"
            onChange={handleChange}
          />
        </div>
        <span className="text-xs align-bottom ">(250)</span>
      </div>
    </div>
  )
}

export default RatingInput
