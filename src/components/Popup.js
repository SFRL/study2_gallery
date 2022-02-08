import "../css/popup.css";

const Popup = (props) => {
  return (
    <div className="backdrop">
      <section className="popup">{props.children}</section>
    </div>
  );
};

export default Popup;
