const error = [
  {
    selector: "button audio[controls]",
    category: "error",
    name: "audio[controls]-child-of-button",
    description: "Ensure that <audio controls> is not a child of <button>",
  },
  {
    selector: "button button",
    category: "error",
    name: "button-child-of-button",
    description: "Ensure that <button> is not a child of <button>",
  },
  {
    selector: "button details",
    category: "error",
    name: "details-child-of-button",
    description: "Ensure that <details> is not a child of <button>",
  },
  {
    selector: "button embed",
    category: "error",
    name: "embed-child-of-button",
    description: "Ensure that <embed> cannot be a child of <button>",
  },
  {
    selector: "button iframe",
    category: "error",
    name: "iframe-child-of-button",
    description: "Ensure that <iframe> is not a child of <button>",
  },
  {
    selector: "button img[usemap]",
    category: "error",
    name: "img[usemap]-child-of-button",
    description: "Ensure that <img usemap> is not a child of <button>",
  },
  {
    selector: "button input:not([type=hidden])",
    category: "error",
    name: "input:not([type=hidden])-child-of-button",
    description: "Ensure that <input type='hidden'> is not a child of <button>",
  },
  {
    selector: "button label",
    category: "error",
    name: "label-child-of-button",
    description: "Ensure that <label> is not a child of <button>",
  },
  {
    selector: "button object[usemap]",
    category: "error",
    name: "object[usemap]-child-of-button",
    description: "Ensure that <object usemap> is not a child of <button>",
  },
  {
    selector: "button select",
    category: "error",
    name: "select-child-of-button",
    description: "Ensure that <select> is not a child of <button>",
  },
  {
    selector: "button textarea",
    category: "error",
    name: "textarea-child-of-button",
    description: "Ensure that <textarea> is not a child of <button>",
  },
  {
    selector: "button video[controls]",
    category: "error",
    name: "video[controls]-child-of-button",
    description: "Ensure that <video controls> is not a child of <button>",
  },
  {
    selector: "button:not([aria-label]):not([aria-labelledby]):empty",
    category: "error",
    name: "empty-label-button",
    description:
      "Ensure that <button> has meaningful content or is labelled appropriately",
  },
  {
    selector: "[dir]:not([dir=rtl]):not([dir=ltr]):not([dir=auto])",
    category: "error",
    name: "invalid-dir-value",
    description:
      "Ensure that the dir attribute can only have the values, 'ltr', 'rtl' and 'auto'",
  },
  {
    selector: "h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty",
    category: "error",
    name: "empty-heading",
    description: "Ensure that headings must not be empty",
  },
  {
    selector:
      "h1[aria-hidden], h2[aria-hidden], h3[aria-hidden], h4[aria-hidden], h5[aria-hidden], h6[aria-hidden]",
    category: "error",
    name: "aria-hidden-heading",
    description:
      "Ensure that headings should be reachable by assistive technologies (no aria-hidden)",
  },
  {
    selector:
      "h2 ~ h1:first-of-type, h2 ~ * h1:first-of-type, h3 ~ h2:first-of-type, h3 ~ * h2:first-of-type, h4 ~ h2:first-of-type, h4 ~ * h2:first-of-type, h5 ~ h2:first-of-type, h5 ~ * h2:first-of-type, h6 ~ h2:first-of-type, h6 ~ * h2:first-of-type, h4 ~ h3:first-of-type, h4 ~ * h3:first-of-type, h5 ~ h3:first-of-type, h5 ~ * h3:first-of-type, h6 ~ h3:first-of-type, h6 ~ * h3:first-of-type, h5 ~ h4:first-of-type, h5 ~ * h4:first-of-type, h6 ~ h4:first-of-type, h6 ~ * h4:first-of-type, h6 ~ h5:first-of-type, h6 ~ * h5:first-of-type",
    category: "error",
    name: "skip-heading-levels",
    description: "Ensure that headings should not skip levels",
  },
  {
    selector: "html:not([lang]) body",
    category: "error",
    name: "missing-lang-attribute",
    description: "Ensure that html has lang attribute",
  },
  {
    selector: "html[lang=''] body",
    category: "error",
    name: "empty-lang-attribute",
    description: "Ensure that html lang attribute should not be empty",
  },
  {
    selector: "iframe:not([title])",
    category: "error",
    name: "missing-iframe-title",
    description: "Ensure that all <iframe> must have a title",
  },
  {
    selector: "img:not([alt])",
    category: "error",
    name: "missing-img-alt",
    description: "Ensure that all <img> must have alternative text",
  },
  {
    selector: "a audio[controls]",
    category: "error",
    name: "audio[controls]-child-of-a",
    description: "Ensure that <audio controls> is not a child of <a>",
  },
  {
    selector: "a button",
    category: "error",
    name: "button-child-of-a",
    description: "Ensure that <button> is not a child of <a>",
  },
  {
    selector: "a details",
    category: "error",
    name: "details-child-of-a",
    description: "Ensure that <details> is not a child of <a>",
  },
  {
    selector: "a embed",
    category: "error",
    name: "embed-child-of-a",
    description: "Ensure that <embed> is not a child of <a>",
  },
  {
    selector: "a iframe",
    category: "error",
    name: "iframe-child-of-a",
    description: "Ensure that <iframe> is not a child of <a>",
  },
  {
    selector: "a img[usemap]",
    category: "error",
    name: "img[usemap]-child-of-a",
    description: "Ensure that <img usemap> is not a child of <a>",
  },
  {
    selector: "a input:not([type=hidden])",
    category: "error",
    name: "input[type=hidden]-child-of-a",
    description: "Ensure that <input type='hidden'> is not a child of <a>",
  },
  {
    selector: "a label",
    category: "error",
    name: "label-child-of-a",
    description: "Ensure that <label> is not a child of <a>",
  },
  {
    selector: "a object[usemap]",
    category: "error",
    name: "object[usemap]-child-of-a",
    description: "Ensure that <object usemap> is not a child of <a>",
  },
  {
    selector: "a select",
    category: "error",
    name: "select-child-of-a",
    description: "Ensure that <select> is not a child of <a>",
  },
  {
    selector: "a textarea",
    category: "error",
    name: "textarea-child-of-a",
    description: "Ensure that <textarea> is not a child of <a>",
  },
  {
    selector: "a video[controls]",
    category: "error",
    name: "video[controls]-child-of-a",
    description: "Ensure that <video controls> is not a child of <a>",
  },
  {
    selector: "a[href]:not([aria-label]):not([aria-labelledby]):empty",
    category: "error",
    name: "missing-aria-label-of-a",
    description:
      "Ensure that <a> has meaningful content or is labelled appropriately",
  },
  {
    selector:
      "ol > *:not(li):not(script):not(template)::after, ul > *:not(li):not(script):not(template)",
    category: "error",
    name: "invalid-child-of-list",
    description:
      "Ensure <li>, <script> or <template> are the only direct children of <ul> or <ol>",
  },
  {
    selector: "dl > *:not(dt):not(dd)",
    category: "error",
    name: "invalid-child-of-dl",
    description:
      "Ensure that the only direct children of <dl> are <dt> and <dd>",
  },
  {
    selector:
      "nav:not([aria-label]):not([aria-labelledby]) ~ nav::after, nav ~ nav:not([aria-label]):not([aria-labelledby])",
    category: "error",
    name: "missing-aria-label-of-multiple-nav",
    description:
      "<nav> indicates the primary navigation for the page. In cases where multiple primary navigations exist, an aria-label or aria-labelledby attribute must be present on both <nav> elements",
  },
  {
    selector: "a[href][tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-a[href]",
    description:
      "Ensure that <a> with an href attribute does not have a tab index of -1",
  },
  {
    selector: "area[href][tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-area[href]",
    description:
      "Ensure that <area> with an href attribute does not have a tab index of -1",
  },
  {
    selector: "input:not([disabled])[tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-input",
    description:
      "Ensure that <input> that is not disabled does not have a tab index of -1",
  },
  {
    selector: "select:not([disabled])[tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-select",
    description:
      "Ensure that <select> that is not disabled does not have a tab index of -1",
  },
  {
    selector: "textarea:not([disabled])[tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-textarea",
    description:
      "Ensure that <textarea> that is not disabled does not have a tab index of -1",
  },
  {
    selector: "button:not([disabled])[tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-button",
    description:
      "Ensure that <button> that is not disabled does not have a tab index of -1",
  },
  {
    selector: "iframe[tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-iframe",
    description: "Ensure that <iframe> does not have a tab index of -1",
  },
  {
    selector: "[contentEditable=true][tabindex='-1']",
    category: "error",
    name: "-1-tab-index-of-editable-content",
    description:
      "Ensure that HTML elements with editable content don't have a tab index of -1",
  },
  {
    selector:
      "area[id*='NAN'], area[id*='null'], area[id*='undefined'], br[id*='NAN'], br[id*='null'], br[id*='undefined']",
    category: "error",
    name: "Bad computed value for [id]",
    description: "Ensure that HTML elements do not have invalid ids",
  },
  {
    selector:
      "area[role='checkbox']:not([aria-checked]), base[role='checkbox']:not([aria-checked]), br[role='checkbox']:not([aria-checked]), col[role='checkbox']:not([aria-checked]), command[role='checkbox']:not([aria-checked]), embed[role='checkbox']:not([aria-checked]), hr[role='checkbox']:not([aria-checked]), img[role='checkbox']:not([aria-checked]), input[role='checkbox']:not([aria-checked]), link[role='checkbox']:not([aria-checked]), meta[role='checkbox']:not([aria-checked]), textarea[role='checkbox']:not([aria-checked]), select[role='checkbox']:not([aria-checked])",
    category: "error",
    name: "bad role assigning of checkbox",
    description:
      "Ensure that only proper html elemnets should be assigned checkbox as role",
  },
  {
    selector:
      "[role='scrollbar']:not([aria-controls]), [role='scrollbar']:not([aria-valuemin]), [role='scrollbar']:not([aria-valuemax]), [role='scrollbar']:not([aria-valuenow]), [role='scrollbar']:not([aria-orientation])",
    category: "error",
    name: "scrollbar not given control",
    description: "Ensure that scrollbar is given all movement controls",
  },
  {
    selector:
      "img:not([src]):not([srcset]), input[type='image']:not([src]):not([srcset]), img[src=''], img[src=' '], img[src='#'], img[src='/'], input[type='image'][src=''], input[type='image'][src=' '], input[type='image'][src='#'], input[type='image'][src='/']",
    category: "error",
    name: "image and input path incorrect",
    description: "Ensure the src of image is viable and approachable",
  },
  {
    selector:
      "[type='radio']:not([name]), [type='checkbox']:not(:only-of-type):not([name]), [role='slider']:not([aria-valuemin]), [role='slider']:not([aria-valuemax]), [role='slider']:not([aria-valuenow]), area[role='slider']:not([aria-valuemin]), area[role='slider']:not([aria-valuemax]), area[role='slider']:not([aria-valuenow])",
    category: "error",
    name: "extreme values of sliders",
    description: "Ensure that sliders and radio buttons have defined ranges",
  },
  {
    selector:
      "meta[name='viewport'][content*='maximum-scale'] ~ link:last-of-type, meta[name='viewport'][content*='minimum-scale'] ~ link:last-of-type, meta[name='viewport'][content*='user-scalable=no'] ~ link:last-of-type",
    category: "error",
    name: "Unaccessible [meta name=viewport]",
    description: "Ensure the meta viewport is accessible on all devices",
  },
  {
    selector:
      "meta[charset]:not([charset='utf-8']):not([charset='UTF-8']) ~ link:last-of-type",
    category: "error",
    name: "[charset] isn't utf-8",
    description: "Ensure that the charset is standard utf-8",
  },
  {
    selector: "head :first-child:not([charset]) ~ link:last-of-type",
    category: "error",
    name: "<head> must start with [charset]",
    description: "Ensure the correct formatting of head tag",
  },
  {
    selector: "[dir]:not([dir='rtl']):not([dir='rtl']):not([dir='auto'])",
    category: "error",
    name: "Invalid [dir]",
    description: "Ensure the correct structure of directory",
  },
];

module.exports = error;
