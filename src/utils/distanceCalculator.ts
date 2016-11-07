function radians(degrees) {
  return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
function degrees(radians) {
  return radians * 180 / Math.PI;
};
const distanceCalculator = function(latitude1, longitude1, latitude2, longitude2)  {
  var theta = longitude1 - longitude2;
  var distance = Math.sin(radians(latitude1)) * Math.sin(radians(latitude2)) + 
    Math.cos(radians(latitude1)) * Math.cos(radians(latitude2)) * Math.cos(radians(theta));
  if(distance>1){
    distance = 1;
  }

  distance = Math.acos(distance);
  distance = degrees(distance);

  return distance * 60 * 1.853159616;
}

export default distanceCalculator;
