import PropTypes from "prop-types";
import "./Quality.scss";

function Quality({ value, handle, data, title }) {
  return (
    <div className="quality__fields">
      <h1 className="quality__title_select">Отображать {title}:</h1>
      <select
        value={value}
        onChange={e => handle(Number(e.target.value))}
        className="quality__select"
      >
        <option className="quality__option" value={10}>
          10
        </option>
        <option className="quality__option" value={20}>
          20
        </option>
        <option className="quality__option" value={50}>
          50
        </option>
        <option className="quality__option" value={100}>
          100
        </option>
        <option className="quality__option" value={data.length}>
          All
        </option>
      </select>
    </div>
  );
}

Quality.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handle: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Quality;
