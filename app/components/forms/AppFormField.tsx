import React from "react";
import { StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface AppFormFieldProps extends TextInputProps {
  name: string;
  width?: string | number;
  style?: ViewStyle;
  icon?: string;
}

function AppFormField({
  name,
  width,
  style,
  ...otherProps
}: AppFormFieldProps) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext<Record<string, any>>();

  return (
    <>
      <AppTextInput
        style={[styles.container, style]}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        value={values[name]}
        accessibilityLabel={name}
        accessibilityHint="Enter text"
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    height: 50,
  },
});

export default AppFormField;
