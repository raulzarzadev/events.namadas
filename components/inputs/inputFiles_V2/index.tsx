import PreviewImage from '@comps/prevewImage';
import { FirebaseCRUD } from '@firebase/FirebaseCRUD';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';

interface InputFilesType {
  label: string;
  imagesUploaded: (image: Image) => {};
  defaultImages?: Image[];
  onDeleteImage?: any;
  onLoading?: any;
  disabled?: undefined | boolean;
}
interface Image {
  url?: string | undefined;
  metadata?: any;
  uploading?: boolean;
}

const InputFiles = ({
  label = 'Files input',
  imagesUploaded=()=>{},
  onDeleteImage=()=>{},
  defaultImages=[],
  onLoading = () => {},
  disabled=false,
}) => {
  const [images, setImages] = useState(defaultImages || []);
  const [upladingImages, setUploadingImages] = useState<Image[] | []>([]);

  const handleChange = async (e: any) => {
    const files = e.target.files;
    onLoading(true);
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
    // console.log(newImages)
    setUploadingImages([]);
    imagesUploaded(newImages);
    setImages([...images, ...newImages]);
    onLoading(false);
  };

  const handleOpenDelete = async (url: string | undefined) => {
    //console.log('delete url', url)
    if (!url) return console.log('no valid url');
    onLoading(true);
    const res = await FirebaseCRUD.deleteFile({ url });
    onDeleteImage(url);
    onLoading(false);
    //console.log(res)
  };
  //console.log(images)
  //console.log(images)
  return (
    <div>
      <label>
        <div
          className={`h-32  w-40 hover:border-dotted  hover:border-white flex justify-center items-center rounded-lg relative cursor-pointer border-dashed border-2  ${
            disabled && 'opacity-30 cursor-wait '
          }`}
        >
          <div className="absolute ">{label}</div>
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
      <div className="w-full max-w-md mx-auto overflow-auto">
        <div className="grid grid-cols-4 gap-1 p-1">
          {[...images, ...upladingImages]?.map(({ url, uploading }, i) => (
            <div key={`${url}-${i}`} className="">
              <PreviewImage
                image={url}
                uploading={uploading}
                previewSize="full"
                handleDelete={() => {
                  handleOpenDelete(url);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputFiles;
