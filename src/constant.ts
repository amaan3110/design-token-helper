export interface Token {
    name: string;
    value: string;
    category: string;
}

export const propertyMap: Record<string, string[]> = {
    // Typography
    "font-size": ["font-size"],
    "font-family": ["font-family"],
    "font-weight": ["font-weight"],
    "font-style": ["font-style"],
    "font": ["font-size", "font-family", "font-weight"],
    "line-height": ["line-height"],
    "letter-spacing": ["letter-spacing"],
    "word-spacing": ["spacing"],
    "text-indent": ["spacing"],
    "text-shadow": ["shadow"],
    "text-decoration-color": ["color"],
    "text-emphasis-color": ["color"],
    "caret-color": ["color"],
    "text-underline-offset": ["spacing"],
    "text-decoration-thickness": ["border-width"],
    "tab-size": ["spacing"],

    // Text color
    "color": ["color"],
    "accent-color": ["color"],
    "column-rule-color": ["color"],
    "scrollbar-color": ["color"],
    "text-fill-color": ["color"],           // WebKit
    "text-stroke-color": ["color"],         // WebKit

    // Background
    "background": ["color"],
    "background-color": ["color"],
    "background-image": ["image"],
    "background-position": ["spacing"],
    "background-position-x": ["spacing"],
    "background-position-y": ["spacing"],
    "background-size": ["spacing"],

    // Border
    "border": ["color"],
    "border-color": ["color"],
    "border-top-color": ["color"],
    "border-right-color": ["color"],
    "border-bottom-color": ["color"],
    "border-left-color": ["color"],

    "border-width": ["border-width"],
    "border-top-width": ["border-width"],
    "border-right-width": ["border-width"],
    "border-bottom-width": ["border-width"],
    "border-left-width": ["border-width"],

    "border-radius": ["radius"],
    "border-top-left-radius": ["radius"],
    "border-top-right-radius": ["radius"],
    "border-bottom-left-radius": ["radius"],
    "border-bottom-right-radius": ["radius"],
    "border-start-start-radius": ["radius"],
    "border-start-end-radius": ["radius"],
    "border-end-start-radius": ["radius"],
    "border-end-end-radius": ["radius"],

    "border-top": ["color", "border-width"],
    "border-right": ["color", "border-width"],
    "border-bottom": ["color", "border-width"],
    "border-left": ["color", "border-width"],

    // Outline
    "outline-color": ["color"],
    "outline-width": ["border-width"],
    "outline-offset": ["spacing"],
    "outline": ["color", "border-width"],

    // Flex/Grid spacing
    "gap": ["spacing"],
    "row-gap": ["spacing"],
    "column-gap": ["spacing"],
    "flex-basis": ["spacing"],
    "grid-auto-columns": ["spacing"],
    "grid-auto-rows": ["spacing"],

    // Margin
    "margin": ["spacing"],
    "margin-top": ["spacing"],
    "margin-right": ["spacing"],
    "margin-bottom": ["spacing"],
    "margin-left": ["spacing"],
    "margin-inline": ["spacing"],
    "margin-inline-start": ["spacing"],
    "margin-inline-end": ["spacing"],
    "margin-block": ["spacing"],
    "margin-block-start": ["spacing"],
    "margin-block-end": ["spacing"],

    // Padding
    "padding": ["spacing"],
    "padding-top": ["spacing"],
    "padding-right": ["spacing"],
    "padding-bottom": ["spacing"],
    "padding-left": ["spacing"],
    "padding-inline": ["spacing"],
    "padding-inline-start": ["spacing"],
    "padding-inline-end": ["spacing"],
    "padding-block": ["spacing"],
    "padding-block-start": ["spacing"],
    "padding-block-end": ["spacing"],

    // Positioning
    "top": ["spacing"],
    "right": ["spacing"],
    "bottom": ["spacing"],
    "left": ["spacing"],
    "inset": ["spacing"],
    "inset-inline": ["spacing"],
    "inset-block": ["spacing"],
    "inset-inline-start": ["spacing"],
    "inset-inline-end": ["spacing"],
    "inset-block-start": ["spacing"],
    "inset-block-end": ["spacing"],

    // Size
    "width": ["spacing"],
    "min-width": ["spacing"],
    "max-width": ["spacing"],
    "height": ["spacing"],
    "min-height": ["spacing"],
    "max-height": ["spacing"],

    // Logical Size
    "inline-size": ["spacing"],
    "min-inline-size": ["spacing"],
    "max-inline-size": ["spacing"],
    "block-size": ["spacing"],
    "min-block-size": ["spacing"],
    "max-block-size": ["spacing"],

    // Transform
    "translate": ["spacing"],
    "transform-origin": ["spacing"],
    "perspective-origin": ["spacing"],

    // Scroll
    "scroll-margin": ["spacing"],
    "scroll-margin-top": ["spacing"],
    "scroll-margin-right": ["spacing"],
    "scroll-margin-bottom": ["spacing"],
    "scroll-margin-left": ["spacing"],
    "scroll-padding": ["spacing"],
    "scroll-padding-top": ["spacing"],
    "scroll-padding-right": ["spacing"],
    "scroll-padding-bottom": ["spacing"],
    "scroll-padding-left": ["spacing"],

    // SVG
    "fill": ["color"],
    "stroke": ["color"],
    "stop-color": ["color"],
    "flood-color": ["color"],
    "lighting-color": ["color"],

    // Effects
    "box-shadow": ["shadow"],
    "filter": ["shadow"],
    "backdrop-filter": ["shadow"],

    // Animation
    "animation-duration": ["duration"],
    "animation-delay": ["duration"],
    "transition-duration": ["duration"],
    "transition-delay": ["duration"],
    "transition": ["duration"],
    "animation": ["duration"],

    // Opacity
    "opacity": ["opacity"],

    // Z-index
    "z-index": ["z-index"],

    // Cursor
    "cursor": ["cursor"]
};