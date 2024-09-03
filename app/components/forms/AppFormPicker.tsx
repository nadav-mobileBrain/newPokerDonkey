import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

interface AppFormPickerProps {
  items: any[]; // Adjust 'any' to a more specific type if possible
  name: string;
  numberOfColumns?: number;
  PickerItemComponent?: React.ComponentType<any>;
  placeholder: string;
  width?: string | number;
}

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}: AppFormPickerProps) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<Record<string, any>>();

  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item: any) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
