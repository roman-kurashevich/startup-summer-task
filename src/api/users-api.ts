import { ITEMS_PER_PAGE } from "../constants/constants";
import { instance } from "./api";

export const getUser = async (userName: string) => {
  const data = await instance.get(userName).then((response) => response.data);
  return data;
};

export const getRepos = async (userName: string, currentPage: number) => {
  const response = await instance.get(
    `${userName}/repos?per_page=${ITEMS_PER_PAGE}&page=${currentPage + 1}`
  );
  const data = await response.data;
  console.log(data);
  return data;
};
