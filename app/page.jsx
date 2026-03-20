import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    // server-side fetch needs an absolute address; fallback to localhost when
    // NEXT_PUBLIC_BASE_URL isn't defined.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/Tickets`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.log("Error fetching tickets:", error);
    return [];
  }
};

const Dashboard = async () => {
  // the API returns an array directly, so treat it as such
  const tickets = (await getTickets()) || [];

  const uniqueCategories = [
    ...new Set(tickets.map((ticket) => ticket.category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory) => (
            <div key={uniqueCategory} className="mb-4">
              <h2 className="text-xl font-bold">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket) => (
                    <TicketCard
                      key={filteredTicket._id}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
