import { useId } from 'react'

import { Input, Label } from '@elance/ui'

import type { TextFieldSpec } from '@elance/contracts'
import type { ReactElement } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

export function TextField<TFieldValues extends FieldValues>({
	spec,
	form,
}: {
	spec: Omit<TextFieldSpec, 'id'> & { id: FieldPath<TFieldValues> }
	form: Pick<
		UseFormReturn<TFieldValues>,
		'register' | 'getFieldState' | 'formState'
	>
}): ReactElement {
	const inputId = useId()
	const errorId = `${inputId}-error`
	const error = form.getFieldState(spec.id, form.formState).error?.message
	return (
		<div className="space-y-2">
			<Label htmlFor={inputId}>
				{spec.label} ({spec.unit})
			</Label>
			<Input
				id={inputId}
				type="number"
				min={spec.min}
				max={spec.max}
				step={spec.step}
				placeholder={spec.placeholder}
				aria-invalid={!!error}
				aria-describedby={error ? errorId : undefined}
				{...form.register(spec.id)}
			/>
			{error ? (
				<p id={errorId} className="text-destructive text-sm">
					{error}
				</p>
			) : null}
		</div>
	)
}
