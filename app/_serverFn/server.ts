"use server";
const uploadVisit = async (path: string, time: string, os: string, browser: string) => {
  console.log("visitorInfo:", path, time, os, browser);
};
export { uploadVisit };