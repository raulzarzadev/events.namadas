import { FirebaseCRUD } from '@firebase/FirebaseCRUD';
import Image from 'next/image';
import React, { useState } from 'react';
import ImagesList from './imagesList';

interface InputFilesType {
  label: string;
  setImages: (images: Image[]) => void;
  images?: Image[];
  disabled?: boolean;
}
interface Image {
  url?: string | undefined;
  metadata?: any;
  uploading?: boolean;
}

const InputFiles = ({
  label = 'Files input',
  images = [],
  setImages,
  disabled,
}: InputFilesType) => {
  const [upladingImages, setUploadingImages] = useState<Image[] | []>([]);

  const handleChange = async (e: any) => {
    const files = e.target.files;
    setUploadingImages(
      [...files].map(() => {
        return { uploading: true };
      })
    );

    const ulpadingFiles = [...files].map(async (file) => {
      const imageUploaded = await FirebaseCRUD.uploadFileAsync({
        file,
        fieldName: 'EventImages',
      });
      return imageUploaded;
    });

    const newImages: any = await Promise.all(ulpadingFiles);
    setUploadingImages([]);
    setImages([...images, ...newImages]);
  };

  const handleDeleteImage = (url: string) => {
    FirebaseCRUD.deleteFile({ url })
    .then((res) => {
      console.log(res, 'image deleted')
    })
    .catch(err => {
      console.error(err);
    }).finally(()=>{
      const filteredList = [...images].filter((image)=>image.url!==url)
      setImages([...filteredList])

    })
  };

  return (
    <div>
      <label className="pl-1">Add some images</label>
      <div className="grid">
        <div className="grid grid-flow-col overflow-auto gap-1 p-1 pb-2">
          <div className="w-36 h-36 ">
            <SquareInputFile
              disabled={disabled}
              handleChange={handleChange}
              label={label}
            />
          </div>

          <ImagesList
            images={[...images, ...upladingImages]}
            childrensClassName={'w-36 h-36  '}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      </div>
    </div>
  );
};
interface InputFile {
  disabled?:boolean
  handleChange:(props:any)=>{}
  label:string
}
const SquareInputFile=({disabled, handleChange, label}:InputFile)=>{
  // TODO add label to accesiblity
  return (
    <label>
      <div
        className={`h-full w-full hover:border-dotted  hover:border-white flex justify-center items-center rounded-sm relative cursor-pointer border-dashed border-2  ${
          disabled && 'opacity-30 cursor-wait '
        }`}
      >
        <div className="absolute text-[110px] transform -translate-y-2">
          +
        </div>
        <input
          disabled={disabled}
          accept=".jpg,.png,.jpeg"
          onChange={handleChange}
          className="hidden"
          type={'file'}
          multiple
        />
      </div>
    </label>
  );
}
export default InputFiles;
