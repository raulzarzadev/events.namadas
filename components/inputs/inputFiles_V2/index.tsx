import { FirebaseCRUD } from '@firebase/FirebaseCRUD';
import Image from 'next/image';
import React, { useState } from 'react';
import ImagesList from './imagesList';

interface InputFilesType {
  label: string;
  setImages: (images: Image[], setImagesOps?: SetImagesOps) => void;
  images?: Image[];
  disabled?: boolean;
  fieldName: string;
  displayAs?: 'row' | 'grid';
}
interface Image {
  url?: string | undefined;
  metadata?: any;
  uploading?: boolean;
}
export interface SetImagesOps {
  uploading: boolean;
}
const InputFiles = ({
  label = 'Files input',
  images = [],
  setImages,
  fieldName = 'EventImages',
  disabled,
  displayAs = 'row',
}: InputFilesType) => {
  const [uploadingImages, setUploadingImages] = useState<Image[] | []>([]);

  const handleChange = async (e: any) => {
    setImages([], { uploading: true });
    const files = e.target.files;
    setUploadingImages(
      [...files].map(() => {
        return { uploading: true };
      })
    );

    const uploadingFiles = [...files].map(async (file) => {
      const imageUploaded = await FirebaseCRUD.uploadFileAsync({
        file,
        fieldName: fieldName,
      });
      return imageUploaded;
    });

    const newImages: any = await Promise.all(uploadingFiles);
    setUploadingImages([]);
    setImages([...images, ...newImages], { uploading: false });
  };

  const handleDeleteImage = (url: string) => {
    FirebaseCRUD.deleteFile({ url })
      .then((res) => {
        console.log(res, 'image deleted');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        const filteredList = [...images].filter((image) => image.url !== url);
        setImages([...filteredList]);
      });
  };

  return (
    <div>
      <label className="pl-1">{label}</label>
      <div className="grid">
        {displayAs === 'row' && (
          <div className="grid grid-flow-col overflow-auto gap-1 p-1 pb-2">
            <div className="w-36 h-36 ">
              <SquareInputFile
                disabled={disabled}
                handleChange={handleChange}
                label={label}
              />
            </div>
            <ImagesList
              images={[...images, ...uploadingImages]}
              childrenClassName={'w-36 h-36  '}
              onDeleteImage={handleDeleteImage}
            />
          </div>
        )}
        {displayAs === 'grid' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 h-full ">
            <div className="w-full h-full">
              <SquareInputFile
                disabled={disabled}
                handleChange={handleChange}
                label={label}
              />
            </div>
            <ImagesList
              images={[...images, ...uploadingImages]}
              childrenClassName={'w-full h-full '}
              onDeleteImage={handleDeleteImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
interface InputFile {
  disabled?: boolean;
  handleChange: (props: any) => {};
  label: string;
}
const SquareInputFile = ({ disabled, handleChange, label }: InputFile) => {
  // TODO add label to accessibility
  return (
    <label>
      <div
        className={`h-full w-full hover:border-dotted  hover:border-white flex justify-center items-center rounded-sm relative cursor-pointer border-dashed border-2  ${
          disabled && 'opacity-30 cursor-wait '
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
  );
};
export default InputFiles;
