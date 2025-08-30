import axios from "axios";
import { useEffect, useState } from "react";

export function useGet(api) {
  const [apiData, setApiData] = useState([]);

  async function getdata() {
    try {
      const { data } = await axios.get(api, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setApiData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  return apiData;
}
