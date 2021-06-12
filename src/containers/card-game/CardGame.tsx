import * as React from "react";
import { Link } from "react-router-dom";

interface CardGameProps {
  link: string;
  imgLink: string;
  imgAlt: string;
}

export const CardGame: React.FC<CardGameProps> = (props) => {
  const { link, imgLink, imgAlt } = props;
  return (
    <>
      <Link to={link}>
        <img src={imgLink} alt={imgAlt} height="100%" width="100%" />
      </Link>
    </>
  );
};
