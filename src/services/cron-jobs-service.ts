import axios from "axios";

const jobs = async () => {
  const base = process.env.BASE_PROD_URL;

  try {
    const response = await axios.get(`${base}`);

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const cronJobsService = () => {
  jobs();

  setInterval(jobs, 30_000);
};
