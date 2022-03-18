export const removeAllHTMLTags = ( text?: string ): string | undefined =>
    text?.replace( /<.+?>/g, '' ).replace( /&nbsp;/ig, '' )
