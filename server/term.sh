#!/bin/bash
gnome-terminal # start terminal
sleep 1 # wait a bit for the terminal to start
WID=$(xdotool getactivewindow) # get the window ID of the new terminal
xdotool type --window $WID 'sclang gen.scd' # type the command
xdotool key --window $WID Return # press Enter