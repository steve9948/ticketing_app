"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const router = useRouter();

  const EDITMODE = ticket?._id ? true : false;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const processedValue =
      name === "priority" || name === "progress" ? Number(value) : value;

    setFormData((prevState) => ({ ...prevState, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }
    router.refresh();
    router.push("/"); // Redirect to home page after successful submission
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problems",
  };

  const [formData, setFormData] = useState(
    EDITMODE ? ticket : startingTicketData,
  );
  return (
    <div className="flex justify-center ">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problems">Hardware Problems</option>
          <option value="Software Problems">Software Problems</option>
          <option value="Network Issues">Network Issues</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority1"
            type="radio"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority === 1}
          />
          <label>1</label>
          <input
            id="priority2"
            type="radio"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority === 2}
          />
          <label>2</label>
          <input
            id="priority3"
            type="radio"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority === 3}
          />
          <label>3</label>
          <input
            id="priority4"
            type="radio"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority === 4}
          />
          <label>4</label>
          <input
            id="priority5"
            type="radio"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority === 5}
          />
          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          id="progress"
          name="progress"
          type="range"
          min={0}
          max={100}
          onChange={handleChange}
          value={formData.progress}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
