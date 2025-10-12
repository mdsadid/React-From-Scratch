import { type Puppy } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getPuppies() {
  try {
    const response = await fetch(`${apiUrl}api/puppies`);
    const jsonResponse = await response.json();

    if (!response.ok) throw jsonResponse;

    return jsonResponse.data;
  } catch (error) {
    throw error;
  }
}

export async function toggleLikedStatus(id: Puppy["id"]) {
  try {
    const response = await fetch(`${apiUrl}api/puppies/${id}/like`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
    });

    const jsonResponse = await response.json();

    if (!response.ok) throw jsonResponse;

    return jsonResponse.data;
  } catch (error) {
    throw error;
  }
}

export async function createPuppy(formData: FormData) {
  try {
    const response = await fetch(`${apiUrl}api/puppies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const jsonResponse = await response.json();

    if (!response.ok) throw jsonResponse;

    return jsonResponse.data;
  } catch (error) {
    throw error;
  }
}
