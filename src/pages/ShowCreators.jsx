import React from "react";
import Card from "../components/Card";

const ShowCreators = ({ contentCreators }) => {
  return (
    <div>
      <h1>CREATORVERSE</h1>
      <a
        href="/"
        role="button"
        className="secondary"
        style={{ marginRight: "20px" }}
      >
        VIEW ALL CREATORS
      </a>
      <a href="/add" role="button" className="contrast">
        ADD A CREATOR
      </a>
      {contentCreators.length === 0 ? (
        <p style={{ marginTop: "30px" }}>NO CREATORS YET..</p>
      ) : (
        contentCreators.map((creator) => (
          <Card
            key={creator.id}
            creatorId={creator.id}
            name={creator.name}
            url={creator.url}
            description={creator.description}
          />
        ))
      )}
    </div>
  );
};

export default ShowCreators;
