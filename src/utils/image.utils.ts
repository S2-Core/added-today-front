export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      const base64Index = result.indexOf("base64,");

      if (base64Index === -1) reject(new Error("Invalid file type."));

      resolve(result);
    };

    reader.onerror = (error) => reject(error);
  });

export const base64ToFile = (dataUrl: string, filename = "image"): File => {
  const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);

  if (!matches) {
    throw new Error("Formato base64 inválido.");
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  const byteString = atob(base64Data);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], filename, { type: mimeType });
};
