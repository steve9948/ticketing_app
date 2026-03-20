import Ticket from "@/app/(models)/Ticket";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Opt out of caching for this route
export const revalidate = 0;

async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "TicketDB" });
}

export async function GET() {
  try {
    await connectToDB();
    const tickets = await Ticket.find();
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { message: "Failed to fetch tickets", error },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { message: "Failed to create ticket", error },
      { status: 500 },
    );
  }
}
