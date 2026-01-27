import axios from "axios";

const jobs = async () => {
  const base = process.env.BASE_PROD_URL;

  try {
    await axios.get(`${base}`);
  } catch (e) {
    console.log(e);
  }
};

export const cronJobsService = () => {
  jobs();

  setInterval(jobs, 30_000);
};
