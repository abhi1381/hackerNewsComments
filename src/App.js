import React, { useEffect, useState } from "react";
import "./App.css";
import getCommentsObject from "./api/fetchComments";
import Comment from "./components/comments";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Timeago from "react-timeago";

function App() {
  const [comObject, setComObject] = useState(
    JSON.parse(localStorage.getItem("comments")) || null
  );

  useEffect(() => {
    getCommentsObject(8863).then((data) => {
      setComObject(data);
      localStorage.setItem("comments", JSON.stringify(data));
    });
  }, []);

  return (
    <div className="App">
      <Container maxWidth="lg" className="comBorder">
        {comObject !== null ? (
          <Grid style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <span style={{ padding: "5px", paddingLeft: "0" }}>
                By <strong>{comObject.by}</strong>
              </span>
              <Timeago date={comObject.time} />
            </Grid>
            <Grid item xs={12}>
              <h1 style={{ fontWeight: "normal" }}>{comObject.title}</h1>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined">Comments</Button>
            </Grid>
          </Grid>
        ) : null}

        {comObject !== null ? (
          comObject.comments.map((comment) => {
            return (
              <Comment key={comment.id} comment={comment} id={comment.id} />
            );
          })
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Container>
    </div>
  );
}

export default App;
