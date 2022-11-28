import Icon from '@comps/Icon'
import { useState } from 'react'
import Modal from '..'
export interface ModalDeleteType {
  handleDelete: (itemId: string) => void
  deleteSuccessful: () => void
  itemLabel?: string
  itemId?: string
  deleteText: string | null
  modalTitle: string
  buttonType: 'icon' | 'btn'
  disabled: boolean
}
export default function ModalDelete({
  handleDelete = () => {},
  deleteSuccessful = () => {},
  itemLabel = 'element',
  itemId = '',
  deleteText = null,
  modalTitle = 'delete element',
  buttonType = 'icon', // icon | btn
  disabled = false
}: ModalDeleteType) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  const [buttonLabelModal, setButtonLabelModal] = useState('Delete')

  const functionDelete = async () => {
    setButtonLabelModal('Deleted')

    const deleteFunc = async () => {
      try {
        if (handleDelete && typeof handleDelete === 'function') {
          handleDelete(itemId)
        } else {
          console.error('handleDelete is not defined')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setButtonLabelModal('Delete')
        deleteSuccessful()
        setTimeout(() => {
          setButtonLabelModal('Delete')
          setOpen(false)
        }, 1000)
      }
    }
    deleteFunc()
  }
  return (
    <div>
      {buttonType === 'icon' ? (
        <button
          disabled={disabled}
          onClick={() => handleOpen()}
          className="text-error"
        >
          <Icon name="delete" />
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={() => handleOpen()}
          className="btn text-error"
        >
          <span className="mr-1">Delete</span>
          <Icon name="delete" />
        </button>
      )}
      <Modal title={modalTitle} open={open} handleOpen={() => handleOpen()}>
        <div className="text-center whitespace-pre-line">
          {deleteText ??
            `¿Are you sure delete this element
           ${itemLabel.toUpperCase()} 
           permanently?`}

          <div className="w-full justify-evenly flex my-4 ">
            <button
              className={'btn-outline btn btn-sm'}
              onClick={() => {
                handleOpen()
              }}
            >
              Cancel
            </button>
            <button
              className={'btn-error  btn btn-sm'}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                functionDelete()
              }}
            >
              {buttonLabelModal}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
