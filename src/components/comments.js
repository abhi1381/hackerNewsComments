import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Timeago from "react-timeago";
import Button from "@material-ui/core/Button";
import Reply from "./reply";

function Comment({ comment,id }) {
  const [replyState, setReplyState] = useState(false);

  const handleReply = async (e) => {
    setReplyState(!replyState);
  };

  const nestedComments = (comment.comments || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} id={comment.id} type="child"/>;
  });

  return (
    <div>
      <Container maxWidth="md">
        <Grid style={{ padding: "10px" }} className="comBorder" id={id}>
          <Grid item xs={12}>
            <span style={{ padding: "5px", paddingLeft: "0" }}>
              By <strong>{comment.by}</strong>
            </span>
            <Timeago date={comment.time} />
          </Grid>
          <Grid item xs={12}>
            <p>{comment.text}</p>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleReply}>
              reply
            </Button>
          </Grid>
          {replyState ? (
            <Grid item xs={12}>
              <Reply id={comment.id}/>
            </Grid>
          ) : null}
        </Grid>
        {nestedComments}
      </Container>
    </div>
  );
}

export default Comment;
