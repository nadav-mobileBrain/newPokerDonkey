import React from "react";
import Dialog from "react-native-dialog";

interface DialogComponentProps {
  handleCancel: () => void;
  handleConfirm: () => void;
  titleText: string;
  descriptionText: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  handleCancel,
  handleConfirm,
  titleText,
  descriptionText,
}) => {
  return (
    <Dialog.Container visible={true}>
      <Dialog.Title style={{ color: "black" }}>{titleText}</Dialog.Title>
      <Dialog.Description style={{ color: "black" }}>
        {descriptionText}
      </Dialog.Description>
      <Dialog.Button label="No" onPress={handleCancel} />
      <Dialog.Button label="Yes" onPress={handleConfirm} />
    </Dialog.Container>
  );
};

export default DialogComponent;
