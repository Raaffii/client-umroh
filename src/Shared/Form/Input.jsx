import { useState, useEffect } from "react";

export default function Input({ type, placeholder, name, errorText, onChanges, setValueSet }) {
  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState(setValueSet);

  const changeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChanges(inputValue);
    setIsValid(inputValue.trim() !== "");
  };

  if (setValueSet) {
    useEffect(() => {
      onChanges(setValueSet);
      setIsValid(setValueSet.trim() !== "");
    }, []);
  }

  let label = isValid ? placeholder : errorText;

  return (
    <>
      <label
        htmlFor={name}
        style={{
          color: isValid ? "" : " #FF0000",
        }}>
        {label}
      </label>
      {type != "textarea" ? (
        <input
          type={type}
          className='form-control'
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={changeHandler}
          style={{
            backgroundColor: isValid ? "" : " #ff7373",
            borderWidth: isValid ? "" : "2px",
          }}
        />
      ) : (
        <textarea
          className='form-control'
          id='exampleTextarea1'
          rows='4'
          value={value}
          onChange={changeHandler}
          style={{
            backgroundColor: isValid ? "" : " #ff7373",
            borderWidth: isValid ? "" : "2px",
          }}></textarea>
      )}
    </>
  );
}
