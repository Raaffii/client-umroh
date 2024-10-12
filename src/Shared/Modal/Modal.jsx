import { useReducer } from "react";
import "./Modal.css";
import Input from "../Form/Input";

export default function Modal({ toggleModal, modal, children }) {
  return (
    <>
      {modal && (
        <div className='modalo'>
          <div onClick={toggleModal} className='overlayo'></div>
          <div className='modal-contento'>
            {children}

            <button type='button' className='btn btn-dark btn-rounded btn-icon close-modalo' onClick={toggleModal}>
              <i className='icon-cross'></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
