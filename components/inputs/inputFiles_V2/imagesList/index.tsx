import PreviewImage from '@comps/previewImage'

export interface ImagesListType {
  images: Image[] | any[]
  childrenClassName?: string
  onDeleteImage?: (url: string) => void
  showDelete?: boolean
}

interface Image {
  url: string
  uploading?: boolean
}

const ImagesList = ({
  images = [],
  childrenClassName,
  onDeleteImage,
  showDelete = true
}: ImagesListType) => {
  const handleOpenDelete = async (url: Image['url']) => {
    if (!url) return console.log('no valid url')
    if (onDeleteImage) onDeleteImage(url)
  }
  return (
    <>
      {images?.map(({ url, uploading }, i) => (
        <div key={url} className={` ${childrenClassName ?? ''}  `}>
          <PreviewImage
            image={url}
            showDelete={showDelete}
            uploading={uploading}
            previewSize="full"
            handleDelete={async () => await handleOpenDelete(url)}
          />
        </div>
      ))}
    </>
  )
}

export default ImagesList
