import { BtnSubmitProps } from 'data/types';
import React from 'react';
import './ButtonSubmit.css';

class ButtonSubmit extends React.Component<BtnSubmitProps> {
  constructor(props: BtnSubmitProps) {
    super(props);
  }

  render() {
    return (
      <button
        type={'submit'}
        className="submit"
        data-testid={'btn-submit'}
        disabled={this.props.disabled}
      >
        Отправить
      </button>
    );
  }
}

export { ButtonSubmit };
