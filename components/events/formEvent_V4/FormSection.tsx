import { ReactNode } from 'react';

const FormSection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className=" py-2 my-2 bg-base-200 rounded-md">
      <h3 className="font-bold sticky -top-1  bg-base-200 py-1 ">{title}</h3>
      <div className="p-1">{children}</div>
    </div>
  );
};

export default FormSection;
