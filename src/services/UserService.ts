import { GenericService } from "./GenericService";

export class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async search(searchText: string) {
    const newBody = {
      Body: {
        SearchText: searchText,
      },
    };
    return GenericService.post({
      endpoint: "/user/GetUsers",
      body: newBody,
      hasAuthToken: true,
    });
  }

  async createUser(userData: any) {
    const newBody = {
      Body: {
        ...userData,
        Tenant: null,
        Metadata: null,
        Roles: [
          {
            Id: 2,
            Name: "Usuario Tradicional",
          },
        ],
      },
    };
    return GenericService.post({
      endpoint: "/user/RegisterUserRole",
      body: newBody,
      hasAuthToken: true,
    });
  }
}
