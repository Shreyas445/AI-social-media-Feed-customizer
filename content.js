function blockContent() {
    chrome.storage.local.get("blockedKeywords", function (data) {
        const keywords = data.blockedKeywords || [];
        if (keywords.length === 0) return;

        const allElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, div");
        allElements.forEach((element) => {
            if (keywords.some((kw) => element.textContent.toLowerCase().includes(kw.toLowerCase()))) {
                element.style.display = "none";
            }
        });
    });
}

const observer = new MutationObserver(blockContent);
observer.observe(document.body, { childList: true, subtree: true });

blockContent();