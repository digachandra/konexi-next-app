export function getFormData(values: Record<string, unknown>): FormData {
  const fd = new FormData();
  Object.entries(values).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(k, String(v));
    else fd.append(k, '');
  });
  return fd;
}
