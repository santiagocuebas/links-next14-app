import axios from "../axios";
import { Method } from "../types/enums";

export async function handleForm(form: HTMLFormElement) {
  return axios({
    method: form.getAttribute('method') ?? Method.GET,
    url: form.action.replace(location.origin, ''),
    data: form
  }).then(res => res.data)
    .catch(err => {
      return err.response?.data ??
        { message: 'An error occurred while trying to connect to the API' };
    });
}
