import React, { ReactNode } from "react";
import { Formik, FormikConfig } from "formik";

interface AppFormProps<T> {
  initialValues: T;
  onSubmit: FormikConfig<T>["onSubmit"];
  validationSchema: any; // You can replace 'any' with the specific type if using Yup or another schema library.
  children: ReactNode;
}

const AppForm = <T extends object>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: AppFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
