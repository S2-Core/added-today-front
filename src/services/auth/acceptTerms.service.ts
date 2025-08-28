import { api } from "../api";

const acceptTerms = async (): Promise<void> => {
  await api.post("");

  return;
};

export default acceptTerms;
