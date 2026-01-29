import { FormGroup, Label, Input } from 'reactstrap';

export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
  options = [],
  error,
  required = false,
  plaintext = false,
}) {
  const isSelect = type === 'select';

  return (
    <FormGroup>
      <Label for={id}>{label}</Label>

      {isSelect ? (
        <Input
          id={id}
          name={name}
          type="select"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          plaintext={plaintext}
          readOnly={plaintext}
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
          value={!plaintext ? value : undefined}
          defaultValue={plaintext ? defaultValue : undefined}
          onChange={!plaintext ? onChange : undefined}
          onBlur={!plaintext ? onBlur : undefined}
          placeholder={placeholder}
          required={required}
          plaintext={plaintext}
          readOnly={plaintext}
        />
      )}

      {!plaintext && error && (
        <p data-testid={`${name}_error`} style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </FormGroup>
  );
}