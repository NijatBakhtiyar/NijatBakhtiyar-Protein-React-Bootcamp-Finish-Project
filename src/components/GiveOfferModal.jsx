import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {  useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { API, Service } from "../data/service";
import NoImage from "../images/Png/NoImage.jpg";
import LoadingIcon from "../images/Svg/LoadingIcon";
import { formatPrice } from "../utils/formatPrice";
import styles from "./GiveOfferModal.module.scss";

const offers = [20, 30, 40];

function getOfferWithPercent(percent, price) {
  return (price * percent) / 100;
}

function GiveOfferModal({ product }) {
  const [show, setShow] = useState(false);
  const [offerRadio, setOfferRadio] = useState(offers[0]);
  const [offerInput, setOfferInput] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const giveOfferMutation = useMutation(Service.giveOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProduct", product.id.toString()]);
      handleClose();
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      giveOfferMutation.mutate({
        productId: product.id,
        offerPrice: offerInput || getOfferWithPercent(offerRadio, product.price),
        userId: user.id,
      });
    } else {
      navigate('/login')
    }
  };

  return (
    <div className={styles.modal}>
      <Button onClick={handleShow} className={styles.offer}>
        Teklif Ver
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Teklif Ver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.row}>
            <div className={styles.left}>
              <img src={product.image?.url ? `${API}${product.image.url}` : NoImage} alt={product.name} />
              <p>{product.status}</p>
            </div>
            <div className={styles.right}>
              <p>{formatPrice(product.price)} TL</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {offers.map((offer) => {
              const isActive = offer === offerRadio;

              return (
                <div
                  className={
                    isActive
                      ? `${styles.formGroup} ${styles.active}`
                      : styles.formGroup
                  }
                  key={offer}
                >
                  <label>
                    <input
                      type="radio"
                      name="offer"
                      value={offer}
                      checked={offer === offerRadio}
                      onChange={() => {
                        setOfferRadio(offer);
                        setOfferInput("");
                      }}
                    />
                    %{offer}&apos;si Kadar Teklif Ver
                  </label>
                </div>
              );
            })}

            <div className={`${styles.formGroup} ${styles.price}`}>
              <input
                type="number"
                name="offerInput"
                placeholder="Teklif Belirle"
                id="price"
                value={offerInput}
                onChange={(e) => {
                  setOfferInput(e.currentTarget.valueAsNumber);
                  setOfferRadio();
                }}
              />
              <span>TL</span>
            </div>

            <div className={styles.submitBtn}>
              <Button type="submit">
                {giveOfferMutation.isLoading ? <LoadingIcon /> : "Onayla"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GiveOfferModal;
