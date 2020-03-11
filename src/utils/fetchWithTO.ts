type FetchInputType = Parameters<typeof fetch>;
type FetchOuputType = ReturnType<typeof fetch>;

export function fetchWithTO(...fetchInput: FetchInputType): FetchOuputType {
  const FETCH_TIMEOUT = 5000;
  let didTimeOut = false;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function() {
      didTimeOut = true;
      reject(new Error("Request timed out"));
    }, FETCH_TIMEOUT);

    fetch(...fetchInput)
      .then(function(response: Response) {
        // Clear the timeout as cleanup
        clearTimeout(timeout);
        if (!didTimeOut) {
          response.status === 200
            ? resolve(response)
            : reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch(function(err) {
        // Rejection already happened with setTimeout
        if (didTimeOut) return;
        // Reject with error
        reject(err);
      });
  });
}
