import React, { Component } from 'react';
import Property from './Property';

class PropertiesList extends Component {
  render() {
    const { buildings, handler, onHover, openApplyModal } = this.props;
    return Object.values(buildings).map((building) => (
      <Property
        key={building._id}
        building={building}
        handler={handler}
        onMouseEnter={() => onHover(building)}
        onMouseLeave={() => onHover(null)}
        openApplyModal={openApplyModal}
      />
    ));
  }
}
export default PropertiesList;
