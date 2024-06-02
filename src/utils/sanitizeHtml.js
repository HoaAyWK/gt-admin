import DOMPurify from 'dompurify';

export const createMarkup = (html, maxLength = 50) => {
  const sanitizedHTML = DOMPurify.sanitize(html);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHTML;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';

  const truncatedText =
    textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;

  const truncatedHTML = DOMPurify.sanitize(truncatedText);

  return {
    __html: truncatedHTML,
  };
};
