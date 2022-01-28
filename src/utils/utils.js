export const removeAllHTMLTags = (text) =>
  text.replace(/<.+?>/g, '').replace(/&nbsp;/ig, '')
