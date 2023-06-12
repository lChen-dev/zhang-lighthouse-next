import React, { Component } from 'react';
import Property from './Property';

class PropertiesList extends Component {
  render() {
    const { buildings, onHover, openPicsModal, openFloorPlanModal, updateClientList, clientList, removeFromClientList } = this.props;
    return Object.values(buildings).map((building) => (
      <Property
        key={building.id}
        building={building}
        onMouseEnter={() => onHover(building)}
        onMouseLeave={() => onHover(null)}
        openFloorPlanModal={openFloorPlanModal}
        openPicsModal={openPicsModal}
        updateClientList={updateClientList}
        clientList={clientList}
        removeFromClientList={removeFromClientList}
      />
    ));
  }
}
export default PropertiesList;
