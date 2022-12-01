import Icon from '@comps/Icon'
import useCopyToClipboard from 'hooks/useCopyToClipboard'

const InputShare = ({
  url,
  title,
  text
}: {
  url: string
  title: string
  text: string
}) => {
  const [currentValor, copy, visible] = useCopyToClipboard()
  return (
    <div>
      <button
        className={`btn  btn-sm ${visible ? '' : 'btn-primary'}`}
        onClick={(e) => {
          e.preventDefault()
          if (navigator.share) {
            navigator
              .share({
                title,
                text,
                url
              })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error))
          } else {
            console.error("Browser doesn't support Web Share API")
            // @ts-expect-error
            copy(url)
          }
        }}
      >
        {visible && currentValor === url ? 'url copied' : 'compartir'}
        <span className="mx-2">
          <Icon name="share" />
        </span>
      </button>
    </div>
  )
}

export default InputShare
