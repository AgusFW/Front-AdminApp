/* eslint-disable react/prop-types */
export const EventBox = ({ event }) => {

  const { title, user } = event;
  //console.log(event);

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};