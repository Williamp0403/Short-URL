
export const handleCopy = (text, setCopy) => {
  navigator.clipboard.writeText(text, setCopy)
    .then(() => {
      setCopy(true);
        setTimeout(() => setCopy(false), 2000); // Resetear después de 2 segundos
    })
    .catch(err => {
      console.error('Error al copiar: ', err);
      // Fallback para navegadores antiguos
      const textarea = document.createElement('textarea');
      textarea.value = text, setCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    });
};