import Modal from '@comps/modal'
import Link from 'next/link'
import { useState } from 'react'

export interface PreviewFileType {
  file?: string | null
  previewSize: PreviewFIleSizes
  handleDelete?: any
  uploading?: boolean
  showDelete?: boolean
}
const sizes = {
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-24',
  xl: 'w-32',
  full: 'w-full'
} as const

export type PreviewFIleSizes = keyof typeof sizes
const PreviewFile = ({
  file,
  previewSize = 'md',
  handleDelete,
  uploading,
  showDelete = true
}: PreviewFileType) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)

  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {!!uploading && (
        <progress className="progress progress-primary"></progress>
      )}
      {!file && !uploading && <span className="italic">No file</span>}
      {file && (
        <>
          <div
            className={`
            ${sizes[previewSize]}
             relative 
             mx-auto
             opacity-60 
             hover:opacity-100
             shadow-lg 
             cursor-pointer
             text-center
            `}
            onClick={handleOpenModal}
          >
            <span className="">
              You can see and download
              <span className="flex justify-center">
                <Link href={file}>
                  <a target="_blank" className="link">
                    {' here '}
                  </a>
                </Link>
                <span className="mx-2">or</span>
                {showDelete && (
                  <span className=" right-0 ">
                    <button
                      className=" hover:text-error text-white link mx-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleOpenDelete()
                      }}
                    >
                      {'  delete '}
                    </button>
                    <Modal
                      open={openDelete}
                      handleOpen={handleOpenDelete}
                      title="Delete file"
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
                            handleDelete && handleDelete()
                          }}
                        >
                          Delete file
                        </button>
                      </div>
                    </Modal>
                  </span>
                )}
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  )
}
export default PreviewFile
