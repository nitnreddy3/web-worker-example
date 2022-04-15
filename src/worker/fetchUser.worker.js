// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = async (message) => {
    let result = [];
    // setTimeout(async () => {
    let start = Date.now();
    while (Date.now() < start + 5000) {}
    try {
      const response = await fetch("https://api.github.com/users");
      result = await response.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    postMessage(result);
    // }, 5000);
  };
};
