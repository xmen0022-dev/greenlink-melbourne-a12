// Built-in catalog data keeps the application useful during first-run setup,
// local demos, and temporary Firestore outages.
export const pages = [
  { id: 'home', label: 'Home' },
  { id: 'spaces', label: 'Explore Green Spaces' },
  { id: 'plants', label: 'Plant Finder' },
  { id: 'events', label: 'Community Events' },
  { id: 'learn', label: 'Learn' },
  { id: 'account', label: 'My Account' },
]

export const greenSpaces = [
  { id: 1, name: 'Royal Park', suburb: 'Parkville', type: 'Park', summary: 'Large urban parkland with native planting areas and habitat corridors.', detail: 'Royal Park supports urban cooling, local recreation, and habitat for native birds and insects.', latitude: -37.7906, longitude: 144.9519, x: '42%', y: '28%' },
  { id: 2, name: 'Carlton Gardens', suburb: 'Carlton', type: 'Park', summary: 'Historic garden space with mature trees and shaded walking paths.', detail: 'Carlton Gardens shows how established tree canopy can improve city comfort and biodiversity.', latitude: -37.8054, longitude: 144.9715, x: '54%', y: '40%' },
  { id: 3, name: 'CERES Community Environment Park', suburb: 'Brunswick East', type: 'Community Garden', summary: 'Community education site focused on gardens, composting, and local ecology.', detail: 'CERES connects residents with hands-on urban greening, biodiversity learning, and community action.', latitude: -37.7653, longitude: 144.9824, x: '36%', y: '36%' },
  { id: 4, name: 'Merri Creek Reserve', suburb: 'Northcote', type: 'Nature Reserve', summary: 'Creek-side habitat restoration area with native grasses and shrubs.', detail: 'Merri Creek Reserve is useful for biodiversity protection, waterway care, and native habitat recovery.', latitude: -37.7715, longitude: 144.998, x: '48%', y: '62%' },
  { id: 5, name: 'Fitzroy Gardens', suburb: 'East Melbourne', type: 'Park', summary: 'Tree-lined paths, lawns, and habitat pockets close to central Melbourne.', detail: 'Fitzroy Gardens combines heritage landscapes with mature canopy and accessible walking paths.', latitude: -37.8127, longitude: 144.9804, x: '61%', y: '48%' },
  { id: 6, name: 'Edinburgh Gardens', suburb: 'Fitzroy North', type: 'Park', summary: 'A large neighbourhood park supporting recreation and established tree canopy.', detail: 'Edinburgh Gardens provides shade, open lawns, community facilities, and habitat for urban wildlife.', latitude: -37.7836, longitude: 144.9822, x: '58%', y: '31%' },
  { id: 7, name: 'Princes Park', suburb: 'Carlton North', type: 'Park', summary: 'Open parkland with sporting fields, walking routes, and mature trees.', detail: 'Princes Park is an important green corridor between Carlton North and Parkville.', latitude: -37.7818, longitude: 144.9612, x: '47%', y: '34%' },
  { id: 8, name: 'Yarra Bend Park', suburb: 'Kew', type: 'Nature Reserve', summary: 'River corridor with bushland, trails, wetlands, and wildlife habitat.', detail: 'Yarra Bend Park protects a substantial inner-city river landscape and diverse native habitat.', latitude: -37.797, longitude: 145.012, x: '72%', y: '43%' },
  { id: 9, name: 'Royal Botanic Gardens', suburb: 'Melbourne', type: 'Park', summary: 'Extensive botanical collections, lakes, lawns, and educational gardens.', detail: 'The gardens support plant conservation, public education, recreation, and urban cooling.', latitude: -37.8304, longitude: 144.9796, x: '57%', y: '68%' },
  { id: 10, name: 'Westgate Park', suburb: 'Port Melbourne', type: 'Nature Reserve', summary: 'Coastal park with wetlands, saltmarsh, native vegetation, and bird habitat.', detail: 'Westgate Park demonstrates ecological restoration in a heavily modified industrial landscape.', latitude: -37.8326, longitude: 144.9084, x: '22%', y: '71%' },
  { id: 11, name: 'Albert Park', suburb: 'Albert Park', type: 'Park', summary: 'Lakeside parkland with walking trails, sporting areas, and bird habitat.', detail: 'Albert Park Lake supports recreation and a variety of waterbirds near the city centre.', latitude: -37.842, longitude: 144.961, x: '46%', y: '79%' },
  { id: 12, name: 'Rushall Community Garden', suburb: 'Fitzroy North', type: 'Community Garden', summary: 'Shared garden plots supporting local food growing and community learning.', detail: 'Rushall Community Garden brings residents together through sustainable gardening and shared skills.', latitude: -37.779, longitude: 144.992, x: '64%', y: '30%' },
]

