import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

import { Label } from './label'
import { RadioGroupItem } from './radio-group'

const radioCardVariants = cva(
	'min-h-14 cursor-pointer gap-3 rounded-2xl border bg-background px-4 py-3 text-[15px] leading-snug transition-colors hover:border-foreground/30 has-[[data-checked]]:border-foreground',
	{
		variants: {
			surface: {
				page: 'border-border has-[[data-checked]]:bg-card',
				card: 'border-transparent',
			},
		},
		defaultVariants: {
			surface: 'page',
		},
	},
)

function RadioCard({
	value,
	hint,
	surface = 'page',
	className,
	children,
	...props
}: Omit<
	React.ComponentProps<typeof RadioGroupItem>,
	'className' | 'children'
> & {
	value: string
	hint?: React.ReactNode
	className?: string
	children: React.ReactNode
} & VariantProps<typeof radioCardVariants>): React.ReactElement {
	const labelId = React.useId()
	const hintId = `${labelId}-hint`
	return (
		<Label className={cn(radioCardVariants({ surface }), className)}>
			<RadioGroupItem
				{...props}
				value={value}
				aria-labelledby={labelId}
				aria-describedby={
					[props['aria-describedby'], hint ? hintId : undefined]
						.filter(Boolean)
						.join(' ') || undefined
				}
			/>
			<span className="flex flex-col gap-0.5">
				<span id={labelId}>{children}</span>
				{hint ? (
					<span
						id={hintId}
						className="text-muted-foreground text-[13px] font-normal"
					>
						{hint}
					</span>
				) : null}
			</span>
		</Label>
	)
}

export { RadioCard, radioCardVariants }
