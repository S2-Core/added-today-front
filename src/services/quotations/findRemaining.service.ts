import { api } from "../api";

interface IQuotationsRaminingResponse {
  remaining: number;
}

const findQuotationsRemaining =
  async (): Promise<IQuotationsRaminingResponse> => {
    const { data } = await api.get<IQuotationsRaminingResponse>(
      "/quotation/remaining"
    );

    return data;
  };

export default findQuotationsRemaining;
