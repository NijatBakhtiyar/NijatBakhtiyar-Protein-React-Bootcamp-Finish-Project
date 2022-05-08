import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "../context/UserContext";
import { Service } from "../data/service";
import styles from "./BuyProductModal.module.scss";

function BuyProductModal({ product, onSuccess }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const productBuyMutation = useMutation(Service.buyProduct, {
    onSuccess: onSuccess
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyProduct = () => {
    if (user) {
      productBuyMutation.mutate(product?.id);
      toast.success("Satın Alındı")
      setShow(false)
    } else {
      navigate('/login')
    }
  };

  return (

    <div className={styles.modal}>
      <Button onClick={handleShow} className={styles.buy}>
        Satın Al
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div className={styles.modalBody}>
            <h1>Satın Al</h1>
            <p>Satın Almak istiyor musunuz?</p>
            <div className={styles.btns}>
              <Button onClick={handleClose} className={styles.reject}>
                Vazgeç
              </Button>
              <Button onClick={buyProduct} className={styles.buy}>
                Satın Al
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BuyProductModal;
