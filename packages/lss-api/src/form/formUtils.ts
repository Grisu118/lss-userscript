export type FormModifier = (formData: FormData) => void;

const modifyForm = async (url: string, modifier: FormModifier) => {
  const form = await fetch(url)
    .then((res) => res.text())
    .then((html) => new DOMParser().parseFromString(html, "text/html"))
    .then((doc) => doc.querySelector("form") ?? undefined);
  if (!form) {
    throw new Error("Could not find form");
  }
  const formData = new FormData(form);
  modifier(formData);
  return fetch(form.action, { method: form.method, body: formData });
};

export const editVehicle = async (id: number, data: Record<string, string | number>): Promise<Response> =>
  modifyForm(`/vehicles/${id}/edit`, (formData) => {
    Object.entries(data).forEach(([key, value]) => formData.set(key, value.toString()));
  });
