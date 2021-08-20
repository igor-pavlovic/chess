function Figure(type, color) {
  this.type = type;
  this.color = color;
  this.col = null;
  this.row = null;
  this.field = null;
  this.hasMoved = false;
  this.isRemoved = false;
}


Figure.prototype.removeFromField = () => {
  this.isRemoved = true;
  this.col = null;
  this.row = null;
  this.field = null;
}


Figure.prototype.moveToField = (field) => {
  this.field = field;
  this.row = field.row;
  this.col = field.col;
  this.hasMoved = true;
}

export default Figure;