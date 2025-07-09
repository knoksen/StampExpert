document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const stampUpload = document.getElementById('stampUpload');
    const previewImage = document.getElementById('previewImage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsContainer = document.getElementById('resultsContainer');
    const emptyCollection = document.getElementById('emptyCollection');
    const stampCollection = document.getElementById('stampCollection');
    const saveBtn = document.getElementById('saveBtn');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    const filterCountry = document.getElementById('filterCountry');
    const filterRarity = document.getElementById('filterRarity');
    
    // Sample database of stamps (in a real app, this would be from an API)
    const stampDatabase = {
        "usa-1": {
            id: "usa-1",
            country: "USA",
            year: "1918",
            denomination: "24¢",
            catalogNumber: "Scott #518",
            rarity: "rare",
            condition: "Very Fine",
            value: "$1,200 - $1,800",
            description: "The famous 'Inverted Jenny' stamp, featuring an upside-down image of a Curtiss JN-4 airplane. Only 100 of these error stamps are known to exist.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/US_Inverted_Jenny_24c_1918_issue.jpg/320px-US_Inverted_Jenny_24c_1918_issue.jpg"
        },
        "uk-1": {
            id: "uk-1",
            country: "UK",
            year: "1840",
            denomination: "1d",
            catalogNumber: "SG #1",
            rarity: "uncommon",
            condition: "Fine",
            value: "$500 - $800",
            description: "The Penny Black, the world's first adhesive postage stamp used in a public postal system.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Penny_black.jpg/320px-Penny_black.jpg"
        },
        "france-1": {
            id: "france-1",
            country: "France",
            year: "1849",
            denomination: "1F",
            catalogNumber: "Y&T #1",
            rarity: "common",
            condition: "Good",
            value: "$50 - $100",
            description: "First stamp of France, featuring the profile of Ceres, the Roman goddess of agriculture.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Ceres_1F_1849.jpg/320px-Ceres_1F_1849.jpg"
        },
        "germany-1": {
            id: "germany-1",
            country: "Germany",
            year: "1872",
            denomination: "3gr",
            catalogNumber: "Michel #1",
            rarity: "ultra-rare",
            condition: "Extra Fine",
            value: "$3,000 - $5,000",
            description: "Early German Empire stamp featuring the Reichsadler (Imperial Eagle). Rare in unused condition.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Deutsches_Reich_1872_3_Groschen.jpg/320px-Deutsches_Reich_1872_3_Groschen.jpg"
        },
        "japan-1": {
            id: "japan-1",
            country: "Japan",
            year: "1871",
            denomination: "500m",
            catalogNumber: "Sakura #1",
            rarity: "legendary",
            condition: "Superb",
            value: "$10,000+",
            description: "The first postage stamp of Japan, featuring a dragon design. Extremely rare in mint condition.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Japan_1871_500_mon_dragon_stamp.jpg/320px-Japan_1871_500_mon_dragon_stamp.jpg"
        }
    };
    
    // User's collection
    let userCollection = [];
    
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
    }
    
    function unhighlight() {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // File input change
    stampUpload.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });
    
    function handleFiles(files) {
        const file = files[0];
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                uploadArea.classList.add('hidden');
                previewArea.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        previewImage.src = '';
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Analyze button
    analyzeBtn.addEventListener('click', function() {
        previewArea.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');
        
        // Simulate API call with timeout
        setTimeout(function() {
            loadingIndicator.classList.add('hidden');
            showRandomStampResult();
        }, 2000);
    });
    
    // Show a random stamp result (simulating recognition)
    function showRandomStampResult() {
        const stampKeys = Object.keys(stampDatabase);
        const randomKey = stampKeys[Math.floor(Math.random() * stampKeys.length)];
        const stamp = stampDatabase[randomKey];
        
        document.getElementById('country').textContent = stamp.country;
        document.getElementById('year').textContent = stamp.year;
        document.getElementById('denomination').textContent = stamp.denomination;
        document.getElementById('catalogNumber').textContent = stamp.catalogNumber;
        
        const rarityElement = document.getElementById('rarity');
        rarityElement.textContent = stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1);
        rarityElement.className = 'px-2 py-1 rounded-full text-xs font-medium ' + getRarityClass(stamp.rarity);
        
        document.getElementById('condition').textContent = stamp.condition;
        document.getElementById('value').textContent = stamp.value;
        document.getElementById('description').textContent = stamp.description;
        
        resultsContainer.classList.remove('hidden');
    }
    
    function getRarityClass(rarity) {
        const classes = {
            'common': 'bg-green-100 text-green-800',
            'uncommon': 'bg-blue-100 text-blue-800',
            'rare': 'bg-purple-100 text-purple-800',
            'ultra-rare': 'bg-pink-100 text-pink-800',
            'legendary': 'bg-yellow-100 text-yellow-800'
        };
        return classes[rarity] || 'bg-gray-100 text-gray-800';
    }
    
    // Save to collection
    saveBtn.addEventListener('click', function() {
        const stampKeys = Object.keys(stampDatabase);
        const randomKey = stampKeys[Math.floor(Math.random() * stampKeys.length)];
        const stamp = JSON.parse(JSON.stringify(stampDatabase[randomKey])); // Deep copy
        
        // Add unique ID and timestamp
        stamp.userId = 'user-' + Date.now();
        stamp.addedDate = new Date().toISOString();
        
        userCollection.push(stamp);
        updateCollectionDisplay();
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        
        // Show success message
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
        alert.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            <span>Stamp added to your collection!</span>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    });
    
    // New analysis button
    newAnalysisBtn.addEventListener('click', function() {
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Update collection display
    function updateCollectionDisplay() {
        if (userCollection.length === 0) {
            emptyCollection.classList.remove('hidden');
            stampCollection.classList.add('hidden');
            return;
        }
        
        emptyCollection.classList.add('hidden');
        stampCollection.classList.remove('hidden');
        
        // Filter collection
        const countryFilter = filterCountry.value.toLowerCase();
        const rarityFilter = filterRarity.value.toLowerCase();
        
        const filteredCollection = userCollection.filter(stamp => {
            return (countryFilter === '' || stamp.country.toLowerCase().includes(countryFilter)) &&
                   (rarityFilter === '' || stamp.rarity === rarityFilter);
        });
        
        // Clear current display
        stampCollection.innerHTML = '';
        
        // Add filtered stamps
        filteredCollection.forEach(stamp => {
            const stampCard = document.createElement('div');
            stampCard.className = `stamp-card bg-white rounded-lg shadow overflow-hidden ${getRarityBorderClass(stamp.rarity)}`;
            stampCard.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-semibold text-lg">${stamp.country} ${stamp.denomination}</h3>
                            <p class="text-sm text-gray-500">${stamp.year} • ${stamp.catalogNumber}</p>
                        </div>
                        <span class="${getRarityClass(stamp.rarity)} px-2 py-1 rounded-full text-xs font-medium">
                            ${stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1)}
                        </span>
                    </div>
                    <img src="${stamp.image}" alt="${stamp.country} stamp" class="w-full h-32 object-contain mb-3">
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-medium">${stamp.value}</span>
                        <span class="text-gray-500">${stamp.condition}</span>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-2 flex justify-between items-center border-t">
                    <span class="text-xs text-gray-500">Added: ${new Date(stamp.addedDate).toLocaleDateString()}</span>
                    <button class="text-red-500 hover:text-red-700 text-sm" onclick="removeStamp('${stamp.userId}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            stampCollection.appendChild(stampCard);
        });
    }
    
    function getRarityBorderClass(rarity) {
        return `rarity-${rarity.split(' ').join('-')}`;
    }
    
    // Filter change handlers
    filterCountry.addEventListener('change', updateCollectionDisplay);
    filterRarity.addEventListener('change', updateCollectionDisplay);
    
    // Global function to remove stamp
    window.removeStamp = function(userId) {
        userCollection = userCollection.filter(stamp => stamp.userId !== userId);
        updateCollectionDisplay();
    };
    
    // Initialize
    updateCollectionDisplay();
});
