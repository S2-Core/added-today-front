import { api } from "../api";

import { IMental } from "@/contexts/mentals/interfaces";

const findAllMentals = async (): Promise<IMental[]> => {
  const { data } = await api.get<IMental[]>("/mental", {
    params: { includeDeleted: true },
  });

  return data;
};

export default findAllMentals;
