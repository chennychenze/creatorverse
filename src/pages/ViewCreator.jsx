import React, { useState, useEffect } from "react";
import BtnViewAll from "../components/BtnViewAll";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const ViewCreator = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", creatorId)
          .single();

        if (error) throw error;
        setCreator(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching content creator:", error.message);
      }
    };

    fetchCreator();
  }, [creatorId]);

  return (
    <div>
      <h1>CREATORVERSE</h1>
      <BtnViewAll />
      {creator ? (
        <article>
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            {creator.url}
          </a>
          <div>
            <a
              href={`/edit/${creatorId}`}
              role="button"
              className="primary"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              Edit Creator
            </a>
            <a href="/" role="button" className="contrast">
              DELETE CREATOR
            </a>
          </div>
        </article>
      ) : (
        <p>Loading content creator...</p>
      )}
    </div>
  );
};

export default ViewCreator;
