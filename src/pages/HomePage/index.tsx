import { Grid } from "@material-ui/core";
import CardGame from "../../containers/CardGame";
import GameLists from "../../constants/gamelists.json";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "40vh",
    },
  }),
);

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        {GameLists.map((data) => (
          <Grid item xs={6} className={classes.root}>
            <CardGame
              link={data.route}
              imgLink={data.imgLink}
              imgAlt={data.imgAlt}
              isRelease={data.is_release}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
