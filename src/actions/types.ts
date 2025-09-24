export type ActionResponse<TData = unknown> = {
  success: boolean;
  error?: string;
  data?: TData;
};
