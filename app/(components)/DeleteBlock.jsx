"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async (ticketId) => {
    try {
      const res = await fetch(`/api/Tickets/${ticketId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Wait for the response body to be fully read before refreshing.
        // This helps ensure the server has completed the delete operation.
        await res.text(); // or res.json() if your API returns JSON
        router.refresh();
      } else {
        const body = await res.json().catch(() => null);
        console.error("delete failed", body);
      }
    } catch (err) {
      console.error("delete request error", err);
    }
  };
  return (
    <button
      onClick={() => deleteTicket(id)}
      className="text-red-400 hover:text-red-200"
      aria-label="Delete ticket"
    >
      <FontAwesomeIcon icon={faX} className="icon" />
    </button>
  );
};

export default DeleteBlock;
