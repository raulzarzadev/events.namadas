import { FirebaseCRUD } from '@firebase/FirebaseCRUD';
import { useState } from 'react';
import PreviewFile from './PreviewFile';

export interface InputFileType {
  disabled?: boolean;
  setFile: (file: string | null) => Promise<string>;
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
  const fieldName = 'eventsPdf';
  const handleDelete = async (urlFile: string) => {
    setFile(null);
    return await FirebaseCRUD.deleteFile({ url: urlFile }).then((res) =>
      console.log(res)
    );
  };

  const handleChange = async (e: any): Promise<string> => {
    console.log('change');
    const files = e.target.files;
    const imageUploaded = await FirebaseCRUD.uploadFileAsync({
      file: files[0],
      fieldName: fieldName,
    });
    const urlFile = imageUploaded.url;
    return urlFile;
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
          onChange={(e) => {
            setUploading(true);
            handleChange(e)
              .then((res) => {
                setPreviewFile(res);
                setFile(res);
              })
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
