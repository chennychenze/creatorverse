import React, { useState } from "react";
import BtnViewAll from "../components/BtnViewAll";
import { supabase } from "../client";

const AddCreator = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: existingCreator } = await supabase
        .from("creators")
        .select("*")
        .eq("url", url)
        .single();

      if (existingCreator) {
        alert(
          "The URL is already assigned to another creator. Please use a different URL."
        );
        return;
      }

      const { data, error } = await supabase
        .from("creators")
        .insert([{ name, url, description }]);

      if (error) throw error;

      console.log("Content creator added:", data);
      // redirect the user
      window.location.href = `/`;
    } catch (error) {
      console.error("Error adding content creator:", error.message);
    }
  };

  return (
    <div>
      <h1>CREATORVERSE</h1>
      <BtnViewAll />
      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        <label>
          <b>Creator's Name:</b>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>
          <b>Social Media Link:</b>
        </label>
        <small>YouTube, Twitter, or Instagram</small>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>
          <b>Description:</b>
        </label>
        <small>Who are they? What makes them interesting?</small>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="submit" value="ADD A CREATOR" />
      </form>
    </div>
  );
};

export default AddCreator;
