import { FormGroup, Label, Input } from 'reactstrap';

export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  options,
  error,
  required = false,
}) {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>

      {type === 'select' ? (
        <Input
          id={id}
          name={name}
          type="select"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Input>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      )}

      {error && (
        <p data-testid={`${name}_error`} style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </FormGroup>
  );
}