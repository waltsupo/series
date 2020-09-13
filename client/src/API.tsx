import axios from "axios";

const baseURL = "https://localhost/api";

interface APIResponse {
  status: number;
  data?: any;
  error?: any;
}

const sendRequest = async (
  method: "POST" | "GET" | "PATCH" | "DELETE",
  endpoint: string,
  data: Object
): Promise<APIResponse> => {
  const options = {
    url: baseURL + endpoint,
    method,
    data,
  };

  try {
    return await axios.request<APIResponse>(options);
  } catch (error) {
    if (error.response && error.response.status == 401) {
      // TODO: Handle auth error  (redirect to login)
      return error.response.data;
    } else {
      return error.response.data;
    }
  }
};

export const loginRequest = async (
  username: string,
  password: string
): Promise<APIResponse> => {
  return sendRequest("POST", "/auth/login", { username, password });
};
