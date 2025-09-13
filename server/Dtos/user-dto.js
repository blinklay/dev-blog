module.exports = class UesrDto {
  email;
  username;
  id;
  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.username = model.username
  }
}