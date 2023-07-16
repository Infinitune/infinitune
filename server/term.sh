#!/bin/bash
gnome-terminal
WID=$(xdotool getactivewindow)
xdotool type --window $WID 'echo Hello, World!'
xdotool key --window $WID Return

