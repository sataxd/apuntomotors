import HtmlContent from "./HtmlContent"

const em = (string = '') => {
  return <HtmlContent html={
    String(string).replace(
      /\*(.*?)\*/g,
      '<b>$1</b>'
    )} />
}

export default em