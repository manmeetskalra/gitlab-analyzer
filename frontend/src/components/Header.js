import styles from "../style/header.module.css"; 

const Header = (props) => {
  return (
    <div>
      <h1 className={styles.header}>{props.pageTitle}</h1> 
    </div>
  );
};

export default Header;
