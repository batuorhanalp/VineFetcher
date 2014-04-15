# usage: ./deploy.sh yourusername@yourserver.com
ssh $1 'cd ~/node/VineFetcher; git pull origin master; forever stop 0;forever start /usr/local/bin/npm start'
echo "hell yeah"
