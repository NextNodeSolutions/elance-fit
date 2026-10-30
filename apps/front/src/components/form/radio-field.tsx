import { RadioCard, RadioGroup } from '@elance/ui'

import { useRadioField } from './use-radio-field'

import type { RadioFieldSpec } from '@elance/contracts'
import type { ComponentProps, ReactElement } from 'react'
import type {
	FieldPathByValue,
	FieldValues,
	UseFormReturn,
} from 'react-hook-form'

export function RadioField<TFieldValues extends FieldValues>({
	spec,
	form,
	surface,
}: {
	spec: Omit<RadioFieldSpec, 'name'> & {
		name: FieldPathByValue<TFieldValues, string>
	}
	form: Pick<UseFormReturn<TFieldValues>, 'control'>
	surface: ComponentProps<typeof RadioCard>['surface']
}): ReactElement {
	const { field, fieldState, labelId, errorId } = useRadioField({
		name: spec.name,
		control: form.control,
	})
	return (
		<div className="space-y-3">
			<span id={labelId} className="block text-sm font-medium">
				{spec.label}
			</span>
			<RadioGroup
				aria-labelledby={labelId}
				name={field.name}
				value={field.value}
				onValueChange={field.onChange}
				onBlur={field.onBlur}
				aria-describedby={fieldState.error ? errorId : undefined}
				aria-invalid={!!fieldState.error}
			>
				{spec.options.map((option, index) => (
					<RadioCard
						key={option.value}
						value={option.value}
						ref={index === 0 ? field.ref : undefined}
						hint={option.hint}
						surface={surface}
					>
						{option.label}
					</RadioCard>
				))}
			</RadioGroup>
			{fieldState.error?.message ? (
				<p id={errorId} className="text-destructive text-sm">
					{fieldState.error.message}
				</p>
			) : null}
		</div>
	)
}
