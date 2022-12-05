import HttpError from "./HttpError";

export default class ApiService {
  public static post(url: string, input: unknown) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }).then((response) => {
      if (!response.ok) {
        throw new HttpError(response.status);
      }

      return response.json();
    });
  }
}
