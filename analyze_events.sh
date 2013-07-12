hadoop fs -rmr /process/trace
hadoop jar $HADOOP_PATH/contrib/streaming/hadoop-streaming-1.1.2.jar \
-file $PIGLET_HOME/map_event.js -mapper $PIGLET_HOME/map_event.js  \
-file $PIGLET_HOME/reduce_event.js -reducer $PIGLET_HOME/reduce_event.js \
-input /process/event/* -output /process/trace