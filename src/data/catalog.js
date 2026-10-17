export const pages = [
  { id: 'home', label: 'Home' },
  { id: 'spaces', label: 'Explore Green Spaces' },
  { id: 'plants', label: 'Plant Finder' },
  { id: 'events', label: 'Community Events' },
  { id: 'learn', label: 'Learn' },
  { id: 'account', label: 'My Account' },
]

export const greenSpaces = [
  { id: 1, name: 'Royal Park', suburb: 'Parkville', type: 'Park', summary: 'Large urban parkland with native planting areas and habitat corridors.', detail: 'Royal Park supports urban cooling, local recreation, and habitat for native birds and insects.', x: '42%', y: '28%' },
  { id: 2, name: 'Carlton Gardens', suburb: 'Carlton', type: 'Park', summary: 'Historic garden space with mature trees and shaded walking paths.', detail: 'Carlton Gardens shows how established tree canopy can improve city comfort and biodiversity.', x: '54%', y: '40%' },
  { id: 3, name: 'CERES Community Environment Park', suburb: 'Brunswick East', type: 'Community Garden', summary: 'Community education site focused on gardens, composting, and local ecology.', detail: 'CERES connects residents with hands-on urban greening, biodiversity learning, and community action.', x: '36%', y: '36%' },
  { id: 4, name: 'Merri Creek Reserve', suburb: 'Northcote', type: 'Nature Reserve', summary: 'Creek-side habitat restoration area with native grasses and shrubs.', detail: 'Merri Creek Reserve is useful for biodiversity protection, waterway care, and native habitat recovery.', x: '48%', y: '62%' },
]

export const nativePlants = [
  { id: 101, name: 'Kangaroo Paw', sunlight: 'Full Sun', garden: 'Small Garden', type: 'Flower', summary: 'Attracts native birds and insects including honeyeaters and native bees.', detail: 'A strong option for sunny gardens where residents want colour and pollinator support.' },
  { id: 102, name: 'Native Violet', sunlight: 'Partial Shade', garden: 'Balcony', type: 'Groundcover', summary: 'Provides dense ground cover that supports insects and small wildlife.', detail: 'A low-growing plant for shaded pots, balconies, and small habitat patches.' },
  { id: 103, name: 'Bottlebrush', sunlight: 'Full Sun', garden: 'Backyard', type: 'Shrub', summary: 'Excellent nectar source for honeyeaters, lorikeets, and native bees.', detail: 'Bottlebrush works well in larger spaces and supports visible biodiversity in suburban gardens.' },
  { id: 104, name: 'Silver Banksia', sunlight: 'Full Sun', garden: 'Backyard', type: 'Tree', summary: 'Native tree that supports birds and improves local canopy cover.', detail: 'A good tree-planting choice for residents who have enough space for a larger native plant.' },
]

export const initialEvents = [
  { id: 201, date: 'Sat 29 Aug', dateGroup: 'This month', title: 'Royal Park Tree Planting Day', location: 'Parkville', tag: 'Tree Planting', summary: 'Help plant native trees and shrubs to improve shade and wildlife habitat.' },
  { id: 202, date: 'Sun 6 Sep', dateGroup: 'Next month', title: 'CERES Biodiversity Workshop', location: 'Brunswick East', tag: 'Biodiversity', summary: 'Learn simple ways to support insects, birds, and native plants at home.' },
  { id: 203, date: 'Tue 15 Sep', dateGroup: 'Next month', title: 'Carlton Gardens Community Garden Session', location: 'Carlton', tag: 'Community Gardening', summary: 'Join a practical gardening session focused on soil, seedlings, and shared green space.' },
  { id: 204, date: 'Sat 26 Sep', dateGroup: 'Next month', title: 'Merri Creek Habitat Care Morning', location: 'Northcote', tag: 'Biodiversity', summary: 'Remove weeds and protect native habitat along the creek corridor.' },
]

export const learningTopics = [
  { id: 301, title: 'Urban Greening', summary: 'Learn how trees and green spaces support healthier cities.' },
  { id: 302, title: 'Native Biodiversity', summary: 'Learn why local plants and wildlife are important.' },
  { id: 303, title: 'Tree Planting Basics', summary: 'Understand how to choose, plant, and care for young trees.' },
  { id: 304, title: 'Small Space Gardening', summary: 'Use balconies and small gardens to create useful habitat.' },
]

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

export const spaceTypes = ['All', 'Park', 'Community Garden', 'Nature Reserve']
export const sunlightOptions = ['Full Sun', 'Partial Shade', 'Shade']
export const gardenOptions = ['Balcony', 'Small Garden', 'Backyard']
export const plantOptions = ['Tree', 'Shrub', 'Flower', 'Groundcover']
export const eventTypes = ['Tree Planting', 'Community Gardening', 'Biodiversity', 'Workshop']
export const eventLocations = ['All Locations', 'Parkville', 'Brunswick East', 'Carlton', 'Northcote']
export const eventDates = ['All Dates', 'This month', 'Next month']
