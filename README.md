pi-lapse
========

time-lapse taker for raspberry pi

find . -name '*.jpg' \
| awk 'BEGIN{ a=0 }{ printf "mv %s %04d.jpg\n", $0, a++ }' \
| bash

ffmpeg  -vcodec mjpeg -r 24 -i %04d.jpg -vf scale=1280:720 output.mp4
ffmpeg  -vcodec mjpeg -r 24 -i %04d.jpg -vf "scale=1920:ih*1920/iw, crop=1920:1080" -b:v 10000k gt_timelapse_1080_`date +%d.%m.%y`.mp4