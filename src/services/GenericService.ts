export class GenericService {
  private static baseUrl = process.env.REACT_APP_BASE_URL;

  static async post({
    endpoint,
    body,
    hasAuthToken,
  }: GenericParams): Promise<APIResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        ...(hasAuthToken
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
          : {}),
      },
      body: JSON.stringify(body),
    });

    let dataResponse;
    try {
      dataResponse = await response.json();
    } catch (err) {
      console.log(dataResponse);
      dataResponse = {};
    }

    return {
      data: dataResponse,
      ok: response.ok,
      status: response.status,
    };
  }
}
