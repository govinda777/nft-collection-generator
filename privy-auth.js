// Privy Authentication and NFT Management
// Privy App ID configured
const PRIVY_APP_ID = 'cmgk12sx5004zl30c1xva0n6t';

// Mock NFT data - In production, this would come from blockchain/API
const mockNFTData = [
    {
        id: 0,
        name: 'Amazonia Crypto Animal #0',
        image: './images/0.png',
        traits: [
            { type: 'Animal', value: 'Capybara' },
            { type: 'Background', value: 'Forest' },
            { type: 'Headwear', value: 'Flower Crown' }
        ]
    },
    {
        id: 1,
        name: 'Amazonia Crypto Animal #1',
        image: './images/1.png',
        traits: [
            { type: 'Animal', value: 'Jaguar' },
            { type: 'Background', value: 'Forest' },
            { type: 'Headwear', value: 'Leaf Hat' }
        ]
    },
    {
        id: 2,
        name: 'Amazonia Crypto Animal #2',
        image: './images/2.png',
        traits: [
            { type: 'Animal', value: 'Capybara' },
            { type: 'Background', value: 'Forest' }
        ]
    }
];

class PrivyAuth {
    constructor() {
        this.privy = null;
        this.user = null;
        this.isPrivyReady = false;
        this.init();
    }

    async init() {
        try {
            // Check if Privy SDK is loaded
            if (typeof window.Privy !== 'undefined') {
                console.log('Initializing Privy with App ID:', PRIVY_APP_ID);
                
                // Initialize Privy SDK
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
                this.setupEventListeners();
                this.checkAuthStatus();
            } else {
                console.warn('Privy SDK not loaded, using mock authentication');
                this.useMockAuth();
            }
        } catch (error) {
            console.error('Error initializing Privy:', error);
            this.useMockAuth();
        }
    }

    useMockAuth() {
        console.log('Using mock authentication for development');
        this.isPrivyReady = false;
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.login());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    checkAuthStatus() {
        if (this.isPrivyReady && this.privy) {
            // Check if user is authenticated via Privy
            const authenticated = this.privy.authenticated;
            if (authenticated) {
                this.user = this.privy.user;
                this.showMembersArea();
            }
        } else {
            // Fallback: Check localStorage for mock auth
            const savedUser = localStorage.getItem('privy_user');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
                this.showMembersArea();
            }
        }
    }

    async login() {
        try {
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.textContent = 'Connecting...';
            loginBtn.disabled = true;

            if (this.isPrivyReady && this.privy) {
                // Use real Privy authentication
                console.log('Authenticating with Privy...');
                await this.privy.login();
                
                // Get authenticated user
                this.user = this.privy.user;
                
                if (this.user && this.user.wallet) {
                    console.log('User authenticated successfully:', this.user);
                    this.showMembersArea();
                } else {
                    throw new Error('Authentication failed');
                }
            } else {
                // Fallback to mock authentication
                console.log('Using mock authentication...');
                await new Promise(resolve => setTimeout(resolve, 1500));

                this.user = {
                    wallet: {
                        address: this.generateMockAddress(),
                        chainId: 1
                    },
                    authenticated: true,
                    createdAt: new Date().toISOString()
                };

                localStorage.setItem('privy_user', JSON.stringify(this.user));
                this.showMembersArea();
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
        // Logout from Privy if using real auth
        if (this.isPrivyReady && this.privy) {
            this.privy.logout();
        }
        
        // Clear user data
        this.user = null;
        localStorage.removeItem('privy_user');
        
        // Show login section
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('membersArea').classList.add('hidden');
    }

    showMembersArea() {
        // Hide login, show members area
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('membersArea').classList.remove('hidden');

        // Display user info
        this.displayUserInfo();
        
        // Load and display NFTs
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

        try {
            // In production, fetch NFTs from blockchain or API
            // For now, use mock data
            await new Promise(resolve => setTimeout(resolve, 1000));

            const userNFTs = this.getUserNFTs();
            
            // Update NFT count
            nftCountEl.textContent = userNFTs.length;

            // Clear loading message
            nftGrid.innerHTML = '';

            if (userNFTs.length === 0) {
                nftGrid.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px;">You don\'t own any NFTs yet. Visit the main gallery to learn how to get one!</p>';
                return;
            }

            // Display NFTs
            userNFTs.forEach(nft => {
                const nftCard = this.createNFTCard(nft);
                nftGrid.appendChild(nftCard);
            });

        } catch (error) {
            console.error('Error loading NFTs:', error);
            nftGrid.innerHTML = '<p style="text-align: center; color: #e74c3c; padding: 40px;">Error loading NFTs. Please try again.</p>';
        }
    }

    getUserNFTs() {
        // In production, this would query the blockchain for NFTs owned by the user's wallet
        // For demo, return mock NFTs
        return mockNFTData;
    }

    createNFTCard(nft) {
        const card = document.createElement('div');
        card.className = 'nft-card';

        const img = document.createElement('img');
        img.src = nft.image;
        img.alt = nft.name;
        img.onerror = () => {
            // Fallback if image doesn't exist
            img.src = 'black.png';
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

    generateMockAddress() {
        // Generate a mock Ethereum address for demo
        const chars = '0123456789abcdef';
        let address = '0x';
        for (let i = 0; i < 40; i++) {
            address += chars[Math.floor(Math.random() * chars.length)];
        }
        return address;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const auth = new PrivyAuth();
    
    // Make it globally accessible for debugging
    window.privyAuth = auth;
});
