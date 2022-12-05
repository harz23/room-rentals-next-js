export default class HttpError extends Error {
    public status: number;
  
    constructor(status: number) {
      super(status.toString());
      this.status = status;
    }
  }
  