# ivory_js
A library for controlling a DOMDI ( Document Object Model Digital Interface )

This project uses an Arduino UNO, 4 knobs, and 4 sliders to create, delete, and edit HTML elements.

# Targetable styles and the components that control them.
Knobs
size: { width, height }
dimensions: { padding, margin, border }
position: { top, left, right, bottom }

Sliders
color: { rgba }

Buttons
loops through size, dimension, and position parameters.
