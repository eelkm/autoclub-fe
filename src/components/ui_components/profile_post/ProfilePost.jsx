import styles from "./ProfilePost.module.css";
import YouTube from 'react-youtube';


const isYouTubeLink = (url) => {
  console.log(url);
  // Regular expression to match YouTube video URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};

const extractVideoId = (link) => {
  // Regular expression to get video ID from YouTube URL
  const match = link.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  console.log(match);
  return match && match[1];
};


const ProfilePost = ({username, p_image, post}) => {
  
  const dateObject = new Date(post.date_created);
  const date = dateObject.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  



  return (
    <div className={`${styles.post} ${styles.box}`}>
    <div className={styles.status_main}>
      <img
        src={p_image}
        className={styles.status_img}
      />
      <div className={styles.post_detail}>
        <strong>{username}</strong> added new post
        <div className={styles.post_date}>{date}</div>
      </div>
      <button className={styles.intro_menu} />
    </div>
    <div className={styles.post_content}>
      {post.text}
      {isYouTubeLink(post.post_media_url) ? (
          <YouTube videoId={extractVideoId(post.post_media_url)} className={styles.post_photo} />
        ) : (
          <img src={post.post_media_url} alt="" className={styles.post_photo} />
        )}
      
    </div>
    <div className={styles.post_actions}>
      <a href="#" className={styles.post_action}>
        <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        {post.likes}
      </a>
      <a href="#" className={styles.post_action}>
        <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        {post.comment_count}
      </a>
    </div>
  </div>
  );
}

export default ProfilePost;
