import React from "react";
import { Link } from "react-router-dom";

const Card = ({ creatorId, name, url, description }) => {
  return (
    <article>
      <Link to={`/view/${creatorId}`}>
        <h5 style={{ textDecoration: "underline" }}>{name}</h5>
      </Link>
      <Link to={`/view/${creatorId}`}>
        <p>{description}</p>
      </Link>

      <a
        href={url}
        role="button"
        className="outline"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: "20px" }}
      >
        View Social Media
      </a>
      <a
        href={`/edit/${creatorId}`}
        role="button"
        className="contrast outline"
        rel="noopener noreferrer"
      >
        Edit Creator
      </a>
    </article>
  );
};

export default Card;
