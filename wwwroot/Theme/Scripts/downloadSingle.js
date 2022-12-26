document.addEventListener("DOMContentLoaded", () => {

	const downloadBtn = document.querySelector(".btn-download_single");

	downloadBtn.addEventListener("click", () => {
		const fileInput = downloadBtn.parentElement.children[1];
		const atag = downloadBtn.parentElement.children[0];

			fetchFile(fileInput.value);

			function fetchFile(url) {
				fetch(url).then(res => res.blob()).then(file => {
					let tempUrl = URL.createObjectURL(file);

					atag.href = tempUrl;
					atag.click();
					atag.remove();
				});
			}
		})
});
