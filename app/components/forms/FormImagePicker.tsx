import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "./ImageInputList";

interface FormImagePickerProps {
  name: string;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({ name }) => {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<Record<string, any>>();
  const imageUris: string[] = values[name];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormImagePicker;
