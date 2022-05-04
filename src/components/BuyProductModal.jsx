import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";

import { Service } from "../data/service";
import styles from "./BuyProductModal.module.scss";

function BuyProductModal({ product, boughtToast }) {
  const queryClient = useQueryClient();
  const productBuyMutation = useMutation(Service.buyProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProduct", product.id.toString()]);
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyProduct = () => {
    productBuyMutation.mutate(product.id);
    boughtToast();
    setShow(false)
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
