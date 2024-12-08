import axios from "axios";

const axiosErrorManger = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      return "The request was made but no response was received";
    } else {
      return `error: ${error.message}`;
    }
  }else if (error instanceof Error) {
    return error.message;
  } else {
    return "An error occurred";
  }
};

export default axiosErrorManger;
