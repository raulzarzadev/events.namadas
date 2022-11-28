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
interface ImageType {
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
                  className={` aspect-square w-36`}
                >
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
