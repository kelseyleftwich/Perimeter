import React from 'react';
import PropTypes from 'prop-types';
import {MapView} from 'expo';
import {forestGreen} from '../../styles/colors';

const TrailheadMap = ({trail, height}) => {
  return(
    <MapView
      style={{ alignSelf: 'stretch', height: height }}
      initialRegion={{
        latitude: trail.latitude,
        longitude: trail.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }}
      ref={(ref) => { this.mapRef = ref; }}
      onLayout={() => this.mapRef.fitToCoordinates(trail.trailheads, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: false })}
      >
      {
        trail.trailheads &&
        trail.trailheads.map((trailhead, index) => {
          return (
            <MapView.Marker key={index}
              coordinate={{
                latitude: trailhead.latitude,
                longitude: trailhead.longitude,
              }}
              title={trailhead.name}
              description={'Trailhead ' + (index + 1).toString() + ' of ' + trail.trailheads.length.toString()}/>
          )
        })
      }
      {
        trail.polylines &&
        trail.polylines.map((polyline, index) => {
          return(
            <MapView.Polyline key={index}
            coordinates={polyline}
            strokeColor={forestGreen}
            strokeWidth={2}
            lineDashPattern={[2,3]}/>
        );
        })
      }
    </MapView>
  );
};

TrailheadMap.propTypes = {
  trail: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired
};

export default TrailheadMap;
