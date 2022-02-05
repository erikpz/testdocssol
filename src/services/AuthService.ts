import { GenericService } from "./GenericService";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string) {
    const newBody = {
      Body: {
        Username: username,
        Password: password,
      },
    };
    return GenericService.post({
      endpoint: "/authentication/authentication",
      body: newBody,
    });
  }
}
