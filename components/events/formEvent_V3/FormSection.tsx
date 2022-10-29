import { ReactNode } from "react";

const FormSection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="p-1 py-2 my-2 mx-1 bg-base-200 rounded-md">
      <h3 className="font-bold">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default FormSection