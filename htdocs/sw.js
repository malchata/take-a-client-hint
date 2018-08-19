self.addEventListener("fetch", event => {
  if (/\.(png|jpe?g|svg|gif)$/i.test(event.request.url) === true) {
  }
});
