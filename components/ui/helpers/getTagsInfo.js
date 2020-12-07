import allTags from "./allTags";

function getTagsInfo(tags) {
  //tags is an array
  const tagsInfo = tags.map((tag) => {
    return allTags.find((element) => element.name === tag);
  });
  return tagsInfo;
}

export default getTagsInfo;