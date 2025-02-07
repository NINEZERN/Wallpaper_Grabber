browser.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    details.requestHeaders.push({
      name: "Content-Security-Policy",
      value: "default-src *",
    });
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);

// URL of the archive to be downloaded
const archiveUrl =
  "https://cdn.ggntw.com/BFAdqJ9UvWMVCqD00hiyYGfEEf63VOjgzoJpMWUrGPSavrn6V96SbkqToBDoHVMJOfLgVPqaxve3ODBhQ9Xhk9dvRRe43AShKPPrCmD7NHdz3cCfuGK6RkA0KxCoKVMe";

// Listen for messages from the content script or webpage
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download_archive" && request.url) {
    // Use the URL passed from the button click event
    browser.downloads
      .download({
        url: request.url, 
        filename: "archive.zip", 
        saveAs: true, 
      })
      .then((downloadId) => {
        console.log(`Download started with ID: ${downloadId}`);
      })
      .catch((err) => {
        console.error("Download failed:", err);
      });
  }
});
