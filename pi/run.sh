# kill previous node instances
killall node

# start watching for new files
# (&) do this in the background so we can run the timelapse script
node watcher.js &

# start the timelapse
bash ./canon.sh