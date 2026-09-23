type FormFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function FormField({
  name,
  label,
  required = true,
  error,
  children,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <fieldset className="space-y-2 border-0 p-0 m-0">
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-4 text-[#334155]"
      >
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-error text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
