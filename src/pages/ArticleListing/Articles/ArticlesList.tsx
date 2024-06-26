
import Article from "../Article/ArticleCard";
import { CircularProgress, Grid } from "@material-ui/core";
// import { getAllArticles } from "../../../redux/action/articleAction";

import useStyles from "./Style";
import { useSelector } from "react-redux";

const Articles = ({ setCurrentId }: any) => {
  const classes = useStyles();
  const { articles } = useSelector((state: any) => state.articleReducer);
  const {isLoading} = useSelector((state: any) => state.commonReducer);

  console.log("Checking articles and isLoading", articles, isLoading)

  return (
    <>
      {!articles.length ? (
        <h1>No Article Found Please Create One</h1>
      ) : (
        ""
      )}
      {!isLoading ? (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {articles.map((article: any) => {
            return (
              <Grid item key={article._id} xs={12} sm={12} md={9} lg={4}>
                <Article article={article} setCurrentId={setCurrentId} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <h5>Loading...</h5>
        </div>
      )}
    </>
  );
};

export default Articles;
