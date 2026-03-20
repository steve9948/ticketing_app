import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket.");
    }
    const data = await res.json();
    return data.foundTicket;
  } catch (error) {
    console.error(error);
  }
};

const TicketPage = async ({ params }) => {
  const { id } = await params;
  const EDITMODE = id.toLowerCase() !== "new";
  let ticketData = {};

  if (EDITMODE) {
    ticketData = await getTicketById(id);
    if (!ticketData) {
      return <p className="text-center">Failed to load ticket.</p>;
    }
  }
  return <TicketForm ticket={ticketData} />;
};

export default TicketPage;
