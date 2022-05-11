import {useState} from "react";

const useFormFields = (initialState: any) => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: any) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}

export default useFormFields
