interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  handleChange: (event: any) => void;
  border?: boolean;
  error: string;
  value: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  handleChange,
  error,
  value,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="mt-1 relative rounded-md">
        <input
          type={type}
          value={value}
          name={name}
          id={name}
          autoComplete="off"
          onChange={handleChange}
          className="my-input border-b border-gray-300 mb-4"
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="-mt-3 mb-2text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
