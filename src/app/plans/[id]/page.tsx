"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useAuth, useBillings } from "@/contexts";

import Container from "@/components/container";
import PlanCard from "@/components/planCard";

import { formatCurrency } from "@/utils/number.utils";

const PlanCheckout = () => {
  const [{ id }] = [useParams()];

  const { allUIPlans } = useBillings();

  const uiPlan = allUIPlans?.find((plan) => plan.code === id);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | null>(
    null,
  );

  if (!allUIPlans || !uiPlan) return null;

  const { introPriceCents, priceCents, currency } = uiPlan;

  return (
    <Container
      Tag="main"
      className="relative flex flex-col gap-6 my-5 select-none"
    >
      <Link
        tabIndex={-1}
        href="/plans"
        title="Voltar para o gerenciamento de planos"
        className="top-5 left-5 z-9 fixed p-2 rounded-full text-foreground hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-15">
        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-xl">
            Plano selecionado:
          </span>

          <PlanCard plan={uiPlan} className="list-none" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-xl">Pagamento:</span>

          <div className="px-8 py-5 border border-primary/30 rounded-xl">
            {priceCents !== 0 && !paymentMethod ? (
              <div className="flex flex-col gap-3 mb-2 pb-5 border-primary/30 border-b">
                <span className="text-foreground/70">Método de Pagamento</span>

                <button
                  tabIndex={-1}
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className="flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiCreditCard size={20} />

                    <span className="text-sm xs:text-base">
                      Cartão de Crédito
                    </span>
                  </div>
                </button>

                <button
                  tabIndex={-1}
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className="flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <BsQrCode size={20} />

                    <span className="text-lg">Pix</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 mb-5">
                <div className="flex items-start w-full">
                  <button
                    tabIndex={-1}
                    type="button"
                    onClick={() => setPaymentMethod(null)}
                    className="hover:bg-primary/10 p-2 border-2 border-primary/30 rounded-xl text-primary/70 transition-all duration-300 cursor-pointer"
                  >
                    <FaArrowLeftLong size={21} />
                  </button>
                </div>

                <div></div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Subtotal</span>

                <span>
                  {((introPriceCents ?? priceCents ?? 0) / 100)
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Desconto Fundador</span>

                <span className="text-success-light">
                  {(0).toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5 mt-2 pt-2 border-primary/30 border-t text-xl">
                <span className="font-bold">Total</span>

                <span>
                  {formatCurrency(
                    (introPriceCents ?? priceCents ?? 0) / 100,
                    currency ?? "BRL",
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-5 w-full">
              <button
                tabIndex={-1}
                disabled={priceCents !== 0}
                onClick={() => {
                  if (priceCents === 0) setPaymentMethod("card");
                }}
                className="bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-secondary disabled:opacity-50 p-2 py-5 rounded-lg w-full text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Assinar plano e começar agora
              </button>

              {priceCents !== 0 && (
                <>
                  <div className="flex items-center gap-2 text-foreground/70 text-sm/normal">
                    <IoLockClosedOutline size={18} />

                    <span className="text-xs md:text-xs xs:text-sm lg:text-sm">
                      Pagamento seguro e criptografado
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground/70 text-sm/normal">
                    <LuShield size={18} />

                    <span>Seus dados estão protegidos</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlanCheckout;
