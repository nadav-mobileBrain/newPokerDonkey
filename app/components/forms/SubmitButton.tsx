import React from "react";
import { useFormikContext } from "formik";
import { GestureResponderEvent } from "react-native";
import AppButton from "../AppButton";

interface SubmitButtonProps {
  title: string;
  icon?: React.ReactNode;
  color?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  icon = null,
  color = "blue",
}) => {
  const { handleSubmit } = useFormikContext();

  const handlePress = (event: GestureResponderEvent) => {
    // Call Formik's handleSubmit without using the event parameter
    handleSubmit();
  };

  return (
    <AppButton
      title={title}
      onPress={handlePress}
      icon={icon as any}
      color={color as any}
    />
  );
};

export default SubmitButton;
