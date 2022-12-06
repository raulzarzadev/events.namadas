import PreviewImage from '@comps/previewImage'
import { FirebaseCRUD } from '@firebase/FirebaseCRUD'
import React, { useState } from 'react'

interface InputFilesType {
  label: string
  setImages: (images: ImageType[], setImagesOps?: SetImagesOps) => void
  images?: ImageType[]
  disabled?: boolean
  fieldName: string
  displayAs?: 'row' | 'grid'
}
export interface ImageType {
  url?: string | undefined
  metadata?: any
  uploading?: boolean
}
export interface SetImagesOps {
  uploading: boolean
}
const InputFiles = ({
  label = 'Files input',
  images = [],
  setImages,
  fieldName = 'EventImages',
  disabled,
  displayAs = 'row'
}: InputFilesType) => {
  const [uploadingImages, setUploadingImages] = useState<ImageType[] | []>([])

  const handleChange = async (e: any) => {
    setImages([], { uploading: true })
    const files = e.target.files
    setUploadingImages(
      [...files].map(() => {
        return { uploading: true }
      })
    )

    const uploadingFiles = [...files].map(async (file) => {
      const imageUploaded = await FirebaseCRUD.uploadFileAsync({
        file,
        fieldName
      })
      return imageUploaded
    })

    const newImages: any = await Promise.all(uploadingFiles)
    setUploadingImages([])
    setImages([...images, ...newImages], { uploading: false })
  }
  const handleSetAsFirst = (index: number) => {
    const _images = [...images]
    const chosenImage = _images.splice(index, 1)[0]
    _images.splice(0, 0, chosenImage)
    setImages(_images)
  }

  const handleDelete = async (urlFile: string) => {
    return await FirebaseCRUD.deleteFile({ url: urlFile })
      .then((res) => {
        console.log(res)
        setImages(images.filter((image) => image.url !== urlFile))
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <label className="pl-1">{label}</label>
      {displayAs === 'grid' && (
        <div className={`grid grid-cols-3`}>
          <div className="aspect-square ">
            <SquareInputFile
              disabled={disabled}
              handleChange={handleChange}
              label={label}
            />
          </div>
          <>
            {[...images, ...uploadingImages]?.map(({ url, uploading }, i) => (
              <div key={`${url ?? ''}-${i}`} className={` aspect-square `}>
                <PreviewImage
                  image={url}
                  uploading={uploading}
                  previewSize="full"
                  //  handleDelete={() => handleOpenDelete(url)}
                />
              </div>
            ))}
          </>
        </div>
      )}
      {displayAs === 'row' && (
        <div className={`flex overflow-auto p-2`}>
          <div className="flex ">
            <div className="aspect-square w-36">
              <SquareInputFile
                disabled={disabled}
                handleChange={handleChange}
                label={label}
              />
            </div>
            <>
              {[...images, ...uploadingImages]?.map(({ url, uploading }, i) => (
                <div
                  key={`${url ?? ''}-${i}`}
                  className={` aspect-square w-36 relative`}
                >
                  {i === 0 || (
                    <div className="absolute z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleSetAsFirst(i)
                        }}
                        className="btn btn-xs opacity-80"
                      >
                        set as first
                      </button>
                    </div>
                  )}
                  <PreviewImage
                    image={url}
                    uploading={uploading}
                    previewSize="full"
                    handleDelete={async () => await handleDelete(url)}
                  />
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  )
}

interface InputFile {
  disabled?: boolean
  handleChange: (props: any) => {}
  label: string
}
const SquareInputFile = ({ disabled, handleChange, label }: InputFile) => {
  // TODO add label to accessibility
  return (
    <label>
      <div
        className={`h-full w-full hover:border-dotted  hover:border-white flex justify-center items-center rounded-sm relative cursor-pointer border-dashed border-2  ${
          disabled ? 'opacity-30 cursor-wait ' : ''
        }`}
      >
        <div className="absolute text-[110px] transform -translate-y-2">+</div>
        <input
          disabled={disabled}
          accept=".jpg, .png, .jpeg, .webp"
          onChange={handleChange}
          className="hidden"
          type={'file'}
          multiple
        />
      </div>
    </label>
  )
}
export default InputFiles
