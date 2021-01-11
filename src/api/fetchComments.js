import axios from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0/item/";

export default async function getCommentsObject(id) {
  const storyUrl = `${baseUrl}${id}.json`;
  const result = (await axios.get(storyUrl)).data;

  const resultCopy = {...result};

  if ("kids" in resultCopy && resultCopy.kids.length > 0) {
    resultCopy.comments = [];
    for (let comId of resultCopy.kids) {
      resultCopy.comments.push(await getCommentsObject(comId));
    }
  }

  delete resultCopy.kids;
  return resultCopy;
}
