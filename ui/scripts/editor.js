let currentNode = null;

function initEditor() {
	const pathEl = document.getElementById("editor-path");
	if (!pathEl) return;

	pathEl.textContent = "testitest";
}

window.loadReadmeFromFolder = async function (folderPath, setText) {
	const ctx = window.GITATLAS_CTX;
	if (!ctx?.owner || !ctx?.repo || !ctx?.branch) {
		setText("", "No GitHub context");
		return false;
	}

	const { owner, repo, branch } = ctx;
	const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
	const prefix = folderPath ? folderPath.replace(/\/+$/, "") + "/" : "";

	name = "README.md";
	const url = base + prefix + name;
	const res = await fetch(url, { cache: "no-store" });
	if (res.ok) {
		const text = await res.text();
		setText(text, `${prefix}${name}`);
		return true;
	}
	setText("", "(no README in this folder)");
	return false;
};

