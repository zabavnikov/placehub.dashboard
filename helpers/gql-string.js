export default text => {
  if (!text || !text.length) {
    return `""`;
  }

  return `"""${text.replace(/\\"/g,'\\"')}"""`;
}
