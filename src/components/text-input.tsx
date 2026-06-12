import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { PasswordInput } from './ui/password-input'

interface TextInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  inputProps?: ComponentProps<typeof Input>
}

export function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
}: TextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {inputProps?.type === 'password' ? (
            <PasswordInput
              {...field}
              {...inputProps}
              id={name}
              aria-invalid={fieldState.invalid}
            />
          ) : (
            <Input
              {...field}
              {...inputProps}
              id={name}
              aria-invalid={fieldState.invalid}
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
