import { ModalWindowProps, ModalWindowState } from 'data/types';
import React, { Component } from 'react';
import { ModalCard } from './ModalCard/ModalCard';
import './ModalWindow.css';

class ModalWindow extends Component<ModalWindowProps, ModalWindowState> {
  constructor(props: ModalWindowProps) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.active ? 'modal active-modal' : 'modal'}
        onClick={this.props.closeModalWindow}
      >
        <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={this.props.closeModalWindow}>
            X
          </button>
          <ModalCard movie={this.props.movie} />
        </div>
      </div>
    );
  }
}

export { ModalWindow };
