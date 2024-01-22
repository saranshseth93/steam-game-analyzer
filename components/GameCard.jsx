import React from "react";

const GameCard = ({ title, imgUrl, description, lastPlayed, isFree }) => {
  return (
    <div className="card shadow-2xl card-bordered bg-neutral text-neutral-content">
      <figure>
        <img src={imgUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{description}</p>
        <p className="text-sm">Last played: {lastPlayed}</p>
        {!!!isFree && (
          <div className="card-actions justify-start mt-5">
            <div className="card-actions justify-start">
              <div className="badge badge-outline badge-accent">Purchased</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
