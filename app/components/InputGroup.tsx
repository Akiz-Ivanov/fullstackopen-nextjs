import { FormState } from "../actions/blogs"

type Values = NonNullable<FormState["values"]>
type Errors = NonNullable<FormState["errors"]>

type InputGroupProps = {
  name: keyof Values
  label: string
  value?: Values[keyof Values]
  error?: Errors[string]
  type?: React.HTMLInputTypeAttribute
}

const InputGroup = ({ 
  name,
  label,
  value,
  error,
  type = "text"
}: InputGroupProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={label}
        className="w-2/3 rounded-md border-0 p-3 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-base"
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default InputGroup