export default class NotFoundException extends Error {
  constructor() {
    super("Not Found")
  }
}
