export default function Window({ children, title, maximised }){
	return (
		<div class="window">
			<div class="title-bar">
				<div class="title-bar-text">{title}</div>
				<div class="title-bar-controls">
					<button class="window-button" aria-label="Minimize" />
					<button class="window-button" aria-label={maximised ? "Restore" : "Maximize"} />
					<button class="window-button" aria-label="Close" />
				</div>
			</div>
			<div class="window-body">
				{children}
			</div>
		</div>
	)
}
