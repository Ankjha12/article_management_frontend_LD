import React from "react";
import {
  Grow,
  Grid,
  Container,
} from "@material-ui/core";

import Form from "../Form/ArticleCreateForm";
import Articles from "../ArticleListing/Articles/ArticlesList";
import { useDispatch } from "react-redux";
import useStyle from "./Style";
import { getAllArticles } from "../../redux/action/articleAction";


const Home: React.FC = () => {
  const classes = useStyle();
  const dispatch: any = useDispatch();
  const [currentId, setCurrentId] = React.useState(null);

 React.useEffect(() => {
    dispatch(getAllArticles())
  }, [])
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          spacing={6}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Articles setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
