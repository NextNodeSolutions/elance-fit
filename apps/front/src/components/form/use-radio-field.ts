import { useId } from 'react'

import { useController } from 'react-hook-form'

import type {
	FieldPathByValue,
	FieldValues,
	UseControllerProps,
	UseControllerReturn,
} from 'react-hook-form'

type RadioFieldControllerProps<TFieldValues extends FieldValues> = Pick<
	UseControllerProps<TFieldValues, FieldPathByValue<TFieldValues, string>>,
	'name' | 'control'
>

export function useRadioField<TFieldValues extends FieldValues>(
	props: RadioFieldControllerProps<TFieldValues>,
): UseControllerReturn<TFieldValues, FieldPathByValue<TFieldValues, string>> & {
	labelId: string
	errorId: string
} {
	const controller = useController(props)
	const labelId = useId()
	return { ...controller, labelId, errorId: `${labelId}-error` }
}
