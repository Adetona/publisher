# publisher

# Notes on how to use publisher

1. The publisher should be start with `node server.js` 
2. The endpoint http://localhost:8000/publish/topic1
3. The sample payload: 

`{
"message": "talazo11",
"topic": "topic1"
}`

PS: method is POST and topic1 is the only available channel


# Notes on how to use receiver/subscriber

1. The subscriber should be start with `node server.js` 

2. The html interface for subscription can be found here ``http://localhost:9000/subscribe/topic1``

3. Subscribe by sending *topic1*

4. You can publish messsage with the publish endpoint.

5. The published message will be displayed real-time on the interface ``http://localhost:9000/subscribe/topic1``

