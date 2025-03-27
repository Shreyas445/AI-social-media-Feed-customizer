document.addEventListener("DOMContentLoaded", function () {
    const keywordInput = document.getElementById("keyword");
    const addKeywordBtn = document.getElementById("addKeyword");
    const keywordList = document.getElementById("keywordList");
    const clearKeywordsBtn = document.getElementById("clearKeywords");

    function loadKeywords() {
        chrome.storage.local.get("blockedKeywords", function (data) {
            const keywords = data.blockedKeywords || [];
            keywordList.innerHTML = "";
            keywords.forEach((kw) => {
                const li = document.createElement("li");
                li.textContent = kw;
                keywordList.appendChild(li);
            });
        });
    }

    addKeywordBtn.addEventListener("click", function () {
        const newKeyword = keywordInput.value.trim();
        if (newKeyword) {
            chrome.storage.local.get("blockedKeywords", function (data) {
                let keywords = data.blockedKeywords || [];
                if (!keywords.includes(newKeyword)) {
                    keywords.push(newKeyword);
                    chrome.storage.local.set({ blockedKeywords: keywords }, loadKeywords);
                }
            });
        }
        keywordInput.value = "";
    });

    clearKeywordsBtn.addEventListener("click", function () {
        chrome.storage.local.set({ blockedKeywords: [] }, loadKeywords);
    });

    loadKeywords();
});