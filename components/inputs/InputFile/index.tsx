import { useState } from 'react';
import PreviewFile from './PreviewFile';

export interface InputFileType {
  disabled?: boolean;
  setFile: (file: string) => Promise<string>;
  file: string;
  label: string;
  // name: string;
}
interface Uploaded {
  url: string;
}
const InputFile = ({
  disabled,
  //handleChange,
  label,
  // handleDelete,
  //name = 'inputFile',
  file,
  setFile,
}: InputFileType) => {
  const [previewFile, setPreviewFile] = useState<string | undefined>(file);
  const [uploading, setUploading] = useState(false);

  const handleDelete = (urlFile: string) => {
    console.log('delete');
  };

  const handleChange = async (e: any): Promise<string> => {
    console.log('change');

    return '';
  };

  return (
    <>
      <PreviewFile
        file={previewFile}
        previewSize="xl"
        handleDelete={() => handleDelete(file)}
        uploading={uploading}
      />
      <div className="form-control mx-auto">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          // name={name}
          onChange={(e) => {
            setUploading(true);
            handleChange(e)
              .then((res) => setPreviewFile(res))
              .finally(() => setUploading(false));
          }}
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
          disabled={disabled}
          accept=".pdf"
        />
      </div>
    </>
  );
};

export default InputFile;
