import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128579;</span>
        <br />NotFoundBlock
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в данном магазине</p>
    </div>
  )
}


export default NotFoundBlock;
