Exercises for Malaga Bootcamp


## Linking entities with a Subscription


Data can be streamed from an Ultralight device.

This Device data is:

* held under the openiot FIWARE service
* follows the standard FIWARE Device data model

1. Create a subscription to read from Motion and Lamp device
2. Read the device data is it is streamed in.
3. Place the count and luminosity into the Store Entity
4. Ensure `metadata` can be read for `unitCode`, `readBy` and `observedAt`

Make the code generic


## Persisting data to an HDFS cluster

Cygnus https://fiware-cygnus.rtfd.io/

IoT Agent Node Lib https://iotagent-node-lib.readthedocs.io/

Draco https://fiware-draco.readthedocs.io/en/latest/

Ultralight IoT Agent https://fiware-iotagent-ul.readthedocs.io/


Data can be streamed from an Ultralight device.

* Attach the Ultralight IoT Agent to a set of devices

* Send commands to unlock the door

* Retrieve the data  and persist to HDFS - Use Cygnus

* Repeat using Draco


## Custom IoT Agent

Start with the code from the Ultralight IoT Agent

1. Amend the processing to accept and interpret  XML messages over HTTP

2. Amend the security processing to look for key within the following payload

    ```xml
    <measure device="xxxx" key="xxxxxx">
       <aaaa value="nnnnnn"/>
       <bbb value="mmmmm"/>
    </measure>
    ```

    Read the payload and map to a given NGSI entity


3. Amend the processing to send commands of the following format

    ```xml
    <command device="xxxx">
       <aaaa>nnn</aaaa>
       <bbbb>mmm</bbbb>
    </command>
    ```

    where command - `ring`, `open`, `close` etc

4. Read the payload and map the result to the given NGSI entity

    ```xml
    <success device="xxxx" command="command"/>
    ```

    where command - `ring`, `open`, `close` etc







