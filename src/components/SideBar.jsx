import styles from './SideBar.module.css';

const SideBar = ({userData}) => {


  return (
    <div className={styles.sidebar}>
      <div className={styles.seperator} style={{height: 'calc(100vh - 60px)'}}>

        <div className={styles.sidelogo}>
          <p>AutoClub</p>
        </div>

        <div className={styles.profilesection}>
          <img src={userData.p_image_link} alt="Img" style={{width: '50px', height: '50px', borderRadius: '50px'}} />
          <p style={{paddingLeft: '10px'}}>{userData.username}</p>
        </div>

        <div className={styles.clubsection}>

            <div className={styles.title}>
              <p>MEMBER 2</p>
            </div>

            <div className={styles.scrollable}>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
            </div>

            <div className={styles.title}>
              <p>FOLLOWING 8</p>
            </div>

            <div className={styles.scrollable}>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
              <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>CLUB</div>
            </div>

        </div>



      </div>
    </div>
  );
}

export default SideBar;
