export const removeAllHTMLTags = ( text: string ): string =>
    text.replace( /<.+?>/g, '' ).replace( /&nbsp;/ig, '' )
