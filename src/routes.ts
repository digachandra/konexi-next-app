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
    },
  },
} as const;
