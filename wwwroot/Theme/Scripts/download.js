const downloadBtn = document.querySelectorAll(".btn-download")

document.addEventListener("DOMContentLoaded", () => {

	downloadBtn.forEach(btn => {
		btn.addEventListener("click", () => {
			const fileInput = btn.parentElement.children[1];
			const atag = btn.parentElement.children[0];

			fetchFile(fileInput.value);
			window.location.reload();

			function fetchFile(url) {
				fetch(url).then(res => res.blob()).then(file => {
					let tempUrl = URL.createObjectURL(file);

					atag.href = tempUrl;
					atag.click();
					atag.remove();
				});
			}
		})
	})
});