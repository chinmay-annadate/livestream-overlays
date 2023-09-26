function Overlay({ text, left, top, size }) {
  const overlayStyle = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    fontSize: `${size}px`,
    color: 'white',
  };

  return (
    <div style={overlayStyle}>
      {text}
    </div>
  );
}

export default Overlay;
