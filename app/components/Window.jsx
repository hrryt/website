import * as React from 'react'

export default function Window({ children, title, maximised }){ 
	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">{title}</div>
				<div className="title-bar-controls">
					<button aria-label="Minimize" />
					<button aria-label={maximised ? "Restore" : "Maximize"} />
					<button aria-label="Close" />
				</div>
			</div>
			<div className="window-body">
				{children}
			</div>
		</div>
	)
}