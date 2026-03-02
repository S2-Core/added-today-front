import { api } from "../api";

const acceptTerms = async (): Promise<void> => {
  await api.patch("/users/me/accept-terms");

  return;
};

export default acceptTerms;
