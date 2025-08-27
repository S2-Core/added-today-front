"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useQuotations } from "@/contexts";

import Container from "@/components/container";
import Tabs, { Tab } from "@/components/tabs";
import Register from "@/components/register";
import Quotation from "@/components/quotation";
import EmptyList from "@/components/emptyList";
import Loading from "@/components/loading";

import createQuotationSchema from "@/validators/quotations/create.validator";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

import { createInputs } from "@/constants/quotations";
import toast from "react-hot-toast";

const Client = () => {
  const {
    setTab,
    tab,
    quotations,
    quotationsRemaining,
    handleCreateQuotation,
  } = useQuotations();

  const createForm = useForm<ICreateQuotation>({
    mode: "onChange",
    resolver: yupResolver(createQuotationSchema),
  });

  const handleCreate = async (data: ICreateQuotation): Promise<void> => {
    if (!quotationsRemaining) {
      toast.error("Limite de Precificações por dia atingido!", {
        id: "register-quotation",
      });

      createForm.reset();
    } else {
      await handleCreateQuotation(data).finally(() => createForm.reset());
    }
  };

  return (
    <Container Tag="main">
      {quotationsRemaining !== null && (
        <p className="top-8 left-1/2 z-10000 fixed gap-2 font-bold text-foreground text-sm text-center -translate-1/2">
          <span
            className={`pr-2 ${quotationsRemaining ? (quotationsRemaining !== 1 ? "text-primary" : "text-warning") : "text-error"}`}
          >
            {quotationsRemaining}
          </span>
          Precificações restantes hoje
        </p>
      )}

      <Tabs setTab={setTab} tab={tab}>
        <Tab name="myQuotations" label="Minhas Precificações">
          <ul className="flex flex-col gap-10">
            {quotations ? (
              !!quotations.length ? (
                quotations.map((quotation) => (
                  <Quotation key={quotation.id} quotation={quotation} />
                ))
              ) : (
                <EmptyList />
              )
            ) : (
              <Loading />
            )}
          </ul>
        </Tab>

        <Tab name="createQuotation" label="Criar Precificação">
          <div className="flex flex-col gap-10">
            <div className="mx-auto">
              <p className="shadow-md p-2 border-1 border-foreground rounded-md w-fit max-w-full text-primary text-sm text-center break-words whitespace-pre-line">
                {`💡 Como saber sua taxa de engajamento?

               (Curtidas + Comentários + Compartilhamentos) ÷ Seguidores 
               
               Ex: (2.000 + 100) ÷ 50.000 = 0.042 = 4.2%`}
              </p>
            </div>

            <Register
              createForm={createForm}
              inputs={createInputs}
              tab={tab}
              type="Precificação"
              handleCreate={handleCreate}
            />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Client;
