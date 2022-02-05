interface GenericParams {
  endpoint: string;
  body?: any;
  hasAuthToken?: boolean;
}
interface APIResponse {
  data: any;
  ok: boolean;
  status: number;
}
