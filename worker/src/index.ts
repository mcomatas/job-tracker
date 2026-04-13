import "dotenv/config";
import amqp, { Channel, ChannelModel } from "amqplib";
import prisma from "./lib/prisma";

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

export async function consumeStatusChange() {
  if (!channel) {
    throw new Error("Queue not connected - call connectQueue() first");
  }

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) return;

    const { applicationId, fromStatus, toStatus } = JSON.parse(
      msg.content.toString(),
    );

    await prisma.statusEvents.create({
      data: { applicationId, fromStatus, toStatus },
    });

    channel!.ack(msg);
  });

  console.log("Waiting for status change messages...");
}

connectQueue()
  .then(() => consumeStatusChange())
  .catch((err) => {
    console.error("Worker failed to start: ", err);
    process.exit(1);
  });
