import React, { useState } from "react";

import useStyles from "./Style";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "../../components/InputFile";
import { createArticle, updateArticle } from "../../redux/action/articleAction";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(15, "Title should not be greater than 15 characters")
    .required("Title is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.string().required("Image is required")
});

const Form = ({ currentId, setCurrentId }: any) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();


  const article = useSelector((state: any) =>
    currentId ? state.articleReducer.articles.find((article: any) => article._id === currentId) : null
  );

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const user = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Here is the PostData from HandleSubmit function", values);
      if (currentId) {
        dispatch(updateArticle(currentId, values));
      } else {
        dispatch(createArticle(values));
      }
      handleClear();
    },
  });

  React.useEffect(() => {
    if (article) {
      setArticleData(article);
      formik.setValues(article);
    }
  }, [article]);

  const handleClear = () => {
    setCurrentId(null);
    setArticleData({
      title: "",
      content: "",
      image: "",
    });
    formik.resetForm();
  };

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to Create Your Own Article OR Like others' Articles
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Update" : "Create"} an Article
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formik.values.title}
          onChange={(e) => {
            formik.handleChange(e);
            setArticleData({ ...articleData, title: e.target.value });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="content"
          variant="outlined"
          label="Content"
          fullWidth
          value={formik.values.content}
          onChange={(e) => {
            formik.handleChange(e);
            setArticleData({ ...articleData, content: e.target.value });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />

        <div className={classes.fileInput}>
          <InputFile
            setFieldValue={formik.setFieldValue}
            value={formik.values.image}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
        >
          Submit Article
        </Button>

        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          size="small"
          fullWidth
          color="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;