import axios from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0/item/";

export default async function getCommentsObject(id) {
  let storyUrl = `${baseUrl}${id}.json?print=pretty`;
  let result = await (await axios.get(storyUrl)).data;

  if ("kids" in result && result.kids.length > 0) {
    result.comments = [];
    for (let comId of result.kids) {
      result.comments.push(await getCommentsObject(comId));
    }
  }

  delete result.kids;
  return result;
}
