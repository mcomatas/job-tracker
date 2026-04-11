import amqp, { Channel, ChannelModel } from "amqplib";
import { ApplicationStatus } from "../generated/prisma/enums";

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

export async function publishStatusChange(
  applicationId: string,
  fromStatus: ApplicationStatus | null,
  toStatus: ApplicationStatus,
) {
  if (!channel) {
    throw new Error("Queue not connected - call connectQueue() first");
  }

  const payload = { applicationId, fromStatus, toStatus };
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
}
