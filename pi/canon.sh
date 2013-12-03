# echo "attempting to kill all PTPCamera processes..."

# releases camera from the OS so we can use it
# killall PTPCamera

# gphoto2 documentation: http://linuxcommand.org/man_pages/gphoto21.html

gphoto2 \
--folder "output/" \
--capture-image-and-download \
--set-config "/main/imgsettings/imageformat=5" \
--filename "output/"%Y%m%d%H%M%S.%C \
--interval "6"
