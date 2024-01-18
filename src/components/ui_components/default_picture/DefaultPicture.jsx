import Avatar from "boring-avatars";

const DefaultPicture = (username) => {
  return (
    <Avatar
      size={"100%"}
      name={username}
      variant="beam"
      colors={["#F3B578", "#F78376", "#DA4C66", "#8F3C68", "#3F3557"]}
    />
  );
};

export default DefaultPicture;
