import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Checkbox } from './ui/checkbox'
import { Field, FieldError, FieldLabel } from './ui/field'

interface CheckboxInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  inputProps?: ComponentProps<typeof Checkbox>
}

export function CheckboxInput<T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
}: CheckboxInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, onBlur, onChange, ref, value, disabled },
        fieldState,
      }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex gap-2">
            <Checkbox
              name={name}
              onBlur={onBlur}
              onCheckedChange={onChange}
              ref={ref}
              checked={value}
              disabled={disabled}
              {...inputProps}
              id={name}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
