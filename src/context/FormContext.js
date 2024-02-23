import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // formValues state will hold the values of all the form components
  const [formValues, setFormValues] = useState({});
  // disabledValues state will hold the values of all the disabled form components
  const [disabledValues, setDisabledValues] = useState([]);

  const handleChange = (key, value, action) => {
    // action can be mount or unmount
    // console.log('handling change for', key, value)
    // handle change based on the prevValue not the current value
    if (action === 'mount') {
      // add the key and its value to the formValues state
      // console.log('mounting with', key, value)
      setFormValues((prevValues) => ({
        ...prevValues,
        [key]: value
      }))
    }

  }

  const generateFinalJson = () => {
    // console.log('disabledValues for generateFinalJson', disabledValues)
    const finalFormValues = { ...formValues };
    disabledValues.forEach((key) => {
      delete finalFormValues[key];
    });
    
    // console.log('finalFormValues after deletion', finalFormValues)
    return finalFormValues;
  };

  // console.log('Final formValues from FormContext', formValues)
  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues,
        handleChange,
        disabledValues,
        setDisabledValues,
        generateFinalJson,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
// custom hook
export const useFormValues = () => {

  const contextValue = useContext(FormContext);
  if (contextValue === undefined) {
    throw new Error("useFormValues must be within a FormContext");
  }

  return contextValue;
};