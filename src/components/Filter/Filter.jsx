import PropTypes from "prop-types";
import "./Filter.scss";

function Filter({ value, setter, checked, handle, title }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Поиск по заголовку"
        value={value}
        onChange={e => setter(e.target.value)}
        className="filters__search"
      />
      <label className="filters__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={handle}
          className="filters__input"
        />
        только {title}
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  handle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Filter;
