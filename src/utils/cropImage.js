export default function cropImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], file.name, { type: file.type });
        resolve(croppedFile);
      }, file.type);
    };

    img.onerror = reject;
  });
}