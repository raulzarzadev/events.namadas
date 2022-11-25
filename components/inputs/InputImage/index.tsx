import PreviewImage from '@comps/previewImage';
import { useState } from 'react';

interface InputImage {
  disabled?: boolean;
  handleChange: (props: any) => Promise<string>;
  handleDelete: (imageUrl: string, fieldName: string) => {};
  label: string;
  name: string;
  defaultImage: string;
}
interface UploadedImage {
  url: string;
}
const InputImage = ({
  disabled,
  handleChange,
  label,
  handleDelete,
  name = 'inputFile',
  defaultImage,
}: InputImage) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [uploading, setUploading] = useState(false);
  return (
    <>
      <PreviewImage
        image={previewImage || defaultImage}
        previewSize="xl"
        handleDelete={() => handleDelete(previewImage || defaultImage, name)}
        uploading={uploading}
      />
      <div className="form-control mx-auto">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          name={name}
          onChange={(e) => {
            setUploading(true);
            handleChange(e)
              .then((res) => setPreviewImage(res))
              .finally(() => setUploading(false));
          }}
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
          disabled={disabled}
          accept=".jpg, .png, .jpeg, .webp"
        />
      </div>
    </>
  );
};

export default InputImage;
