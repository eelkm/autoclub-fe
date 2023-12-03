
const ClubCard = ({clubname}) => {
  console.log(clubname);
  return (
    <div>
      <div style={{background: 'rgb(61, 5, 5)', height: '50px', borderRadius: '10px', padding: '5px', marginBottom: '4px'}}>
        <p>{clubname}</p>
      </div>
    </div>
  );
}

export default ClubCard;
