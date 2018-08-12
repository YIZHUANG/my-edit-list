import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Editable extends PureComponent {
  static propTypes = {
    htmlText: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    customTag: PropTypes.string,
    className: PropTypes.string
  };
  static defaultProps = {
    editable: false,
    customTag: undefined,
    className: undefined,
    onChange: undefined
  };
  constructor({ htmlText }) {
    super();
    this.lastHtml = htmlText;
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(e) {
    const { onChange } = this.props;
    if (
      typeof onChange === 'function' &&
      e.target.textContent !== this.lastHtml
    ) {
      onChange(e.target.textContent);
      this.lastHtml = e.target.textContent;
    }
  }
  render() {
    const { customTag, className, htmlText, editable, ...props } = this.props;
    return React.createElement(customTag || 'div', {
      ...props,
      className: className,
      contentEditable: editable,
      onBlur: this.onTextChange,
      dangerouslySetInnerHTML: { __html: htmlText }
    });
  }
}
