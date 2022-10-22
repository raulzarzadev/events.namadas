import PreviewImage from "@comps/prevewImage";

export interface ImagesListType {
  images: Image[] | any[];
  childrensClassName?: string;
  onDeleteImage?: (url: string) => void;
}

interface Image {
  url: string;
  uploading?: boolean;

}

const ImagesList = ({
  images = [],
  childrensClassName,
  onDeleteImage,
}: ImagesListType) => {
  const handleOpenDelete = async (url: string | undefined) => {
    if (!url) return console.log('no valid url');
    if(onDeleteImage) onDeleteImage(url);
    
  };
  return (
    <>
      {images?.map(({ url, uploading }, i) => (
        <div key={`${url}-${i}`} className={` ${childrensClassName}  `}>
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
    </>
  );
};

export default ImagesList;

