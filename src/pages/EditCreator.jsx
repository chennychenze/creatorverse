import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { creatorId } = useParams();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", creatorId)
          .single();

        if (error) throw error;

        // Load content creator's information into state
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching content creator:", error.message);
      }
    };

    fetchCreator();
  }, [creatorId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: existingCreator } = await supabase
        .from("creators")
        .select("*")
        .eq("url", url)
        .neq("id", creatorId)
        .single();

      if (existingCreator) {
        // Display a popup or error message for duplicate URL
        alert("URL must be unique. Please choose a different URL.");
        return;
      }

      // Update content creator in the database
      const { error } = await supabase
        .from("creators")
        .update({ name, url, description })
        .eq("id", creatorId);

      if (error) throw error;

      console.log("Content creator updated successfully");
      // Redirect the user back to the view page
      window.location.href = `/view/${creatorId}`;
    } catch (error) {
      console.error("Error updating content creator:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete content creator from the database
      await supabase.from("creators").delete().eq("id", creatorId);

      console.log("Content creator deleted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting content creator:", error.message);
    }
  };

  return (
    <div>
      <h1>CREATORVERSE</h1>
      <a
        href="/"
        role="button"
        className="secondary"
        style={{ marginBottom: "50px", marginRight: "20px" }}
      >
        VIEW ALL CREATORS
      </a>
      <a
        href={`/view/${creatorId}`}
        role="button"
        className="secondary"
        style={{ marginBottom: "50px" }}
      >
        BACK TO THE CREATOR
      </a>
      <h5>Updating a Content Creator</h5>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="submit" value="UPDATE" />
      </form>
      <input type="submit" value="DELETE CREATOR" onClick={handleDelete} />
    </div>
  );
};

export default EditCreator;
