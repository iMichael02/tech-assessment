import { Input } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";

type FormFieldProps = {
  control: Control<FieldValues, any>;
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  control,
  label,
  name,
  type,
  placeholder,
  required,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-left font-bold">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            type={type}
            required={required}
            placeholder={placeholder}
            className={type === "number" ? "small-input" : ""}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default FormField;
