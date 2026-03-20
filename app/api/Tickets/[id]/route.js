import Ticket from "@/app/(models)/Ticket";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "TicketDB" });
}

export async function GET(req, context) {
  try {
    await connectToDB();
    const { params } = await context;
    const { id } = await params;
    const foundTicket = await Ticket.findOne({ _id: id });

    if (!foundTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { message: "Failed to fetch ticket", error },
      { status: 500 },
    );
  }
}

export async function PUT(req, context) {
  try {
    await connectToDB();
    const { params } = await context;
    const { id } = await params;
    const body = await req.json();
    const ticketData = body.formData;

    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    if (!updateTicketData) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectToDB();
    const { params } = await context;
    const { id } = await params;
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
