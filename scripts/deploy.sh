ssh $1 'cd ~/node/VineFetcher; forever stop 0;forever start /usr/local/bin/npm start'
echo "hell yeah"
