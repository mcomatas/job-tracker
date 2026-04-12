import "dotenv/config";
import amqp, { Channel, ChannelModel } from "amqplib";

//connect to RabbitMQ
// Create channel
// assert job-tracker-queue - statusEvents?
// call channel.consume() -> callback function
//  inside callback parse message
//  with prisma write new row to status_events
//  then ack the message

const QUEUE_NAME = "status-events";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export async function connectQueue() {
  const url = process.env.CLOUDAMQP_URL;
  if (!url) {
    throw new Error("CLOUDAMQP_URL is not set");
  }

  connection = await amqp.connect(url);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  console.log("Connected to RabbitMQ");
}

export async function consumeStatusChange(
  applicationId: string,
  fromStatus: ApplicationStatus | null,
  toStatus: ApplicationStatus,
) {
  if (!channel) {
    throw new Error("Queue not connected - call connectQueue() first");
  }
}
