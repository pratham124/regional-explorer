import previewClient from "./previewClient";

class resultClient extends previewClient {
  _parentEl = document.querySelector(".results");
  _errorMessage = "Invalid Region. Please try again!";
}
export default new resultClient();
