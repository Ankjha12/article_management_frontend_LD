import { useEffect, useState } from "react";

import useStyles from "./Style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit"
import moment from 'moment'
import { deleteArticle } from "../../../redux/action/articleAction";
import { useDispatch } from "react-redux";

const Article = ({ article, setCurrentId }: any) => {
  const classes = useStyles();
  const dispatch: any = useDispatch()
  const [readMore, setReadMore] = useState(false);
  const [userID, setUserID] = useState<any>(null);


  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    setUserID(localStorage.getItem("profile_id"))
  },[])
  return (
    <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={article?.image}
          title={article.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{article.title}</Typography>
          <Typography variant="body2">
            Date: &nbsp;
            {moment(article?.createdAt).fromNow()}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {article.title}
        </Typography>
        <CardContent className={classes.content}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={readMore ? classes.expanded : classes.collapsed}
        >
          {article.content}
        </Typography>
        {article.content.length > 100 && (
          <Button size="small" color="primary" onClick={handleReadMore}>
            {readMore ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </CardContent>

      <CardActions className={classes.cardActions}>
        {userID === article?.author?._id && (
          <>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(deleteArticle(article?._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => setCurrentId(article?._id)}
          >
            <EditIcon fontSize="small" />
            Edit
          </Button>
          </>
          
        )}
      </CardActions>
    </Card>
  );
};

export default Article;
