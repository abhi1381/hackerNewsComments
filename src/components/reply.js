import { Button } from "@material-ui/core";
import React, { useState } from "react";
import TextArea from "react-textarea-autosize";
import Comment from "./comments";

function Reply({ id }) {
  const [text, setText] = useState("");
  const [newComment, setNewComment] = useState(null);

  const handlePostComment = async (e) => {
    const newComment = {
      id: Math.random() * 100,
      parent: id,
      by: "xyz",
      time: new Date().toUTCString(),
      text: text,
      type: "comment",
      comments: [],
    };
    setNewComment(newComment);
  };

  return (
    <div style={{ padding: "5px" }}>
      <TextArea
        style={{ width: "-webkit-fill-available" }}
        placeholder="What are your thoughts?"
        minRows={4}
        defaultValue={text}
        onChange={(value) => {
          setText(value.target.value);
        }}
        className={id}
      />
      <div>
        <Button variant="outlined" onClick={handlePostComment}>
          COMMENT
        </Button>
      </div>
      <div>
        {newComment !== null ? (
          <Comment
            key={newComment.id}
            comment={newComment}
            id={newComment.id}
            type="child"
          />
        ) : null}
      </div>
    </div>
  );
}

export default Reply;
