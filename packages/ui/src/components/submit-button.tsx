import * as React from 'react'

import { LoaderCircle } from 'lucide-react'

import { Button } from './button'

function SubmitButton({
	pending,
	pendingLabel,
	disabled,
	children,
	...props
}: Omit<React.ComponentProps<typeof Button>, 'type'> & {
	pending: boolean
	pendingLabel: React.ReactNode
}): React.ReactElement {
	return (
		<Button
			{...props}
			type="submit"
			disabled={pending || disabled}
			aria-busy={pending || undefined}
		>
			{pending ? (
				<>
					<LoaderCircle
						aria-hidden="true"
						className="animate-spin motion-reduce:animate-none"
					/>
					{pendingLabel}
				</>
			) : (
				children
			)}
		</Button>
	)
}

export { SubmitButton }
