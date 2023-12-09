import styles from './MainSection.module.css';
const MainSection = ({userData}) => {
  return (
<div className={styles.main}>
  <div className={styles.search_bar}>
    <input type="text" placeholder="Search" />
    <button className={styles.right_side_button}>
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="css-i6dzq1"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  </div>
  <div className={styles.main_container}>
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <img
          src={userData.p_image_link}
          alt=""
          className={styles.profile_img}
        />
        <div className={styles.profile_name}>{userData.username}</div>
      </div>
      <img
        src="https://cdnb.artstation.com/p/assets/images/images/013/120/453/large/rostislav-prokop-prelude-49.jpg?1538142044"
        alt=""
        className={styles.profile_cover}
      />
      <div className={styles.profile_menu}>
        <a className={`${styles.profile_menu_link} ${styles.active}`}>Timeline</a>
        <a className={styles.profile_menu_link}>Garage</a>
        <a className={styles.profile_menu_link}>Friends</a>
        <a className={styles.profile_menu_link}>Photos</a>
        <a className={styles.profile_menu_link}>More</a>
      </div>
    </div>
    <div className={styles.timeline}>
      <div className={styles.timeline_left}>
        <div className={`${styles.intro} ${styles.box}`}>
          <div className={styles.intro_title}>
            Introduction
            <button className={styles.intro_menu} />
          </div>
          <div className={styles.info}>

            <div>lorem</div>

          </div>
        </div>
        <div className={`${styles.event} ${styles.box}`}>
          <div className={styles.event_wrapper}>
            <img
              src="https://www.latvia.travel/sites/default/files/styles/mobile_promo/public/media_image/50694300443_c304a08d14_k.jpg?itok=z14xPQ7g"
              className={styles.event_img}
            />
            <div className={styles.event_date}>
              <div className={styles.event_month}>Jan</div>
              <div className={styles.event_day}>01</div>
            </div>
            <div className={styles.event_title}>Car Meet Jelgava</div>
            <div className={styles.event_subtitle}>01st Jan, 2019 19:00</div>
          </div>
        </div>
        <div className={`${styles.pages} ${styles.box}`}>
          <div className={styles.intro_title}>
            Your clubs
            <button className={styles.intro_menu} />
          </div>
          <div className={styles.user}>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
              alt=""
              className={styles.user_img}
            />
            <div className={styles.username}>Item 1</div>
          </div>
          <div className={styles.user}>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
              alt=""
              className={styles.user_img}
            />
            <div className={styles.username}>Item 2</div>
          </div>
          <div className={styles.user}>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-c815116b769523ce3c69bb7dd6a87930"
              alt=""
              className={styles.user_img}
            />
            <div className={styles.username}>Item 3</div>
          </div>
        </div>
      </div>
      <div className={styles.timeline_right}>
        <div className={`${styles} ${styles.box}`}>
          <div className={styles.status_menu}>
            <a className={`${styles.status_menu_item} ${styles.active_st}`} href="#">
              Status
            </a>
            <a className={styles.status_menu_item} href="#">
              Photo
            </a>
            <a className={styles.status_menu_item} href="#">
              Video
            </a>
          </div>
          <div className={styles.status_main}>
            <img
              src={userData.p_image_link}
              className={styles.status_img}
            />
            <textarea
              className={styles.status_textarea}
              placeholder="Write something.."
              defaultValue={""}
            />
          </div>
          <div className={styles.status_actions}>
            <a href="#" className={styles.status_action}>
              <svg viewBox="-42 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M333.7 123.3c0 33.9-12.2 63.2-36.2 87.2-24 24-53.3 36.1-87.1 36.1h-.1c-33.9 0-63.2-12.1-87.1-36.1-24-24-36.2-53.3-36.2-87.2 0-33.9 12.2-63.2 36.2-87.2 24-24 53.2-36 87-36.1h.2c33.8 0 63.2 12.2 87.1 36.1 24 24 36.2 53.3 36.2 87.2zm0 0"
                  fill="#ffbb85"
                />
                <path
                  d="M427.2 424c0 26.7-8.5 48.3-25.3 64.3-16.5 15.7-38.4 23.7-65 23.7H90.2c-26.6 0-48.5-8-65-23.7C8.5 472.3 0 450.7 0 423.9c0-10.2.3-20.4 1-30.2a302.7 302.7 0 0112.1-64.9c3.3-10.3 7.8-20.5 13.4-30.3 5.8-10.2 12.5-19 20.1-26.3a89 89 0 0129-18.2c11.2-4.4 23.7-6.7 37-6.7 5.2 0 10.3 2.2 20 8.5l21 13.5c6.6 4.3 15.7 8.3 27 11.9a107.7 107.7 0 0033 5.3c11 0 22-1.8 33-5.3 11.2-3.6 20.3-7.6 27-12l21-13.4c9.7-6.3 14.7-8.5 20-8.5 13.3 0 25.7 2.3 37 6.7a89 89 0 0128.9 18.2c7.6 7.3 14.4 16.1 20.2 26.3 5.5 9.8 10 20 13.3 30.3a305.5 305.5 0 0112.1 64.9c.7 9.8 1 20 1 30.2zm0 0"
                  fill="#6aa9ff"
                />
                <path
                  d="M210.4 246.6h-.1V0c34 0 63.3 12.2 87.2 36.1 24 24 36.2 53.3 36.2 87.2 0 33.9-12.2 63.2-36.2 87.2-24 24-53.3 36.1-87.1 36.1zm0 0"
                  fill="#f5a86c"
                />
                <path
                  d="M427.2 424c0 26.7-8.5 48.3-25.3 64.3-16.5 15.7-38.4 23.7-65 23.7H210.2V286.5h3.3c11 0 22-1.8 33-5.3 11.2-3.6 20.3-7.6 27-12l21-13.4c9.7-6.3 14.7-8.5 20-8.5 13.3 0 25.7 2.3 37 6.7a89 89 0 0128.9 18.2c7.6 7.3 14.4 16.1 20.2 26.3 5.5 9.8 10 20 13.3 30.3a305.5 305.5 0 0112.1 64.9c.7 9.8 1 20 1 30.2zm0 0"
                  fill="#2682ff"
                />
              </svg>
              Item
            </a>
            <a href="#" className={styles.status_action}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M87.084 192c-.456-5.272-.688-10.6-.688-16C86.404 78.8 162.34 0 256.004 0s169.6 78.8 169.6 176c0 5.392-.232 10.728-.688 16h.688c0 96.184-169.6 320-169.6 320s-169.6-223.288-169.6-320h.68zm168.92 32c36.392 1.024 66.744-27.608 67.84-64-1.096-36.392-31.448-65.024-67.84-64-36.392-1.024-66.744 27.608-67.84 64 1.096 36.392 31.448 65.024 67.84 64z"
                  fill="#e21b1b"
                />
              </svg>
              Item
            </a>
            <a href="#" className={styles.status_action}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <circle cx={256} cy={256} r={256} fill="#ffca28" />
                <g fill="#6d4c41">
                  <path d="M399.68 208.32c-8.832 0-16-7.168-16-16 0-17.632-14.336-32-32-32s-32 14.368-32 32c0 8.832-7.168 16-16 16s-16-7.168-16-16c0-35.296 28.704-64 64-64s64 28.704 64 64c0 8.864-7.168 16-16 16zM207.68 208.32c-8.832 0-16-7.168-16-16 0-17.632-14.368-32-32-32s-32 14.368-32 32c0 8.832-7.168 16-16 16s-16-7.168-16-16c0-35.296 28.704-64 64-64s64 28.704 64 64c0 8.864-7.168 16-16 16z" />
                </g>
                <path
                  d="M437.696 294.688c-3.04-4-7.744-6.368-12.736-6.368H86.4c-5.024 0-9.728 2.336-12.736 6.336-3.072 4.032-4.032 9.184-2.688 14.016C94.112 390.88 170.08 448.32 255.648 448.32s161.536-57.44 184.672-139.648c1.376-4.832.416-9.984-2.624-13.984z"
                  fill="#fafafa"
                />
              </svg>
              Item
            </a>
            <button className={styles.status_share}>Post</button>
          </div>
        </div>
        <div className={`${styles.post} ${styles.box}`}>
          <div className={styles.status_main}>
            <img
              src={userData.p_image_link}
              className={styles.status_img}
            />
            <div className={styles.post_detail}>
              <strong>{userData.username}</strong> added new post
              <div className={styles.post_date}>6 hours ago</div>
            </div>
            <button className={styles.intro_menu} />
          </div>
          <div className={styles.post_content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nobis adipisci ea amet at repellat impedit illum cupiditate accusantium? Praesentium!
          <img
            src="https://www.aiktuning.com/cdn/shop/products/57_71dcdb7a-cc6d-4c7c-9b11-4c751fda1717_1024x1024.jpg?v=1607519391"
            alt=""
            className={styles.post_photo}
          />
          </div>
          <div className={styles.post_actions}>
            <a href="#" className={styles.post_action}>
              <svg
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              87
            </a>
            <a href="#" className={styles.post_action}>
              <svg
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              20
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default MainSection;
