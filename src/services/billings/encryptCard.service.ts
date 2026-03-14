import { PAGBANK_PUBLIC_KEY } from "@/config";

type EncryptCardInput = {
  holder: string;
  number: string;
  expMonth: string;
  expYear: string;
  securityCode: string;
};

type EncryptCardResult =
  | {
      success: true;
      encryptedCard: string;
    }
  | {
      success: false;
      message: string;
      errors?: Array<{
        code: string;
        message: string;
      }>;
    };

const sanitizeCardNumber = (value: string) => value.replace(/\D/g, "");
const sanitizeCvv = (value: string) => value.replace(/\D/g, "");
const sanitizeMonth = (value: string) => value.replace(/\D/g, "").slice(0, 2);
const sanitizeYear = (value: string) => value.replace(/\D/g, "").slice(0, 4);

const mapSdkErrors = (
  errors?: Array<{ code: string; message: string }>,
): string => {
  if (!errors?.length) return "Não foi possível criptografar o cartão.";

  const first = errors[0];

  switch (first.code) {
    case "INVALID_NUMBER":
      return "Número do cartão inválido.";
    case "INVALID_SECURITY_CODE":
      return "CVV inválido.";
    case "INVALID_EXPIRATION_MONTH":
      return "Mês de validade inválido.";
    case "INVALID_EXPIRATION_YEAR":
      return "Ano de validade inválido.";
    case "INVALID_PUBLIC_KEY":
      return "Chave pública do PagBank inválida.";
    case "INVALID_HOLDER":
      return "Nome do titular inválido.";
    default:
      return first.message || "Não foi possível criptografar o cartão.";
  }
};

export async function encryptCard(
  input: EncryptCardInput,
): Promise<EncryptCardResult> {
  const publicKey = PAGBANK_PUBLIC_KEY;

  if (!publicKey)
    return {
      success: false,
      message: "Chave pública do PagBank não configurada.",
    };

  if (typeof window === "undefined" || !window.PagSeguro?.encryptCard)
    return {
      success: false,
      message: "SDK do PagBank não está disponível no navegador.",
    };

  const result = window.PagSeguro.encryptCard({
    publicKey,
    holder: input.holder.trim(),
    number: sanitizeCardNumber(input.number),
    expMonth: sanitizeMonth(input.expMonth),
    expYear: sanitizeYear(input.expYear),
    securityCode: sanitizeCvv(input.securityCode),
  });

  if (result.hasErrors || !result.encryptedCard)
    return {
      success: false,
      message: mapSdkErrors(result.errors),
      errors: result.errors,
    };

  return {
    success: true,
    encryptedCard: result.encryptedCard,
  };
}
