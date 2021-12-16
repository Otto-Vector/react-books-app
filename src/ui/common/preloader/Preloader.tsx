import React from "react";
import styles from "./preloader.module.scss"
import preLoader from "../../../images/Spinner.svg"

const Preloader = () => {

    return (
      <div className={styles.preloader}>
        <img className={styles.image} src={preLoader} alt='preload' />
      </div>
    )
}

export default Preloader
