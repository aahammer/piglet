hadoop jar $HADOOP_HOME/contrib/streaming/hadoop-streaming-1.1.2.jar \
-file $PIGLET_HOME/map.js -mapper $PIGLET_HOME/.map.js  \
-file $PIGLET_HOME/reduce.js -reducer $PIGLET_HOME/reduce.js \
-input /process/* -output /process_out