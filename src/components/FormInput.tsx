import { ChangeEvent, FocusEvent, InputHTMLAttributes } from "react";
import { FormField } from "./FormField";

type FormInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onBlur"
> & {
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
};

export function FormInput({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = true,
  type = "text",
  placeholder,
  disabled,
  ...rest
}: FormInputProps) {
  const errorId = `${name}-error`;

  return (
    <FormField name={name} label={label} required={required} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full p-3 text-base leading-5 rounded-md outline outline-1 text-[#121316] bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-[#0CA5E9] ${
          error ? "outline-error" : "outline-[#CBD5E1]"
        }`}
        {...rest}
      />
    </FormField>
  );
}
