import PreviewImage from '@comps/previewImage'
import { FirebaseCRUD } from '@firebase/FirebaseCRUD'
import React, { useState } from 'react'

interface InputFilesType {
  label: string
  imagesUploaded: (image: ImageType) => {}
  defaultImages?: ImageType[]
  onDeleteImage?: any
  onLoading?: any
  disabled?: undefined | boolean
}
interface ImageType {
  url?: string | undefined
  metadata?: any
  uploading?: boolean
}

const InputFiles = React.forwardRef(
  ({
    label = 'Files input',
    imagesUploaded,
    onDeleteImage,
    defaultImages,
    onLoading = () => {},
    disabled
  }: InputFilesType) => {
    const [images, setImages] = useState(defaultImages ?? [])
    const [uploadingImages, setUploadingImages] = useState<ImageType[] | []>([])

    const handleChange = async (e: any): Promise<void> => {
      const files = e.target.files
      onLoading(true)
      setUploadingImages(
        [...files].map(() => {
          return { uploading: true }
        })
      )

      const uploadingFiles = [...files].map(async (file) => {
        const imageUploaded = await FirebaseCRUD.uploadFileAsync({
          file,
          fieldName: 'EventImages'
        })
        return imageUploaded
      })

      const newImages: any = await Promise.all(uploadingFiles)
      // console.log(newImages)
      setUploadingImages([])
      imagesUploaded(newImages)
      setImages([...images, ...newImages])
      onLoading(false)
    }

    const handleOpenDelete = async (url: string | undefined) => {
      // console.log('delete url', url)
      if (!url) return console.log('no valid url')
      onLoading(true)
      onDeleteImage(url)
      onLoading(false)
    }
    return (
      <div>
        <label>
          <div
            className={`h-12 w-full hover:border-dotted  hover:border-white flex justify-center items-center rounded-lg relative cursor-pointer border-dashed border-2  ${
              disabled ? 'opacity-30 cursor-wait ' : ''
            }`}
          >
            <div className="absolute ">{label}</div>
            <input
              // ref={ref}
              disabled={disabled}
              accept=".jpg,.png,.jpeg"
              onChange={(e) => {
                handleChange(e).then((res) => console.log({ res }))
              }}
              className="hidden"
              type={'file'}
              multiple
            />
          </div>
        </label>
        <div className="w-full max-w-md mx-auto overflow-auto">
          <div className="grid grid-cols-4 gap-1 p-1">
            {[...images, ...uploadingImages]?.map(({ url, uploading }, i) => (
              <div key={`${url ?? ''}-${i}`} className="">
                <PreviewImage
                  image={url}
                  uploading={uploading}
                  previewSize="full"
                  handleDelete={async () => await handleOpenDelete(url)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
InputFiles.displayName = 'InputFiles'

export default InputFiles
