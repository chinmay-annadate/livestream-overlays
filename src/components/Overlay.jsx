function Overlay({ text, left, top }) {
  const overlayStyle = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    fontSize: '24px',
    color: 'white',
  };

  return (
    <div style={overlayStyle}>
      {text}
    </div>
  );
}

export default Overlay;
