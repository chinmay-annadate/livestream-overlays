function Overlay({ text, left, top, size, imageUrl }) {
    const overlayStyle = {
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
    };
  
    const imgStyle = {
      width: `${size}px`,
      height: "auto", // This ensures the aspect ratio is maintained.
    };
  
    return (
      <div style={overlayStyle}>
        <img src={imageUrl} alt={text} style={imgStyle} />
      </div>
    );
  }
  
  export default Overlay;
  