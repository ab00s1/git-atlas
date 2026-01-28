const $ = (s) => document.querySelector(s);

const viz = $("#viz"),
	tooltip = $("#tooltip");
const statusEl = $("#status"),
	msgEl = $("#message"),
	pathEl = $("#path");
const btn = $("#go"),
	backBtn = $("#back"),
	rootBtn = $("#root"),
	exportBtn = $("#export"),
	localBtn = $("#local");

let FULL_ROOT = null,
	CURRENT = null;

function setStatus(t) {
	statusEl.textContent = t;
}
function setMessage(t, e = false) {
	msgEl.innerHTML = t ? (e ? `<div class="err">${t}</div>` : t) : "";
}
function rerender() {
	render(
		viz,
		CURRENT,
		FULL_ROOT,
		pathEl,
		backBtn,
		rootBtn,
		tooltip,
		navigateDir,
		pathOf,
		extColor,
		(n) => {
			CURRENT = n;
		},
	);
}

async function load() {
	const parsed = parseGitHubUrl($("#repoUrl").value);
	if (!parsed) return setMessage("Invalid GitHub URL", true);
	btn.disabled = true;
	setStatus("Loading…");
	try {
		const repo = await gh(
			`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
		);
		const branch = repo.default_branch;
		const info = await gh(
			`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/branches/${branch}`,
		);
		const sha = info.commit.commit.tree.sha;
		const tree = await gh(
			`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/git/trees/${sha}?recursive=1`,
		);

		FULL_ROOT = d3.hierarchy(treeListToHierarchy(tree.tree));
		CURRENT = FULL_ROOT;

		rerender();
		setStatus("Loaded");
	} catch (e) {
		setMessage(e.message, true);
		setStatus("Error");
	} finally {
		btn.disabled = false;
	}
}

window.addEventListener("load", load);

btn.onclick = load;
backBtn.onclick = () => {
	if (CURRENT.parent) {
		CURRENT = CURRENT.parent;
		rerender();
	}
};
rootBtn.onclick = () => {
	CURRENT = FULL_ROOT;
	rerender();
};
exportBtn.onclick = exportSVG;
localBtn.onclick = loadLocal;

