import once from 'once';

export const supportsInlineSVG = once(() => {
  /* istanbul ignore next */
  if (!document) {
    return false;
  }

  const div = document.createElement('div');
  div.innerHTML = '<svg />';
  return (
    div.firstChild &&
    div.firstChild.namespaceURI === 'http://www.w3.org/2000/svg'
  );
});

export const isSupportedEnvironment = once(
  () =>
    ((typeof window !== 'undefined' && window !== null
      ? window.XMLHttpRequest
      : false) ||
      (typeof window !== 'undefined' && window !== null
        ? window.XDomainRequest
        : false)) &&
    supportsInlineSVG()
);

export const randomString = (length = 8) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '1234567890';
  const charset = letters + letters.toUpperCase() + numbers;

  const randomCharacter = array =>
    array[Math.floor(Math.random() * array.length)];

  let R = '';
  for (let i = 0; i < length; i++) {
    R += randomCharacter(charset);
  }
  return R;
};

export const uniquifySVGIDs = (() => {
  const mkAttributePattern = attr => `(?:(?:\\s|\\:)${attr})`;

  const idPattern = new RegExp(
    `(?:(${mkAttributePattern('id')})="([^"]+)")|(?:(${mkAttributePattern(
      'href'
    )}|${mkAttributePattern('role')}|${mkAttributePattern(
      'arcrole'
    )})="\\#([^"]+)")|(?:="url\\(\\#([^\\)]+)\\)")`,
    'g'
  );

  return (svgText, svgID) => {
    const uniquifyID = id => `${id}___${svgID}`;

    // eslint-disable-next-line consistent-return
    return svgText.replace(idPattern, (m, p1, p2, p3, p4, p5) => {
      if (p2) {
        return `${p1}="${uniquifyID(p2)}"`;
      } else if (p4) {
        return `${p3}="#${uniquifyID(p4)}"`;
      } else if (p5) {
        return `="url(#${uniquifyID(p5)})"`;
      }
    });
  };
})();

class InlineSVGError extends Error {
  constructor(message) {
    super();

    this.name = 'InlineSVGError';
    this.isSupportedBrowser = true;
    this.isConfigurationError = false;
    this.isUnsupportedBrowserError = false;
    this.message = message;

    return this;
  }
}

const createError = (message, attrs) => {
  const err = new InlineSVGError(message);

  return {
    ...err,
    ...attrs,
  };
};

export const unsupportedBrowserError = message => {
  let newMessage = message;

  /* istanbul ignore else */
  if (!newMessage) {
    newMessage = 'Unsupported Browser';
  }

  return createError(newMessage, {
    isSupportedBrowser: false,
    isUnsupportedBrowserError: true,
  });
};

export const configurationError = message =>
  createError(message, {
    isConfigurationError: true,
  });
