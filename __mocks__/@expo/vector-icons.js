const React = require('react');

const createIconSet = () => {
  return ({ name, size, color }) => React.createElement('View', { testID: name });
};

module.exports = {
  MaterialCommunityIcons: createIconSet(),
  AntDesign: createIconSet(),
  Entypo: createIconSet(),
  EvilIcons: createIconSet(),
  Feather: createIconSet(),
  FontAwesome: createIconSet(),
  FontAwesome5: createIconSet(),
  Foundation: createIconSet(),
  Ionicons: createIconSet(),
  MaterialIcons: createIconSet(),
  Octicons: createIconSet(),
  SimpleLineIcons: createIconSet(),
  Zocial: createIconSet(),
}; 