export const nativePlants = [
  { id: 101, name: 'Kangaroo Paw', sunlight: 'Full Sun', garden: 'Small Garden', type: 'Flower', summary: 'Attracts native birds and insects including honeyeaters and native bees.', detail: 'A strong option for sunny gardens where residents want colour and pollinator support.' },
  { id: 102, name: 'Native Violet', sunlight: 'Partial Shade', garden: 'Balcony', type: 'Groundcover', summary: 'Provides dense ground cover that supports insects and small wildlife.', detail: 'A low-growing plant for shaded pots, balconies, and small habitat patches.' },
  { id: 103, name: 'Bottlebrush', sunlight: 'Full Sun', garden: 'Backyard', type: 'Shrub', summary: 'Excellent nectar source for honeyeaters, lorikeets, and native bees.', detail: 'Bottlebrush works well in larger spaces and supports visible biodiversity in suburban gardens.' },
  { id: 104, name: 'Silver Banksia', sunlight: 'Full Sun', garden: 'Backyard', type: 'Tree', summary: 'Native tree that supports birds and improves local canopy cover.', detail: 'A good tree-planting choice for residents who have enough space for a larger native plant.' },
  { id: 105, name: 'Correa', sunlight: 'Partial Shade', garden: 'Small Garden', type: 'Shrub', summary: 'Bell-shaped flowers provide nectar during cooler months.', detail: 'A compact and hardy shrub suited to sheltered Melbourne gardens.' },
  { id: 106, name: 'Grevillea', sunlight: 'Full Sun', garden: 'Backyard', type: 'Shrub', summary: 'Long-flowering native shrub that attracts birds and pollinating insects.', detail: 'Choose a compact local variety for reliable flowers and wildlife value.' },
  { id: 107, name: 'Dianella', sunlight: 'Partial Shade', garden: 'Small Garden', type: 'Groundcover', summary: 'Strappy foliage and blue berries create shelter and seasonal food.', detail: 'Dianella is useful for borders, habitat gardens, and low-maintenance planting.' },
  { id: 108, name: 'Wahlenbergia', sunlight: 'Full Sun', garden: 'Balcony', type: 'Flower', summary: 'Small blue native flowers support insects in compact spaces.', detail: 'Native bluebells grow well in pots and sunny small gardens.' },
  { id: 109, name: 'Blackwood', sunlight: 'Full Sun', garden: 'Backyard', type: 'Tree', summary: 'A medium native tree that adds canopy and habitat structure.', detail: 'Blackwood suits larger sites with adequate soil moisture and room to mature.' },
  { id: 110, name: 'Running Postman', sunlight: 'Full Sun', garden: 'Balcony', type: 'Groundcover', summary: 'A trailing native pea with bright flowers for pots and edges.', detail: 'This plant provides colour and shelter while remaining suitable for small spaces.' },
  { id: 111, name: 'Tea Tree', sunlight: 'Full Sun', garden: 'Backyard', type: 'Shrub', summary: 'Dense branches provide shelter while flowers attract insects.', detail: 'Tea trees are resilient habitat shrubs for sunny and moderately exposed sites.' },
  { id: 112, name: 'Everlasting Daisy', sunlight: 'Full Sun', garden: 'Small Garden', type: 'Flower', summary: 'Long-lasting flowers offer colour and resources for pollinators.', detail: 'Everlasting daisies perform well in sunny, well-drained beds and containers.' },
]

