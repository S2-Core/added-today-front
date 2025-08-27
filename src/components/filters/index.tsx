"use client";

import { useOpportunities } from "@/contexts";

import Container from "../container";
import {
  opportunitiesStatusItems,
  opportunitiesTypeItems,
} from "@/constants/opportunities";

const Filters = () => {
  const { setFilters, filters } = useOpportunities();

  const handleChange = (field: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Container
      Tag={"div"}
      className="gap-3 grid grid-cols-1 md:grid-cols-3 py-2"
    >
      <label className="block">
        <span className="block mb-1 font-medium">Busca textual</span>

        <input
          type="text"
          placeholder="Título, marca ou plataforma"
          value={filters.q}
          onChange={(e) => handleChange("q", e.target.value)}
          className="p-2 border w-full"
        />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Quantidade</span>

        <input
          type="number"
          value={filters.limit}
          onChange={(e) => handleChange("limit", Number(e.target.value))}
          className="p-2 border w-full"
        />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Status</span>

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Todos</option>

          {Object.values(opportunitiesStatusItems).map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Tipo</span>

        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Todos</option>

          {Object.values(opportunitiesTypeItems).map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Ordenar por</span>

        <select
          value={filters.sortby}
          onChange={(e) => handleChange("sortby", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Todos</option>

          <option value="deadline">Data de encerramento</option>

          <option value="createdAt">Data de criação</option>
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Ordem</span>

        <select
          value={filters.order}
          onChange={(e) => handleChange("order", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Todos</option>

          <option value="asc">Ascendente</option>

          <option value="desc">Descendente</option>
        </select>
      </label>
    </Container>
  );
};

export default Filters;
