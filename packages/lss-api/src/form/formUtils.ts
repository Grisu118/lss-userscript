export type FormModifier = (formData: FormData) => void;

export const loadForm = async (url: string) => {
  const form = await fetch(url)
    .then((res) => res.text())
    .then((html) => new DOMParser().parseFromString(html, "text/html"))
    .then((doc) => doc.querySelector("form") ?? undefined);
  if (!form) {
    throw new Error("Could not find form");
  }
  return {
    action: form.action,
    method: form.method,
    data: new FormData(form),
  };
};

export const modifyForm = async (url: string, modifier: FormModifier) => {
  const form = await loadForm(url);
  const formData = form.data;
  modifier(formData);
  return fetch(form.action, { method: form.method, body: formData });
};

export const editVehicle = async (id: number, data: Record<string, string | number>): Promise<Response> =>
  modifyForm(`/vehicles/${id}/edit`, (formData) => {
    Object.entries(data).forEach(([key, value]) => formData.set(key, value.toString()));
  });
