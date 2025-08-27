"use client";

import { useState } from "react";
import Container from "../container";
import { OpportunityStatus, OpportunityType } from "@/constants/opportunities";

const Filters = () => {
  const [filters, setFilters] = useState({
    status: "",
    platform: "",
    type: "",
    deadlineFrom: "",
    deadlineTo: "",
    q: "",
    highlight: false,
    page: 1,
    limit: 10,
    sortby: "createdAt",
    order: "asc",
  });

  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container Tag={"div"} className="space-y-4 py-4 max-w-2xl">
      {/* Status */}
      <label className="block">
        <span className="block mb-1 font-medium">Status</span>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Selecione</option>
          {Object.values(OpportunityStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      {/* Plataforma */}
      <label className="block">
        <span className="block mb-1 font-medium">Plataforma</span>
        <input
          type="text"
          placeholder="Ex: Instagram"
          value={filters.platform}
          onChange={(e) => handleChange("platform", e.target.value)}
          className="p-2 border w-full"
        />
      </label>

      {/* Tipo */}
      <label className="block">
        <span className="block mb-1 font-medium">Tipo de Oportunidade</span>
        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Selecione</option>
          {Object.values(OpportunityType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {/* Deadlines */}
      <div className="gap-4 grid grid-cols-2">
        <label className="block">
          <span className="block mb-1 font-medium">Data Inicial</span>
          <input
            type="datetime-local"
            value={filters.deadlineFrom}
            onChange={(e) => handleChange("deadlineFrom", e.target.value)}
            className="p-2 border w-full"
          />
        </label>
        <label className="block">
          <span className="block mb-1 font-medium">Data Final</span>
          <input
            type="datetime-local"
            value={filters.deadlineTo}
            onChange={(e) => handleChange("deadlineTo", e.target.value)}
            className="p-2 border w-full"
          />
        </label>
      </div>

      {/* Busca textual */}
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

      {/* Highlight */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={filters.highlight}
          onChange={(e) => handleChange("highlight", e.target.checked)}
        />
        <span>Destaque</span>
      </label>

      {/* Paginação */}
      <div className="gap-4 grid grid-cols-2">
        <label className="block">
          <span className="block mb-1 font-medium">Página</span>
          <input
            type="number"
            value={filters.page}
            onChange={(e) => handleChange("page", Number(e.target.value))}
            className="p-2 border w-full"
          />
        </label>
        <label className="block">
          <span className="block mb-1 font-medium">Limite</span>
          <input
            type="number"
            value={filters.limit}
            onChange={(e) => handleChange("limit", Number(e.target.value))}
            className="p-2 border w-full"
          />
        </label>
      </div>

      {/* Ordenação */}
      <label className="block">
        <span className="block mb-1 font-medium">Ordenar por</span>
        <select
          value={filters.sortby}
          onChange={(e) => handleChange("sortby", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="createdAt">Criado em</option>
          <option value="deadline">Deadline</option>
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Ordem</span>
        <select
          value={filters.order}
          onChange={(e) => handleChange("order", e.target.value)}
          className="p-2 border w-full"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </Container>
  );
};

export default Filters;
