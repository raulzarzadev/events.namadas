import Icon from '@comps/Icon';
import Modal from '@comps/modal';
import { useState } from 'react';

export interface PreviewFileType {
  file?: string;
  previewSize: PreviewFIleSizes;
  handleDelete?: any;
  uploading?: boolean;
  showDelete?: boolean;
}
const sizes = {
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-24',
  xl: 'w-32',
  full: 'w-full',
} as const;

export type PreviewFIleSizes = keyof typeof sizes;
const PreviewFile = ({
  file,
  previewSize = 'md',
  handleDelete,
  uploading,
  showDelete,
}: PreviewFileType) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {uploading && <progress className="progress progress-primary"></progress>}
      {!file && !uploading && <span className="italic">No file</span>}
      {file && (
        <>
          <div
            className={`
            ${sizes[previewSize]}
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
            {showDelete && (
              <div className="absolute right-0 ">
                <button
                  className=" hover:text-error text-white "
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenDelete();
                  }}
                >
                  <Icon name="delete" />
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
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete && handleDelete();
                      }}
                    >
                      Delete file
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
          <Modal title="file" open={openModal} handleOpen={handleOpenModal}>
            <>
              <div className="relative w-full aspect-square mx-auto "></div>
            </>
          </Modal>
        </>
      )}
    </div>
  );
};
export default PreviewFile;
