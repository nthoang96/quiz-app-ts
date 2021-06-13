import * as React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      borderRadius: "14px",
      transition: ".5s",
      "&:hover": {
        transform: "scale(.9)",
      },
    },
    link: {
      textDecoration: "none",
    },
    text: {
      width: "100%",
      textAlign: "center",
      backgroundColor: theme.palette.background.paper,
      backdropFilter: "blur(20px)",
    },
  }),
);

interface CardGameProps {
  link: string;
  imgLink: string;
  imgAlt: string;
  isRelease: boolean;
}

const CardGame: React.FC<CardGameProps> = (props) => {
  const classes = useStyles();
  const { link, imgLink, imgAlt, isRelease } = props;

  return (
    <>
      <Link to={link} className={classes.link}>
        <CardMedia image={imgLink} title={imgAlt} className={classes.root}>
          {isRelease || (
            <CardContent className={classes.text}>
              <Typography variant="h3" color="textSecondary">
                Comming Soon
              </Typography>
            </CardContent>
          )}
        </CardMedia>
      </Link>
    </>
  );
};

export default CardGame;
