import { Button} from "@material-ui/core";
import React, { useState} from "react";
import TextArea from "react-textarea-autosize";

function Reply({ id }) {
  const [text, setText] = useState("");

  const handlePostComment = async (e) => {
    let newComment = {
      id: Math.random() * 100,
      parent: id,
      by: "xyz",
      time: new Date().toUTCString(),
      text: text,
    };

    let newReply = `<p>${newComment.text}</p>`;

    let replyParent = document.getElementById(`${id}`);
    let div = document.createElement("div");
    div.innerHTML = newReply;
    replyParent.appendChild(div);
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
    </div>
  );
}

export default Reply;
