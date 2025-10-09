document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const totalTokens = 5; // This should match the number of generated tokens

    for (let i = 0; i < totalTokens; i++) {
        const nftElement = document.createElement('div');
        nftElement.classList.add('nft');

        const image = document.createElement('img');
        image.src = `./images/${i}.png`;
        image.alt = `Amazonia Crypto Animal #${i}`;

        const name = document.createElement('h3');
        name.textContent = `Amazonia Crypto Animal #${i}`;

        nftElement.appendChild(image);
        nftElement.appendChild(name);
        gallery.appendChild(nftElement);
    }
});