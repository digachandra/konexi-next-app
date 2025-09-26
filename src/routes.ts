type PathLike = `/${string}`;
type DynamicRoute<T extends string> = (id: T) => PathLike;

export const routes = {
  home: () => '/' as const,
  auth: {
    login: () => '/auth/login' as const,
    register: () => '/auth/register' as const,
    codeError: () => '/auth/code-error' as const,
    password: {
      request: () => '/auth/password/request' as const,
      reset: () => '/auth/password/reset' as const,
      update: () => '/auth/password/update' as const,
      updated: () => '/auth/password/updated' as const,
    },
  },
  portal: {
    root: () => '/portal' as const,
    jobs: {
      index: () => '/portal/jobs' as const,
      add: () => '/portal/jobs/add' as const,
      detail: ((id: string) => `/portal/jobs/${id}/detail`) as DynamicRoute<string>,
      edit: ((id: string) => `/portal/jobs/${id}/edit`) as DynamicRoute<string>,
    },
  },
} as const;
