/**
 * shouldComponentUpdate check to avoid expensive re-renders
 *
 * React is a templating language that renders EVERY TIME the props or the state of the component changes.
 * So imagine having to render the entire page every time there in an action. That takes a big load on the browser.
 * That’s where ShouldComponentUpdate comes in, whenever React is rendering the view it checks to see
 * if shouldComponentUpdate is returning false/true. So whenever you have a component that’s static do yourself a favor and return false.
 * Or if is not static check to see if the props/state has changed.
 *
 * @Reference:
 * https://medium.com/@nesbtesh/react-performance-optimization-28ec5b61fff3
 */

// BAD
const AutocompleteItem = (props) => {
  const {props} = this;
  const selectedClass = props.selected === true ? "selected" : "";
  var path = parseUri(props.url).path;
  path = path.length <= 0 ? props.url : "..." + path;

  return (
    <li
      onMouseLeave={props.onMouseLeave}
      className={selectedClass}>
      <i className="ion-ios-eye"
         data-image={props.image}
         data-url={props.url}
         data-title={props.title}
         onClick={props.handlePlanetViewClick}/>
      <span
        onMouseEnter={props.onMouseEnter}
      >
        <div className="dot bg-mint"/>
        {path}
      </span>
    </li>
  );
};

// GOOD
export default class AutocompleteItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.url !== this.props.url ||
      nextProps.selected !== this.props.selected
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {props} = this;
    const selectedClass = props.selected === true ? "selected" : "";
    var path = parseUri(props.url).path;
    path = path.length <= 0 ? props.url : "..." + path;

    return (
      <li
        onMouseLeave={props.onMouseLeave}
        className={selectedClass}>
        <i className="ion-ios-eye"
           data-image={props.image}
           data-url={props.url}
           data-title={props.title}
           onClick={props.handlePlanetViewClick}/>
        <span
          onMouseEnter={props.onMouseEnter}>
          <div className="dot bg-mint"/>
          {path}
        </span>
      </li>
    );
  }
}
