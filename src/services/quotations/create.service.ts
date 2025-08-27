import { api } from "../api";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

const createQuotation = async (body: ICreateQuotation): Promise<void> => {
  await api.post("/quotation", body);

  return;
};

export default createQuotation;
