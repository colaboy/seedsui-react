import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  margin: 10px 12px;
  .col-3:nth-child(odd){
    color: #aaa;
  }
`;

export default class Attributes extends Component {
  static propTypes = {
    col: PropTypes.number,
    list: PropTypes.array,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    rowClassName: PropTypes.string,
    rowStyle: PropTypes.object,
  };

  static defaultProps = {
    col: 2,
    list: []
  }

  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {col, list, onClick, className, style, rowClassName, rowStyle} = this.props;
    const attrsDOM = [];
    for (let i = 0; i < list.length;) {
      if (col === 2) {
        attrsDOM.push(<Row className={`row-flex ${rowClassName}`} style={rowStyle} onClick={onClick} key={i}>
          <div className="col-3">{list[i].name}</div>
          <div className="col-9">{list[i].value}</div>
        </Row>);
        i++;
      } else if (col === 4) {
        attrsDOM.push(<Row className={`row-flex ${rowClassName}`} style={rowStyle} onClick={onClick} key={i}>
          <div className="col-3">{list[i].name}</div>
          <div className="col-3">{list[i].value}</div>
          <div className="col-3">{list[i + 1].name ? list[i + 1].name : ''}</div>
          <div className="col-3">{list[i + 1].name ? list[i + 1].value : ''}</div>
        </Row>);
        i += 2;
      } else {
        attrsDOM.push(<div>请转入合法的col</div>);
        break;
      }
    }
    return (
      <div style={style} className={className}>
        {attrsDOM}
      </div>
    );
  }
}
