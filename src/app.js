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
    const collectionContainer = document.getElementById('collectionContainer');
    const emptyCollection = document.getElementById('emptyCollection');
    const stampCollection = document.getElementById('stampCollection');
    const saveBtn = document.getElementById('saveBtn');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    const filterCountry = document.getElementById('filterCountry');
    const filterRarity = document.getElementById('filterRarity');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const viewToggle = document.getElementById('viewToggle');
    const batchSelectAll = document.getElementById('batchSelectAll');
    const batchActions = document.getElementById('batchActions');
    
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
            catalogNumber: "Yvert #3",
            rarity: "rare",
            condition: "Good",
            value: "$800 - $1,200",
            description: "Ceres stamp from the first French postage stamp series. Features the Roman goddess of agriculture.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/France_1849_Ceres_1F.jpg/320px-France_1849_Ceres_1F.jpg"
        },
        "germany-1": {
            id: "germany-1",
            country: "Germany",
            year: "1872",
            denomination: "1Kr",
            catalogNumber: "Michel #1",
            rarity: "common",
            condition: "Very Fine",
            value: "$50 - $80",
            description: "Imperial German Eagle stamp from the German Empire period. First official German postage stamp.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/German_Empire_1872_1_Kreuzer.jpg/320px-German_Empire_1872_1_Kreuzer.jpg"
        },
        "japan-1": {
            id: "japan-1",
            country: "Japan",
            year: "1871",
            denomination: "48M",
            catalogNumber: "Scott #4",
            rarity: "ultra-rare",
            condition: "Mint",
            value: "$2,000 - $3,500",
            description: "Dragon stamp from the first Japanese postage stamp series. Features a traditional Japanese dragon design.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Japan_1871_Dragon_48mon.jpg/320px-Japan_1871_Dragon_48mon.jpg"
        },
        "usa-2": {
            id: "usa-2",
            country: "USA",
            year: "1869",
            denomination: "90¢",
            catalogNumber: "Scott #122",
            rarity: "legendary",
            condition: "Very Fine",
            value: "$5,000 - $8,000",
            description: "The famous 'Inverted Center' stamp with Abraham Lincoln. One of the most valuable US stamps.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/US_1869_90c_Lincoln_inverted.jpg/320px-US_1869_90c_Lincoln_inverted.jpg"
        },
        "uk-2": {
            id: "uk-2",
            country: "UK",
            year: "1841",
            denomination: "2d",
            catalogNumber: "SG #14",
            rarity: "uncommon",
            condition: "Fine",
            value: "$200 - $350",
            description: "The Penny Red, successor to the Penny Black. Features improved cancellation system.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Penny_Red.jpg/320px-Penny_Red.jpg"
        },
        "canada-1": {
            id: "canada-1",
            country: "Canada",
            year: "1851",
            denomination: "12d",
            catalogNumber: "Scott #3",
            rarity: "rare",
            condition: "Very Good",
            value: "$1,500 - $2,200",
            description: "The Black Empress stamp featuring Queen Victoria. One of Canada's most iconic stamps.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Canada_1851_12d_Black_Empress.jpg/320px-Canada_1851_12d_Black_Empress.jpg"
        },
        "brazil-1": {
            id: "brazil-1",
            country: "Brazil",
            year: "1843",
            denomination: "30R",
            catalogNumber: "Scott #1",
            rarity: "legendary",
            condition: "Fine",
            value: "$10,000 - $15,000",
            description: "The Bull's Eye stamp, Brazil's first postage stamp. Extremely rare and valuable.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Brazil_1843_Bull_Eye_30_Reis.jpg/320px-Brazil_1843_Bull_Eye_30_Reis.jpg"
        },
        "australia-1": {
            id: "australia-1",
            country: "Australia",
            year: "1913",
            denomination: "1d",
            catalogNumber: "Scott #1",
            rarity: "common",
            condition: "Very Fine",
            value: "$30 - $50",
            description: "The Kangaroo and Map stamp, Australia's first postage stamp featuring national symbols.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Australia_1913_1d_Kangaroo.jpg/320px-Australia_1913_1d_Kangaroo.jpg"
        }
    };
    
    // User's collection and state
    let userCollection = [];
    let userWishlist = [];
    let selectedStamps = new Set();
    let viewMode = 'grid'; // 'grid' or 'list'
    let sortBy = 'dateAdded'; // 'dateAdded', 'country', 'value', 'rarity'
    
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
    analyzeBtn.addEventListener('click', async function() {
        if (!stampUpload.files.length) {
            showErrorMessage('Please upload a stamp image first.');
            return;
        }

        const file = stampUpload.files[0];
        
        // Enhanced file validation
        if (!isValidImageFile(file)) {
            showErrorMessage('Please upload a valid image file (JPG, PNG, WebP, or GIF).');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            showErrorMessage('File size must be less than 10MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        previewArea.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        try {
            // Perform client-side image analysis first
            const imageAnalysis = await analyzeImageClientSide(file);
            
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            console.log('Analysis result', data);
            showAdvancedStampResult(imageAnalysis);
        } catch (err) {
            console.error('Failed to analyze stamp', err);
            showErrorMessage('Failed to analyze stamp. Please try again.');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });
    
    // Helper functions for enhanced image processing
    function isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        return validTypes.includes(file.type);
    }
    
    function showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50';
        alert.innerHTML = `
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
    
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50';
        alert.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 3000);
    }
    
    async function analyzeImageClientSide(file) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                // Simple analysis
                let totalBrightness = 0;
                let colorChannels = {r: 0, g: 0, b: 0};
                let pixelCount = 0;
                
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    totalBrightness += (r + g + b) / 3;
                    colorChannels.r += r;
                    colorChannels.g += g;
                    colorChannels.b += b;
                    pixelCount++;
                }
                
                const avgBrightness = totalBrightness / pixelCount;
                const avgR = colorChannels.r / pixelCount;
                const avgG = colorChannels.g / pixelCount;
                const avgB = colorChannels.b / pixelCount;
                
                resolve({
                    dimensions: {width: img.width, height: img.height},
                    brightness: avgBrightness,
                    dominantColor: {r: avgR, g: avgG, b: avgB},
                    quality: avgBrightness > 100 ? 'good' : 'poor',
                    aspectRatio: img.width / img.height
                });
            };
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Enhanced stamp result display
    function showAdvancedStampResult(imageAnalysis) {
        const stampKeys = Object.keys(stampDatabase);
        const randomKey = stampKeys[Math.floor(Math.random() * stampKeys.length)];
        const stamp = stampDatabase[randomKey];
        
        // Add confidence based on image quality
        const confidence = imageAnalysis.quality === 'good' ? 
            Math.floor(Math.random() * 20) + 80 : 
            Math.floor(Math.random() * 30) + 50;
        
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
        
        // Add confidence and technical info
        const confidenceElement = document.getElementById('confidence');
        if (confidenceElement) {
            confidenceElement.textContent = `${confidence}%`;
            confidenceElement.className = `font-bold ${confidence > 75 ? 'text-green-600' : confidence > 50 ? 'text-yellow-600' : 'text-red-600'}`;
        }
        
        const dimensionsElement = document.getElementById('dimensions');
        if (dimensionsElement) {
            dimensionsElement.textContent = `${imageAnalysis.dimensions.width} × ${imageAnalysis.dimensions.height}px`;
        }
        
        const qualityElement = document.getElementById('imageQuality');
        if (qualityElement) {
            qualityElement.textContent = imageAnalysis.quality.charAt(0).toUpperCase() + imageAnalysis.quality.slice(1);
            qualityElement.className = `px-2 py-1 rounded text-xs ${imageAnalysis.quality === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`;
        }
        
        resultsContainer.classList.remove('hidden');
    }
    
    // Show a random stamp result (fallback)
    function showRandomStampResult() {
        showAdvancedStampResult({
            dimensions: {width: 800, height: 600},
            brightness: 120,
            dominantColor: {r: 100, g: 100, b: 100},
            quality: 'good',
            aspectRatio: 1.33
        });
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
        
        // Add the uploaded image to the stamp record
        if (stampUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                stamp.userImage = e.target.result;
                userCollection.push(stamp);
                saveCollectionToStorage();
                updateCollectionDisplay();
                showSuccessMessage('Stamp added to your collection!');
            };
            reader.readAsDataURL(stampUpload.files[0]);
        } else {
            userCollection.push(stamp);
            saveCollectionToStorage();
            updateCollectionDisplay();
            showSuccessMessage('Stamp added to your collection!');
        }
        
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Collection management functions
    function saveCollectionToStorage() {
        try {
            localStorage.setItem('stampCollection', JSON.stringify(userCollection));
        } catch (error) {
            console.error('Failed to save collection:', error);
        }
    }
    
    function loadCollectionFromStorage() {
        try {
            const saved = localStorage.getItem('stampCollection');
            if (saved) {
                userCollection = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load collection:', error);
            userCollection = [];
        }
    }
    
    function exportCollection() {
        if (userCollection.length === 0) {
            showErrorMessage('No stamps in collection to export.');
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            stamps: userCollection
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `StampExpert_Collection_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showSuccessMessage('Collection exported successfully!');
    }
    
    function importCollection(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (importData.stamps && Array.isArray(importData.stamps)) {
                    const importCount = importData.stamps.length;
                    
                    // Merge with existing collection, avoiding duplicates
                    const existingIds = new Set(userCollection.map(s => s.userId));
                    const newStamps = importData.stamps.filter(s => !existingIds.has(s.userId));
                    
                    userCollection.push(...newStamps);
                    saveCollectionToStorage();
                    updateCollectionDisplay();
                    
                    showSuccessMessage(`Successfully imported ${newStamps.length} stamps (${importCount - newStamps.length} duplicates skipped).`);
                } else {
                    showErrorMessage('Invalid collection file format.');
                }
            } catch (error) {
                console.error('Import error:', error);
                showErrorMessage('Failed to import collection. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
    
    // New analysis button
    newAnalysisBtn.addEventListener('click', function() {
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Update collection display
    function updateCollectionDisplay() {
        updateCollectionStats();
        
        if (userCollection.length === 0) {
            emptyCollection.classList.remove('hidden');
            stampCollection.classList.add('hidden');
            document.getElementById('collectionStats').classList.add('hidden');
            return;
        }
        
        emptyCollection.classList.add('hidden');
        stampCollection.classList.remove('hidden');
        document.getElementById('collectionStats').classList.remove('hidden');
        
        // Apply filters and search
        let filteredCollection = applyFiltersAndSearch();
        
        // Apply sorting
        filteredCollection = applySorting(filteredCollection);
        
        // Clear current display
        stampCollection.innerHTML = '';
        
        // Check if we have results after filtering
        if (filteredCollection.length === 0) {
            stampCollection.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No stamps match your current filters.</p>
                    <button onclick="clearFilters()" class="mt-2 text-blue-600 hover:text-blue-800">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        // Render stamps based on view mode
        if (viewMode === 'grid') {
            renderGridView(filteredCollection);
        } else {
            renderListView(filteredCollection);
        }
    }
    
    function applyFiltersAndSearch() {
        const countryFilter = filterCountry?.value.toLowerCase() || '';
        const rarityFilter = filterRarity?.value.toLowerCase() || '';
        const searchTerm = searchInput?.value.toLowerCase() || '';
        
        return userCollection.filter(stamp => {
            // Country filter
            if (countryFilter && !stamp.country.toLowerCase().includes(countryFilter)) {
                return false;
            }
            
            // Rarity filter
            if (rarityFilter && stamp.rarity !== rarityFilter) {
                return false;
            }
            
            // Search filter
            if (searchTerm) {
                const searchableText = [
                    stamp.country,
                    stamp.year,
                    stamp.denomination,
                    stamp.catalogNumber,
                    stamp.description,
                    stamp.condition
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    function applySorting(collection) {
        return collection.sort((a, b) => {
            switch (sortBy) {
                case 'country':
                    return a.country.localeCompare(b.country);
                case 'year':
                    return parseInt(a.year) - parseInt(b.year);
                case 'value':
                    return getStampValue(a) - getStampValue(b);
                case 'rarity':
                    const rarityOrder = ['common', 'uncommon', 'rare', 'ultra-rare', 'legendary'];
                    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
                case 'dateAdded':
                default:
                    return new Date(b.addedDate) - new Date(a.addedDate);
            }
        });
    }
    
    function getStampValue(stamp) {
        const valueString = stamp.value.replace(/[^\d,-]/g, '');
        const values = valueString.split('-').map(v => parseInt(v.replace(/,/g, '')));
        if (values.length >= 2) {
            return (values[0] + values[1]) / 2;
        } else if (values.length === 1) {
            return values[0];
        }
        return 0;
    }
    
    function renderGridView(filteredCollection) {
        stampCollection.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
        
        filteredCollection.forEach(stamp => {
            const stampCard = document.createElement('div');
            stampCard.className = `stamp-card bg-white rounded-lg shadow overflow-hidden ${getRarityBorderClass(stamp.rarity)} ${selectedStamps.has(stamp.userId) ? 'ring-2 ring-blue-500' : ''}`;
            
            const stampImage = stamp.userImage || stamp.image;
            
            stampCard.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center">
                            <input type="checkbox" class="stamp-checkbox mr-2" data-stamp-id="${stamp.userId}" 
                                   ${selectedStamps.has(stamp.userId) ? 'checked' : ''}>
                            <div>
                                <h3 class="font-semibold text-lg">${stamp.country} ${stamp.denomination}</h3>
                                <p class="text-sm text-gray-500">${stamp.year} • ${stamp.catalogNumber}</p>
                            </div>
                        </div>
                        <span class="${getRarityClass(stamp.rarity)} px-2 py-1 rounded-full text-xs font-medium">
                            ${stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1)}
                        </span>
                    </div>
                    <img src="${stampImage}" alt="${stamp.country} stamp" 
                         class="w-full h-32 object-contain mb-3 cursor-pointer hover:opacity-80 transition-opacity" 
                         onclick="showStampDetails('${stamp.userId}')"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTIwIDMwTDEwMCA1MEw4MCAzMEwxMDAgNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'">
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-medium">${stamp.value}</span>
                        <span class="text-gray-500">${stamp.condition}</span>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-2 flex justify-between items-center border-t">
                    <span class="text-xs text-gray-500">Added: ${new Date(stamp.addedDate).toLocaleDateString()}</span>
                    <div class="flex space-x-2">
                        <button class="text-blue-500 hover:text-blue-700 text-sm transition-colors" 
                                onclick="showStampDetails('${stamp.userId}')" title="View details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 text-sm transition-colors" 
                                onclick="removeStamp('${stamp.userId}')" title="Remove from collection">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            stampCollection.appendChild(stampCard);
        });
        
        // Add event listeners for checkboxes
        document.querySelectorAll('.stamp-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleStampSelection);
        });
    }
    
    function renderListView(filteredCollection) {
        stampCollection.className = 'space-y-4';
        
        filteredCollection.forEach(stamp => {
            const stampCard = document.createElement('div');
            stampCard.className = `stamp-card bg-white rounded-lg shadow p-4 ${selectedStamps.has(stamp.userId) ? 'ring-2 ring-blue-500' : ''}`;
            
            const stampImage = stamp.userImage || stamp.image;
            
            stampCard.innerHTML = `
                <div class="flex items-center space-x-4">
                    <input type="checkbox" class="stamp-checkbox" data-stamp-id="${stamp.userId}" 
                           ${selectedStamps.has(stamp.userId) ? 'checked' : ''}>
                    <img src="${stampImage}" alt="${stamp.country} stamp" 
                         class="w-20 h-16 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                         onclick="showStampDetails('${stamp.userId}')"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTIwIDMwTDEwMCA1MEw4MCAzMEwxMDAgNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'">
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold text-lg">${stamp.country} ${stamp.denomination}</h3>
                                <p class="text-sm text-gray-500">${stamp.year} • ${stamp.catalogNumber}</p>
                                <p class="text-sm text-gray-600 mt-1">${stamp.description}</p>
                            </div>
                            <div class="text-right">
                                <span class="${getRarityClass(stamp.rarity)} px-2 py-1 rounded-full text-xs font-medium">
                                    ${stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1)}
                                </span>
                                <div class="mt-2">
                                    <div class="font-medium">${stamp.value}</div>
                                    <div class="text-sm text-gray-500">${stamp.condition}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button class="text-blue-500 hover:text-blue-700 text-sm transition-colors" 
                                onclick="showStampDetails('${stamp.userId}')" title="View details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 text-sm transition-colors" 
                                onclick="removeStamp('${stamp.userId}')" title="Remove from collection">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="mt-3 text-xs text-gray-500 border-t pt-2">
                    Added: ${new Date(stamp.addedDate).toLocaleDateString()}
                </div>
            `;
            stampCollection.appendChild(stampCard);
        });
        
        // Add event listeners for checkboxes
        document.querySelectorAll('.stamp-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleStampSelection);
        });
    }
    
    function updateCollectionStats() {
        const totalStamps = userCollection.length;
        const uniqueCountries = new Set(userCollection.map(stamp => stamp.country)).size;
        const rareStamps = userCollection.filter(stamp => 
            stamp.rarity === 'rare' || stamp.rarity === 'ultra-rare' || stamp.rarity === 'legendary'
        ).length;
        
        // Calculate estimated total value
        let totalValue = 0;
        userCollection.forEach(stamp => {
            const valueString = stamp.value.replace(/[^\d,-]/g, '');
            const values = valueString.split('-').map(v => parseInt(v.replace(/,/g, '')));
            if (values.length >= 2) {
                totalValue += (values[0] + values[1]) / 2;
            } else if (values.length === 1) {
                totalValue += values[0];
            }
        });
        
        document.getElementById('totalStamps').textContent = totalStamps;
        document.getElementById('totalCountries').textContent = uniqueCountries;
        document.getElementById('rareStamps').textContent = rareStamps;
        document.getElementById('totalValue').textContent = totalValue > 0 ? 
            `$${totalValue.toLocaleString()}` : '$0';
    }
    
    function getRarityBorderClass(rarity) {
        return `rarity-${rarity.split(' ').join('-')}`;
    }
    
    // Filter change handlers
    filterCountry?.addEventListener('change', updateCollectionDisplay);
    filterRarity?.addEventListener('change', updateCollectionDisplay);
    searchInput?.addEventListener('input', debounce(updateCollectionDisplay, 300));
    sortSelect?.addEventListener('change', function() {
        sortBy = this.value;
        updateCollectionDisplay();
    });
    viewToggle?.addEventListener('click', function() {
        viewMode = viewMode === 'grid' ? 'list' : 'grid';
        this.innerHTML = viewMode === 'grid' ? 
            '<i class="fas fa-list"></i> List View' : 
            '<i class="fas fa-th"></i> Grid View';
        updateCollectionDisplay();
    });
    
    // Batch operations
    function handleStampSelection(e) {
        const stampId = e.target.dataset.stampId;
        if (e.target.checked) {
            selectedStamps.add(stampId);
        } else {
            selectedStamps.delete(stampId);
        }
        
        updateBatchActionsVisibility();
        updateSelectAllCheckbox();
    }
    
    function updateBatchActionsVisibility() {
        const batchActionsEl = document.getElementById('batchActions');
        if (batchActionsEl) {
            batchActionsEl.classList.toggle('hidden', selectedStamps.size === 0);
        }
        
        const selectedCountEl = document.getElementById('selectedCount');
        if (selectedCountEl) {
            selectedCountEl.textContent = selectedStamps.size;
        }
    }
    
    function updateSelectAllCheckbox() {
        const selectAllEl = document.getElementById('batchSelectAll');
        if (selectAllEl) {
            const visibleStamps = document.querySelectorAll('.stamp-checkbox').length;
            selectAllEl.checked = selectedStamps.size === visibleStamps && visibleStamps > 0;
            selectAllEl.indeterminate = selectedStamps.size > 0 && selectedStamps.size < visibleStamps;
        }
    }
    
    // Stamp details modal
    function showStampDetails(stampId) {
        const stamp = userCollection.find(s => s.userId === stampId);
        if (!stamp) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
        
        const stampImage = stamp.userImage || stamp.image;
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center p-6 border-b">
                    <h2 class="text-2xl font-bold text-gray-800">
                        ${stamp.country} ${stamp.denomination} (${stamp.year})
                    </h2>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img src="${stampImage}" alt="${stamp.country} stamp" 
                                 class="w-full max-w-md mx-auto rounded-lg shadow-md"
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTIwIDMwTDEwMCA1MEw4MCAzMEwxMDAgNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'">
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Country</label>
                                        <p class="text-gray-800">${stamp.country}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Year</label>
                                        <p class="text-gray-800">${stamp.year}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Denomination</label>
                                        <p class="text-gray-800">${stamp.denomination}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Catalog Number</label>
                                        <p class="text-gray-800">${stamp.catalogNumber}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Condition & Value</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Rarity</label>
                                        <p><span class="${getRarityClass(stamp.rarity)} px-3 py-1 rounded-full text-sm font-medium">
                                            ${stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1)}
                                        </span></p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-600">Condition</label>
                                        <p class="text-gray-800">${stamp.condition}</p>
                                    </div>
                                    <div class="col-span-2">
                                        <label class="text-sm font-medium text-gray-600">Estimated Value</label>
                                        <p class="text-lg font-bold text-green-600">${stamp.value}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                                <p class="text-gray-700 leading-relaxed">${stamp.description}</p>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Collection Info</h3>
                                <div class="text-sm text-gray-600">
                                    <p>Added to collection: ${new Date(stamp.addedDate).toLocaleDateString()}</p>
                                    <p>Stamp ID: ${stamp.userId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8 flex justify-between items-center border-t pt-6">
                        <button onclick="exportStamp('${stamp.userId}')" 
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i class="fas fa-download mr-2"></i>Export Stamp
                        </button>
                        <button onclick="removeStamp('${stamp.userId}'); closeModal();" 
                                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i class="fas fa-trash-alt mr-2"></i>Remove from Collection
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
    
    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    window.closeModal = function() {
        const modal = document.querySelector('.fixed.inset-0.bg-black');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    };
    
    window.showStampDetails = showStampDetails;
    
    window.clearFilters = function() {
        if (filterCountry) filterCountry.value = '';
        if (filterRarity) filterRarity.value = '';
        if (searchInput) searchInput.value = '';
        updateCollectionDisplay();
    };
    
    window.exportStamp = function(stampId) {
        const stamp = userCollection.find(s => s.userId === stampId);
        if (!stamp) return;
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            stamp: stamp
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileName = `StampExpert_${stamp.country}_${stamp.year}_${stamp.denomination.replace(/[^\w]/g, '')}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
        
        showSuccessMessage('Stamp exported successfully!');
    };
    
    window.batchDelete = function() {
        if (selectedStamps.size === 0) return;
        
        if (confirm(`Are you sure you want to delete ${selectedStamps.size} selected stamps?`)) {
            userCollection = userCollection.filter(stamp => !selectedStamps.has(stamp.userId));
            selectedStamps.clear();
            saveCollectionToStorage();
            updateCollectionDisplay();
            showSuccessMessage(`Successfully deleted ${selectedStamps.size} stamps.`);
        }
    };
    
    window.batchExport = function() {
        if (selectedStamps.size === 0) return;
        
        const selectedStampData = userCollection.filter(stamp => selectedStamps.has(stamp.userId));
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            stamps: selectedStampData
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileName = `StampExpert_Batch_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
        
        showSuccessMessage(`Successfully exported ${selectedStamps.size} stamps.`);
    };
    
    // Global function to remove stamp
    window.removeStamp = function(userId) {
        userCollection = userCollection.filter(stamp => stamp.userId !== userId);
        saveCollectionToStorage();
        updateCollectionDisplay();
        showSuccessMessage('Stamp removed from collection.');
    };
    
    // Global export function
    window.exportCollection = exportCollection;
    
    // Global import function
    window.importCollection = importCollection;
    
    // Initialize
    loadCollectionFromStorage();
    loadWishlistFromStorage();
    updateCollectionDisplay();
    initializeAnalytics();
    initializeWishlist();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+O for open file
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            stampUpload.click();
        }
        // Ctrl+E for export
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportCollection();
        }
        // Escape to cancel
        if (e.key === 'Escape') {
            if (!previewArea.classList.contains('hidden')) {
                cancelBtn.click();
            }
            if (!resultsContainer.classList.contains('hidden')) {
                newAnalysisBtn.click();
            }
        }
        // Ctrl+A for analytics
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            toggleAnalytics();
        }
        // Ctrl+W for wishlist
        if (e.ctrlKey && e.key === 'w') {
            e.preventDefault();
            showWishlistModal();
        }
    });

    // ========== ADVANCED ANALYTICS FUNCTIONS ==========
    
    function initializeAnalytics() {
        const toggleBtn = document.getElementById('toggleAnalytics');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleAnalytics);
        }
    }
    
    function toggleAnalytics() {
        const panel = document.getElementById('analyticsPanel');
        if (!panel) return;
        
        const isHidden = panel.classList.contains('hidden');
        
        if (isHidden) {
            panel.classList.remove('hidden');
            updateAnalyticsDashboard();
            document.getElementById('toggleAnalytics').innerHTML = '<i class="fas fa-chart-line mr-1"></i> Hide Analytics';
        } else {
            panel.classList.add('hidden');
            document.getElementById('toggleAnalytics').innerHTML = '<i class="fas fa-chart-line mr-1"></i> View Analytics';
        }
    }
    
    function updateAnalyticsDashboard() {
        updateValueDistribution();
        updateCountryDistribution();
        updateYearDistribution();
        updateCollectionInsights();
    }
    
    function updateValueDistribution() {
        const valueRanges = {
            'Under $50': 0,
            '$50 - $200': 0,
            '$200 - $500': 0,
            '$500 - $1,000': 0,
            '$1,000 - $5,000': 0,
            'Over $5,000': 0
        };
        
        userCollection.forEach(stamp => {
            const value = getStampValue(stamp);
            if (value < 50) valueRanges['Under $50']++;
            else if (value < 200) valueRanges['$50 - $200']++;
            else if (value < 500) valueRanges['$200 - $500']++;
            else if (value < 1000) valueRanges['$500 - $1,000']++;
            else if (value < 5000) valueRanges['$1,000 - $5,000']++;
            else valueRanges['Over $5,000']++;
        });
        
        const container = document.getElementById('valueDistribution');
        if (container) {
            const maxCount = Math.max(...Object.values(valueRanges));
            container.innerHTML = Object.entries(valueRanges).map(([range, count]) => `
                <div class="flex items-center justify-between py-2">
                    <span class="text-sm font-medium text-gray-700">${range}</span>
                    <div class="flex items-center space-x-2">
                        <div class="w-20 bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${maxCount > 0 ? (count / maxCount) * 100 : 0}%"></div>
                        </div>
                        <span class="text-sm text-gray-600 w-6 text-right">${count}</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function updateCountryDistribution() {
        const countryCounts = {};
        userCollection.forEach(stamp => {
            countryCounts[stamp.country] = (countryCounts[stamp.country] || 0) + 1;
        });
        
        const sortedCountries = Object.entries(countryCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        const container = document.getElementById('countryDistribution');
        if (container) {
            const maxCount = sortedCountries.length > 0 ? sortedCountries[0][1] : 0;
            container.innerHTML = sortedCountries.map(([country, count]) => `
                <div class="flex items-center justify-between py-2">
                    <span class="text-sm font-medium text-gray-700">${country}</span>
                    <div class="flex items-center space-x-2">
                        <div class="w-20 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: ${maxCount > 0 ? (count / maxCount) * 100 : 0}%"></div>
                        </div>
                        <span class="text-sm text-gray-600 w-6 text-right">${count}</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function updateYearDistribution() {
        const decades = {};
        userCollection.forEach(stamp => {
            const year = parseInt(stamp.year);
            const decade = Math.floor(year / 10) * 10;
            decades[decade] = (decades[decade] || 0) + 1;
        });
        
        const container = document.getElementById('yearDistribution');
        if (container) {
            const sortedDecades = Object.entries(decades).sort(([a], [b]) => parseInt(a) - parseInt(b));
            const maxCount = Math.max(...Object.values(decades));
            
            container.innerHTML = sortedDecades.map(([decade, count]) => `
                <div class="flex flex-col items-center justify-end flex-1 mx-1">
                    <div class="bg-purple-500 w-full rounded-t" style="height: ${maxCount > 0 ? (count / maxCount) * 100 : 0}px; min-height: 4px;"></div>
                    <span class="text-xs text-gray-600 mt-1 transform -rotate-45 origin-bottom-left">${decade}s</span>
                    <span class="text-xs font-medium text-gray-800">${count}</span>
                </div>
            `).join('');
        }
    }
    
    function updateCollectionInsights() {
        // Average value
        const totalValue = userCollection.reduce((sum, stamp) => sum + getStampValue(stamp), 0);
        const avgValue = userCollection.length > 0 ? totalValue / userCollection.length : 0;
        const avgValueEl = document.getElementById('avgValue');
        if (avgValueEl) {
            avgValueEl.textContent = avgValue > 0 ? `$${Math.round(avgValue).toLocaleString()}` : '$0';
        }
        
        // Oldest year
        const years = userCollection.map(stamp => parseInt(stamp.year)).filter(year => !isNaN(year));
        const oldestYear = years.length > 0 ? Math.min(...years) : null;
        const oldestYearEl = document.getElementById('oldestYear');
        if (oldestYearEl) {
            oldestYearEl.textContent = oldestYear || '-';
        }
        
        // Most common country
        const countryCounts = {};
        userCollection.forEach(stamp => {
            countryCounts[stamp.country] = (countryCounts[stamp.country] || 0) + 1;
        });
        const mostCommonCountry = Object.entries(countryCounts).sort(([,a], [,b]) => b - a)[0];
        const mostCommonCountryEl = document.getElementById('mostCommonCountry');
        if (mostCommonCountryEl) {
            mostCommonCountryEl.textContent = mostCommonCountry ? mostCommonCountry[0] : '-';
        }
        
        // Rare percentage
        const rareCount = userCollection.filter(stamp => 
            ['rare', 'ultra-rare', 'legendary'].includes(stamp.rarity)
        ).length;
        const rarePercentage = userCollection.length > 0 ? (rareCount / userCollection.length) * 100 : 0;
        const rarePercentageEl = document.getElementById('rarePercentage');
        if (rarePercentageEl) {
            rarePercentageEl.textContent = `${Math.round(rarePercentage)}%`;
        }
    }

    // ========== WISHLIST FUNCTIONS ==========
    
    function initializeWishlist() {
        const addBtn = document.getElementById('addToWishlistBtn');
        const modal = document.getElementById('wishlistModal');
        const closeBtn = document.getElementById('closeWishlistModal');
        const cancelBtn = document.getElementById('cancelWishlist');
        const form = document.getElementById('wishlistForm');
        
        if (addBtn) {
            addBtn.addEventListener('click', showWishlistModal);
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', hideWishlistModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideWishlistModal);
        }
        
        if (form) {
            form.addEventListener('submit', handleWishlistSubmit);
        }
        
        updateWishlistDisplay();
    }
    
    function showWishlistModal() {
        const modal = document.getElementById('wishlistModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            document.getElementById('wishCountry').focus();
        }
    }
    
    function hideWishlistModal() {
        const modal = document.getElementById('wishlistModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.getElementById('wishlistForm').reset();
        }
    }
    
    function handleWishlistSubmit(e) {
        e.preventDefault();
        
        const wishItem = {
            id: 'wish-' + Date.now(),
            country: document.getElementById('wishCountry').value,
            year: document.getElementById('wishYear').value,
            description: document.getElementById('wishDescription').value,
            maxPrice: parseFloat(document.getElementById('wishPrice').value) || null,
            dateAdded: new Date().toISOString()
        };
        
        userWishlist.push(wishItem);
        saveWishlistToStorage();
        updateWishlistDisplay();
        hideWishlistModal();
        showSuccessMessage('Added to wishlist!');
    }
    
    function saveWishlistToStorage() {
        try {
            localStorage.setItem('stampWishlist', JSON.stringify(userWishlist));
        } catch (error) {
            console.error('Failed to save wishlist:', error);
        }
    }
    
    function loadWishlistFromStorage() {
        try {
            const saved = localStorage.getItem('stampWishlist');
            if (saved) {
                userWishlist = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load wishlist:', error);
            userWishlist = [];
        }
    }
    
    function updateWishlistDisplay() {
        const container = document.getElementById('wishlistItems');
        const section = document.getElementById('wishlistSection');
        
        if (!container || !section) return;
        
        if (userCollection.length > 0) {
            section.classList.remove('hidden');
        }
        
        if (userWishlist.length === 0) {
            container.innerHTML = `
                <div class="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-gray-300 text-center">
                    <i class="fas fa-plus text-3xl text-gray-400 mb-2"></i>
                    <p class="text-gray-500">Add stamps you want to find</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = userWishlist.map(item => `
            <div class="bg-white rounded-lg p-4 shadow-sm border">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-gray-800">${item.country} ${item.year || ''}</h4>
                    <button onclick="removeFromWishlist('${item.id}')" 
                            class="text-red-500 hover:text-red-700 text-sm">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                ${item.maxPrice ? `<p class="text-sm font-medium text-green-600">Max: $${item.maxPrice}</p>` : ''}
                <div class="flex justify-between items-center mt-3 pt-3 border-t text-xs text-gray-500">
                    <span>Added ${new Date(item.dateAdded).toLocaleDateString()}</span>
                    <button onclick="searchForWishlistItem('${item.country}', '${item.year}')"
                            class="text-blue-600 hover:text-blue-800 font-medium">
                        Search <i class="fas fa-search ml-1"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    window.removeFromWishlist = function(itemId) {
        userWishlist = userWishlist.filter(item => item.id !== itemId);
        saveWishlistToStorage();
        updateWishlistDisplay();
        showSuccessMessage('Removed from wishlist.');
    };
    
    window.searchForWishlistItem = function(country, year) {
        // Auto-populate search filters
        if (filterCountry) filterCountry.value = country;
        if (searchInput) searchInput.value = year;
        
        // Scroll to collection
        document.getElementById('collectionContainer')?.scrollIntoView({ behavior: 'smooth' });
        
        // Update display with filters
        updateCollectionDisplay();
    };

    // ========== ENHANCED COLLECTION DISPLAY ==========
    
    function updateCollectionDisplay() {
        updateCollectionStats();
        updateAnalyticsDashboard();
        
        if (userCollection.length === 0) {
            emptyCollection.classList.remove('hidden');
            stampCollection.classList.add('hidden');
            document.getElementById('collectionStats').classList.add('hidden');
            document.getElementById('wishlistSection')?.classList.add('hidden');
            return;
        }
        
        emptyCollection.classList.add('hidden');
        stampCollection.classList.remove('hidden');
        document.getElementById('collectionStats').classList.remove('hidden');
        document.getElementById('wishlistSection')?.classList.remove('hidden');
        
        // Apply filters and search
        let filteredCollection = applyFiltersAndSearch();
        
        // Apply sorting
        filteredCollection = applySorting(filteredCollection);
        
        // Clear current display
        stampCollection.innerHTML = '';
        
        // Check if we have results after filtering
        if (filteredCollection.length === 0) {
            stampCollection.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No stamps match your current filters.</p>
                    <button onclick="clearFilters()" class="mt-2 text-blue-600 hover:text-blue-800">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        // Render stamps based on view mode
        if (viewMode === 'grid') {
            renderGridView(filteredCollection);
        } else {
            renderListView(filteredCollection);
        }
        
        updateWishlistDisplay();
    }
});
