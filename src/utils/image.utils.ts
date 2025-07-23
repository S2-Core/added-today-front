export const fileToBase64 = (
  file: File,
  toSrc: boolean = true
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      const base64Index = result.indexOf("base64,");

      if (base64Index === -1) reject(new Error("Invalid file type."));

      if (toSrc) {
        resolve(result);

        return;
      }

      resolve(result.slice(base64Index + 7));
    };

    reader.onerror = (error) => reject(error);
  });

export const detectMimeTypeFromBase64 = (base64: string): string | null => {
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("iVBOR")) return "image/png";
  if (base64.startsWith("R0lGOD")) return "image/gif";
  if (base64.startsWith("Qk")) return "image/bmp";
  if (base64.startsWith("SUkq") || base64.startsWith("JVBER"))
    return "image/tiff";
  if (base64.startsWith("UklGR")) return "image/webp";
  if (base64.startsWith("PD94bWwg") || base64.startsWith("PHN2Zy"))
    return "image/svg+xml";
  if (base64.startsWith("AAABAAEA")) return "image/x-icon"; // ICO
  if (base64.startsWith("fLaD") || base64.startsWith("GkXfo"))
    return "image/heic";
  if (base64.startsWith("AAAAIGZ0") || base64.startsWith("YXBwbA=="))
    return "image/avif";
  return null;
};

export const base64ToDataSrc = (base64: string): string => {
  const mimeType = detectMimeTypeFromBase64(base64) || "image/png";

  return `data:${mimeType};base64,${base64}`;
};

export const base64ToFile = (base64: string, filename = "image"): File => {
  const mimeType = detectMimeTypeFromBase64(base64) || "image/png";

  const byteString = atob(base64);

  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], filename, { type: mimeType });
};
