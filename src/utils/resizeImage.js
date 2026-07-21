export const resizeImage = async (file) => {
  const MAX_SIZE = 1 * 1024 * 1024; // 1MB
  const MAX_WIDTH = 1280;

  const img = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => (img.src = e.target.result);
    reader.onerror = reject;

    img.onload = async () => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        const scale = MAX_WIDTH / width;
        width = MAX_WIDTH;
        height = height * scale;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.9;
      let blob;

      do {
        blob = await new Promise((res) =>
          canvas.toBlob(res, "image/webp", quality)
        );
        quality -= 0.05;
      } while (blob.size > MAX_SIZE && quality > 0.5);

      resolve(
        new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
          type: "image/webp",
        })
      );
    };

    reader.readAsDataURL(file);
  });
};