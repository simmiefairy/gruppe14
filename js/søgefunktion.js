// Simpel søgefunktion til at filtrere produkter i carousel
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.querySelector('.search-container input[type="text"]');
	if (!searchInput) return;

	searchInput.addEventListener('input', function() {
		const query = searchInput.value.toLowerCase();
		const slides = document.querySelectorAll('.mySlides');
		let found = false;

		slides.forEach(slide => {
			let matchInSlide = false;
			const products = slide.querySelectorAll('.billede-container');
			products.forEach(product => {
				const name = product.querySelector('[data-product-name]')?.getAttribute('data-product-name')?.toLowerCase() || '';
				if (name.includes(query) || query === '') {
					product.style.display = '';
					matchInSlide = true;
				} else {
					product.style.display = 'none';
				}
			});
			// Skjul hele slide hvis ingen produkter matcher
			slide.style.display = matchInSlide ? '' : 'none';
			if (matchInSlide) found = true;
		});
		// Hvis intet matcher, kan du evt. vise en besked
		// eller håndtere det på anden vis
	});
});
