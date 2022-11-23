import React from 'react';
import { InputType } from '.';

interface TextareaType extends InputType {
  rows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaType>(
  (props, ref) => {
    const { label, errors, name = '', type, rows = 5 } = props;
    return (
      <div className="form-control w-full ">
        <label className="label-text ">{label}</label>
        <textarea
          type={type}
          className="textarea input-bordered resize-none"
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...props}
          rows={rows}
          ref={ref}
        />
        <label>{errors[name] && <span>{errors[name]}</span>}</label>
      </div>
    );
  }
);

export default Textarea;
