// Privy Authentication and NFT Management
const PRIVY_APP_ID = 'cmgjrqlx901b4jo0cirg5zwf3';

class PrivyAuth {
    constructor() {
        this.privy = null;
        this.user = null;
        this.isPrivyReady = false;
        this.init();
    }

    async init() {
        if (typeof window.Privy === 'undefined') {
            console.error('Privy SDK not loaded.');
            return;
        }

        try {
            console.log('Initializing Privy with App ID:', PRIVY_APP_ID);

            this.privy = new window.Privy({
                appId: PRIVY_APP_ID,
                onSuccess: (user) => {
                    console.log('User authenticated:', user);
                    this.user = user;
                    this.showMembersArea();
                },
                onError: (error) => {
                    console.error('Privy authentication error:', error);
                }
            });

            this.isPrivyReady = true;
            this.checkAuthStatus();
        } catch (error) {
            console.error('Error initializing Privy:', error);
        }
    }

    checkAuthStatus() {
        if (this.isPrivyReady && this.privy && this.privy.authenticated) {
            this.user = this.privy.user;
            this.showMembersArea();
        }
    }

    async login() {
        if (!this.isPrivyReady || !this.privy) {
            console.error('Privy is not initialized.');
            alert('Authentication service is not available. Please refresh the page.');
            return;
        }

        try {
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.textContent = 'Connecting...';
            loginBtn.disabled = true;

            await this.privy.login();

            this.user = this.privy.user;

            if (this.user && this.user.wallet) {
                console.log('User authenticated successfully:', this.user);
                this.showMembersArea();
            } else {
                throw new Error('Authentication failed');
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to connect wallet. Please try again.');
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.textContent = '🔐 Connect Wallet';
            loginBtn.disabled = false;
        }
    }

    logout() {
        if (this.isPrivyReady && this.privy) {
            this.privy.logout();
        }
        
        this.user = null;
        
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('membersArea').classList.add('hidden');
    }

    showMembersArea() {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('membersArea').classList.remove('hidden');

        this.displayUserInfo();
        this.loadUserNFTs();
    }

    displayUserInfo() {
        const walletAddressEl = document.getElementById('walletAddress');
        if (this.user && this.user.wallet) {
            const address = this.user.wallet.address;
            const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            walletAddressEl.textContent = `${shortAddress} (${address})`;
        }
    }

    async loadUserNFTs() {
        const nftGrid = document.getElementById('nftGrid');
        const nftCountEl = document.getElementById('nftCount');

        // This should be replaced with actual NFT fetching logic from a blockchain or API
        const userNFTs = []; // No mock data

        nftCountEl.textContent = userNFTs.length;
        nftGrid.innerHTML = '';

        if (userNFTs.length === 0) {
            nftGrid.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px;">You don\'t own any NFTs yet. Visit the main gallery to learn how to get one!</p>';
        } else {
            userNFTs.forEach(nft => {
                const nftCard = this.createNFTCard(nft);
                nftGrid.appendChild(nftCard);
            });
        }
    }

    createNFTCard(nft) {
        const card = document.createElement('div');
        card.className = 'nft-card';

        const img = document.createElement('img');
        img.src = nft.image;
        img.alt = nft.name;
        img.onerror = () => {
            img.src = 'black.png'; // Fallback image
        };

        const info = document.createElement('div');
        info.className = 'nft-info';

        const title = document.createElement('h3');
        title.textContent = nft.name;

        const traitsContainer = document.createElement('div');
        traitsContainer.className = 'nft-traits';

        if (nft.traits && nft.traits.length > 0) {
            nft.traits.forEach(trait => {
                const badge = document.createElement('span');
                badge.className = 'trait-badge';
                badge.textContent = `${trait.type}: ${trait.value}`;
                traitsContainer.appendChild(badge);
            });
        }

        info.appendChild(title);
        info.appendChild(traitsContainer);
        card.appendChild(img);
        card.appendChild(info);

        return card;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const auth = new PrivyAuth();
    
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => auth.login());
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => auth.logout());
    }

    // Make it globally accessible for debugging
    window.privyAuth = auth;
});
