import Icon from '@comps/Icon'
import Modal from '@comps/modal'
import Image from 'next/image'
import { useState } from 'react'

type Sizes = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export interface PreviewImageType {
  label?: null | string
  image?: string
  previewSize?: Sizes
  uploading?: boolean
  handleDelete?: () => {}
  showOrigin?: boolean
  showDelete?: boolean
}

const PreviewImage = ({
  label = null,
  image = '',
  previewSize = 'md',
  uploading,
  handleDelete,
  showDelete = true,
  showOrigin = false
}: PreviewImageType) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)
  const size = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-24',
    xl: 'w-32',
    full: 'w-full'
  }

  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {label && <span className="">{label}</span>}
      {uploading && <progress className="progress progress-primary"></progress>}
      {!image && !uploading && <span className="italic">No image</span>}
      {image && (
        <>
          <div
            className={`
            ${size[previewSize]}
            relative 
             aspect-square
             mx-auto
             opacity-60 
            hover:opacity-100
             shadow-lg 
             cursor-pointer
            `}
            onClick={handleOpenModal}
          >
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              quality="1"
              placeholder="blur"
              blurDataURL={image}
            />
            {showDelete && (
              <div className="absolute right-0 flex ">
                <button
                  className=" btn btn-error btn-xs btn-circle btn-ghost text-error  "
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleOpenDelete()
                  }}
                >
                  <Icon name="delete" />
                </button>
                <Modal
                  open={openDelete}
                  handleOpen={handleOpenDelete}
                  title="Delete image"
                >
                  <div className="flex w-full justify-around">
                    <button
                      className="btn btn-outline"
                      onClick={() => setOpenDelete(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete?.()
                      }}
                    >
                      Delete image
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
          <Modal title="Image" open={openModal} handleOpen={handleOpenModal}>
            <>
              <div className="relative w-full aspect-square mx-auto ">
                <Image
                  src={image}
                  layout="fill"
                  objectFit="contain"
                  quality={'100'}
                />
              </div>
              {showOrigin && (
                <a href={image} target={'_blank'} rel="noreferrer">
                  {image}
                </a>
              )}
            </>
          </Modal>
        </>
      )}
    </div>
  )
}

export default PreviewImage
