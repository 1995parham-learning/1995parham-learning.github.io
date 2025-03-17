![[GjHgquTWMA051kn.png]]

To preserve order between messages in NATS you need to use pending ack equals to 1 which prevents server from sending multiple messages at the same time.

You can actually use ephemeral consumer to run a sql query over your NATS cluster. Remember to change request batch number to get as much as message you can.

DeliverLast or DeliverLastPerSubject can be useful actually for using nats as you database.

Using direct get and its batch version you can actually do it without a consumer even.
