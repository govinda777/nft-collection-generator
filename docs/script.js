document.addEventListener('DOMContentLoaded', () => {
    // Copy button functionality
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(codeBlock => {
        const button = document.createElement('button');
        button.innerText = 'Copy';
        button.classList.add('copy-button');
        codeBlock.appendChild(button);

        button.addEventListener('click', () => {
            const code = codeBlock.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = 'Copied!';
                setTimeout(() => {
                    button.innerText = 'Copy';
                }, 2000);
            });
        });
    });

    // Image gallery population
    const gallery = document.querySelector('.image-gallery');
    if (gallery) {
        for (let i = 0; i < 12; i++) {
            const img = document.createElement('img');
            img.src = `images/${i}.png`;
            img.alt = `NFT Example ${i}`;
            gallery.appendChild(img);
        }
    }
});