export const initialEvents = [
  { id: 201, date: 'Sat 24 Oct', dateIso: '2026-10-24', dateGroup: 'This month', title: 'Royal Park Tree Planting Day', location: 'Parkville', tag: 'Tree Planting', summary: 'Help plant native trees and shrubs to improve shade and wildlife habitat.' },
  { id: 202, date: 'Sun 1 Nov', dateIso: '2026-11-01', dateGroup: 'Next month', title: 'CERES Biodiversity Workshop', location: 'Brunswick East', tag: 'Biodiversity', summary: 'Learn simple ways to support insects, birds, and native plants at home.' },
  { id: 203, date: 'Sun 8 Nov', dateIso: '2026-11-08', dateGroup: 'Next month', title: 'Carlton Gardens Community Garden Session', location: 'Carlton', tag: 'Community Gardening', summary: 'Join a practical gardening session focused on soil, seedlings, and shared green space.' },
  { id: 204, date: 'Sat 14 Nov', dateIso: '2026-11-14', dateGroup: 'Next month', title: 'Merri Creek Habitat Care Morning', location: 'Northcote', tag: 'Biodiversity', summary: 'Remove weeds and protect native habitat along the creek corridor.' },
  { id: 205, date: 'Sun 25 Oct', dateIso: '2026-10-25', dateGroup: 'This month', title: 'Fitzroy Gardens Pollinator Walk', location: 'East Melbourne', tag: 'Biodiversity', summary: 'Identify pollinators and the plants that support them in an urban park.' },
  { id: 206, date: 'Sat 31 Oct', dateIso: '2026-10-31', dateGroup: 'This month', title: 'Princes Park Seedling Care', location: 'Carlton', tag: 'Tree Planting', summary: 'Maintain young trees with watering, guards, mulch, and simple health checks.' },
  { id: 207, date: 'Sun 15 Nov', dateIso: '2026-11-15', dateGroup: 'Next month', title: 'Yarra Bend Citizen Science Survey', location: 'Kew', tag: 'Biodiversity', summary: 'Record birds, insects, and habitat observations along the Yarra corridor.' },
  { id: 208, date: 'Sat 21 Nov', dateIso: '2026-11-21', dateGroup: 'Next month', title: 'Westgate Wetland Care Day', location: 'Port Melbourne', tag: 'Biodiversity', summary: 'Support wetland restoration through litter removal and vegetation monitoring.' },
  { id: 209, date: 'Sun 22 Nov', dateIso: '2026-11-22', dateGroup: 'Next month', title: 'Balcony Native Plant Workshop', location: 'Melbourne', tag: 'Workshop', summary: 'Plan a small-space native garden for shade, colour, and pollinator habitat.' },
  { id: 210, date: 'Sat 28 Nov', dateIso: '2026-11-28', dateGroup: 'Next month', title: 'Rushall Composting Session', location: 'Fitzroy North', tag: 'Community Gardening', summary: 'Learn practical composting methods for apartments and shared gardens.' },
  { id: 211, date: 'Sun 29 Nov', dateIso: '2026-11-29', dateGroup: 'Next month', title: 'Albert Park Lakeside Cleanup', location: 'Albert Park', tag: 'Biodiversity', summary: 'Help remove litter and record waterbird activity around the lake.' },
  { id: 212, date: 'Sat 5 Dec', dateIso: '2026-12-05', dateGroup: 'Next month', title: 'Native Garden Design Clinic', location: 'Brunswick East', tag: 'Workshop', summary: 'Bring a garden sketch and receive advice on local native plant selection.' },
]

export const learningTopics = [
  { id: 301, title: 'Urban Greening', summary: 'Learn how trees and green spaces support healthier cities.' },
  { id: 302, title: 'Native Biodiversity', summary: 'Learn why local plants and wildlife are important.' },
  { id: 303, title: 'Tree Planting Basics', summary: 'Understand how to choose, plant, and care for young trees.' },
  { id: 304, title: 'Small Space Gardening', summary: 'Use balconies and small gardens to create useful habitat.' },
  { id: 305, title: 'Waterwise Gardening', summary: 'Design resilient gardens that use water carefully during hot weather.' },
  { id: 306, title: 'Citizen Science', summary: 'Record local plants and wildlife to support community biodiversity knowledge.' },
]

// Dashboard and navigation content that is presentation-focused rather than
// user-generated data.
export const impactStats = [
  { value: '48', label: 'green spaces listed' },
  { value: '1,280+', label: 'native plants matched' },
  { value: '22', label: 'suburbs covered' },
]

export const quickActions = [
  { title: 'Explore', text: 'Find parks, gardens, and nature reserves around Melbourne.', cta: 'Explore Green Spaces', page: 'spaces' },
  { title: 'Grow', text: 'Find native plants suitable for your available space.', cta: 'Open Plant Finder', page: 'plants' },
  { title: 'Participate', text: 'Find tree-planting, gardening, and biodiversity activities.', cta: 'Browse Events', page: 'events' },
]

// Shared filter choices used by multiple catalog views and forms.
export const spaceTypes = ['All', 'Park', 'Community Garden', 'Nature Reserve']
export const sunlightOptions = ['Full Sun', 'Partial Shade', 'Shade']
export const gardenOptions = ['Balcony', 'Small Garden', 'Backyard']
export const plantOptions = ['Tree', 'Shrub', 'Flower', 'Groundcover']
export const eventTypes = ['Tree Planting', 'Community Gardening', 'Biodiversity', 'Workshop']
export const eventLocations = ['All Locations', 'Parkville', 'Brunswick East', 'Carlton', 'Northcote']
export const eventDates = ['All Dates', 'This month', 'Next month']
