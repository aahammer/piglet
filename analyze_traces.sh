hadoop fs -rmr /process/sequence
hadoop jar $HADOOP_PATH/contrib/streaming/hadoop-streaming-1.1.2.jar \
-file $PIGLET_HOME/map_trace.js -mapper $PIGLET_HOME/map_trace.js  \
-file $PIGLET_HOME/reduce_trace.js -reducer $PIGLET_HOME/reduce_trace.js \
-input /process/trace -output /process/sequence