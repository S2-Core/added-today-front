import { api } from "../api";

import { IQuotation } from "@/contexts/quotations/interfaces";

interface IQuotationsResponse {
  quotations: IQuotation[];
}

const findAllQuotations = async (): Promise<IQuotationsResponse> => {
  const { data } = await api.get<IQuotationsResponse>("/quotation");

  return data;
};

export default findAllQuotations;
