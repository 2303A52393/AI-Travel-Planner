/**
 * AI Travel Plan Generator (DATA-MAX v5.0)
 * Expanded with 5 Hotels, 5 Restaurants, 5 Landmarks, and 5 Historical Sites per city.
 * Supports up to 14 days of balanced, high-density content.
 */

const commonLeisure = [
  { name: "Local Market Exploration", type: "Leisure", description: "Wander through the vibrant local bazaars, sampling street food and shopping for souvenirs." },
  { name: "Evening Stroll & Photography", type: "Leisure", description: "A relaxed walk through scenic areas of the city to capture the local vibe during the golden hour." },
  { name: "Cafe Hopping", type: "Leisure", description: "Visit some of the most popular local cafes to try regional beverages and relax with a book." },
  { name: "Temple/Church Architecture Study", type: "Leisure", description: "A slow-paced visit to minor local shrines to appreciate the intricate local architecture and peaceful vibes." },
  { name: "Local Culinary Tour", type: "Leisure", description: "Join a self-guided food walk to discover the city's hidden culinary gems and iconic eateries." },
  { name: "Relax at Public Parks", type: "Leisure", description: "Spend a quiet afternoon in one of the city's green lungs, observing local life." },
  { name: "Street Mural Hunt", type: "Leisure", description: "Explore the city's street art scene and colorful murals in urban neighborhoods." },
  { name: "Souvenir Shopping Spree", type: "Leisure", description: "Visit traditional handicraft stores to pick up unique local gifts and artwork." },
  { name: "Regional Snack Tasting", type: "Leisure", description: "Head to a famous local bakery/snack shop to try the city's signature delicacies." }
];

const destinations = {
  "warangal": {
    temples: [
      { name: "Thousand Pillar Temple", location: "Hanamkonda", history: { dynasty: "Kakatiya", year: 1163, builder: "Rudra Deva", importance: "Masterpiece of Kakatiya architecture with 1000 pillars" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ramappa Temple", location: "Palampet", history: { dynasty: "Kakatiya", year: 1213, builder: "Recherla Rudra", importance: "UNESCO World Heritage Site with floating bricks" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Bhadrakali Temple", location: "Near Bhadrakali Lake", history: { dynasty: "Chalukya", year: 625, builder: "Pulakeshin II", importance: "One of the oldest temples for Goddess Bhadrakali" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Padmakshi Temple", location: "Hanamkonda", history: { dynasty: "Kakatiya", year: 1150, builder: "Prolla II", importance: "Jain and Hindu hybrid architecture on a hilltop" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.4 },
      { name: "Inavolu Mallikarjuna Temple", location: "Inavolu", history: { dynasty: "Kakatiya", year: 1100, builder: "Unknown", importance: "Famous for its unique Jathara festivals" }, timings: "5:00 AM – 7:00 PM", entryFee: "Free", rating: 4.5 }
    ],
    famous_places: [
      { name: "Warangal Fort", location: "Mathwada", description: "13th-century fort featuring iconic stone arches (Kakatiya Toranas)." },
      { name: "Laknavaram Lake", location: "Govindaraopet", description: "Scenic lake with a suspension bridge and island resorts." },
      { name: "Pakhal Lake & Wildlife Sanctuary", location: "Narsampet", description: "Stunning lake surrounded by lush green hilly terrain and wildlife." },
      { name: "Kakatiya Musical Garden", location: "Near Bhadrakali Temple", description: "A beautifully landscaped garden featuring a musical fountain." },
      { name: "Eturnagaram Wildlife Sanctuary", location: "Eturnagaram", description: "One of the oldest wildlife sanctuaries in Telangana." }
    ],
    hotels: [
      { name: "Hotel Suprabha", location: "Hanamkonda", pricePerNight: 2800, rating: 4.3 },
      { name: "Hotel Skyland", location: "Station Road", pricePerNight: 1800, rating: 4.1 },
      { name: "Kola’s Grand", location: "Warangal City", pricePerNight: 1500, rating: 3.9 },
      { name: "Hotel O Railway Station", location: "Warangal", pricePerNight: 1200, rating: 3.8 },
      { name: "FabHotel Lake View", location: "Nakkalagutta", pricePerNight: 2200, rating: 4.0 }
    ],
    restaurants: [
      { name: "Green Bawarchi", cuisine: "Biryani", location: "Hanamkonda", rating: 4.2 },
      { name: "Khursheed Hotel", cuisine: "Hyderabadi", location: "Warangal City", rating: 4.5 },
      { name: "Green Park Biryani", cuisine: "Mughlai", location: "Subedari", rating: 4.1 },
      { name: "Skyv Pure Veg", cuisine: "South Indian", location: "Hanamkonda", rating: 4.3 },
      { name: "Mandi.com", cuisine: "Arabic", location: "Kazipet", rating: 4.4 }
    ],
    places_pool: [
      // ... same deep pool for daily schedule generation ...
      { name: "Thousand Pillar Temple", location: "Hanamkonda", type: "Temple" },
      { name: "Warangal Fort Ruins", location: "Mathwada", type: "Landmark" },
      { name: "Ramappa Temple", location: "Palampet", type: "Temple" },
      { name: "Bhadrakali Temple", location: "Warangal", type: "Temple" },
      { name: "Laknavaram Lake", location: "Govindaraopet", type: "Landmark" },
      { name: "Pakhal Lake & Sanctuary", location: "Narsampet", type: "Wildlife" },
      { name: "Eturnagaram Forest", location: "Eturnagaram", type: "Wildlife" },
      { name: "Padmakshi Temple", location: "Hanamkonda", type: "Temple" },
      { name: "Kakatiya Musical Garden", location: "Warangal", type: "Garden" },
      { name: "Kakatiya Rock Garden", location: "Warangal", type: "Garden" },
      { name: "Sammakka Saralamma Temple", location: "Medaram", type: "Temple" },
      { name: "Kolanupaka Jain Temple", location: "Kolanupaka", type: "Temple" },
      { name: "Bheemuni Padam Waterfalls", location: "Gudur", type: "Waterfall" },
      { name: "Inavolu Mallanna Temple", location: "Inavolu", type: "Temple" },
      { name: "Bhadrakali Biodiversity Park", location: "Warangal", type: "Park" },
      { name: "Kush Mahal", location: "Warangal Fort", type: "Landmark" },
      { name: "Rayaparthy Shiva Temple", location: "Rayaparthy", type: "Temple" },
      { name: "Sri Vidya Saraswathi Temple", location: "Wargal", type: "Temple" },
      { name: "Ainavolu Lord Mallikarjuna", location: "Ainavolu", type: "Temple" },
      { name: "Wadepally Reservoir", location: "Hanamkonda", type: "Landmark" },
      { name: "Mallur Narasimha Swamy", location: "Mallur", type: "Temple" },
      { name: "Kazipet Railway Museum", location: "Kazipet", type: "Museum" },
      { name: "Regional Science Centre", location: "Hanamkonda", type: "Learning" },
      { name: "Urs Dargha", location: "Warangal", type: "Culture" },
      { name: "Pratap Nagar Market", location: "Warangal", type: "Market" },
      { name: "Gnanapuram Park", location: "Warangal", type: "Park" },
      { name: "Vana Vigyan Kendra Zoo", location: "Hanamkonda", type: "Wildlife" },
      { name: "Kakatiya University Campus", location: "Hanamkonda", type: "Learning" },
      { name: "Dharmasagar Reservoir", location: "Dharmasagar", type: "Landmark" },
      { name: "Wadepally Hill Trek", location: "Warangal", type: "Activity" },
      { name: "Siddique Dargha", location: "Warangal Fort", type: "Culture" },
      { name: "Hanamkonda Public Garden", location: "Hanamkonda", type: "Garden" },
      { name: "Govindarajula Gutta", location: "Warangal Town", type: "Temple" },
      { name: "Sammakka Sarakka Jathara Path", location: "Medaram", type: "Culture" },
      { name: "Warangal Textile Park", location: "Shyamapet", type: "Industry" },
      { name: "Hunter Road Walk", location: "Warangal", type: "Leisure" },
      { name: "Kazipet Junction (Historic)", location: "Kazipet", type: "Landmark" },
      { name: "Kandakatla Ramappa Temple", location: "Kandakatla", type: "Temple" },
      { name: "Nagnur Fort Ruins", location: "Nagnur", type: "Landmark" },
      { name: "Mallanna Swamy Temple", location: "Komuravelli", type: "Temple" },
      { name: "Jain Hill", location: "Padmakshi Gutta", type: "Landmark" },
      { name: "Warangal Arts College", location: "Subedari", type: "Landmark" },
      { name: "Station Road Shopping", location: "Warangal", type: "Market" },
      { name: "Bhadrakali Lake Sunset", location: "Warangal", type: "Activity" }
    ]
  },
  "tirupati": {
    temples: [
      { name: "Tirumala Venkateswara", location: "Tirumala Hills", history: { dynasty: "Pallava/Vijayanagara", year: 300, builder: "Kings of Pallava", importance: "World's most visited sacred shrine" }, timings: "3:00 AM – 1:00 AM", entryFee: "Free/Paid", rating: 4.9 },
      { name: "Sri Padmavathi Ammavari", location: "Tiruchanur", history: { dynasty: "Pallava", year: 800, builder: "Local Rulers", importance: "Dedicated to Goddess Padmavathi" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sri Govindaraja Swamy", location: "Tirupati City", history: { dynasty: "Vijayanagara", year: 1130, builder: "Ramanujacharya", importance: "One of the largest temple complexes in Tirupati" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Sri Kapileswara Swamy", location: "Tirumala Foot Hills", history: { dynasty: "Ancient", year: 1000, builder: "Cholas", importance: "Pancha Kshethra dedicated to Lord Shiva" }, timings: "5:00 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Sri Kalyana Venkateswara Swamy", location: "Srinivasa Mangapuram", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Where Lord Venkateswara stayed after marriage" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Silathoranam", location: "Tirumala Hills", description: "Millions-of-years-old natural stone arch formation." },
      { name: "Chandragiri Fort", location: "Chandragiri", description: "11th-century fortress, once the capital of Vijayanagara Kings." },
      { name: "Talakona Waterfalls", location: "Sri Venkateswara National Park", description: "Highest waterfall in Andhra Pradesh, scenic trek." },
      { name: "Kapila Theertham Falls", location: "Tirumala Foot Hills", description: "A sacred waterfall located right inside the temple complex." },
      { name: "Sri Venkateswara Zoological Park", location: "Tirupati City", description: "Second largest zoo in Asia with vast enclosures." }
    ],
    hotels: [
      { name: "Hotel Bliss", location: "Renigunta Road", pricePerNight: 2200, rating: 4.2 },
      { name: "Hotel PLR Grand", location: "RTC Bus Stand", pricePerNight: 2600, rating: 4.0 },
      { name: "Raj Park - Hill View", location: "KT Road", pricePerNight: 3500, rating: 4.3 },
      { name: "Republic Inn", location: "Tirupati", pricePerNight: 1800, rating: 4.1 },
      { name: "Golden Tulip", location: "Alipiri Road", pricePerNight: 4500, rating: 4.5 }
    ],
    restaurants: [
      { name: "Minerva Coffee Shop", cuisine: "South Indian", location: "Tirupati", rating: 4.4 },
      { name: "Gufha Restaurant", cuisine: "Multi-cuisine", location: "Pai Viceroy", rating: 4.3 },
      { name: "Adayar Bhavan", cuisine: "South Veg", location: "Tirupati", rating: 4.5 },
      { name: "Bhimas Deluxe", cuisine: "Traditional", location: "Main Road", rating: 4.2 },
      { name: "Lakshmi Narayana Bhavan", cuisine: "Brahminical", location: "Tirupati", rating: 4.6 }
    ],
    places_pool: [
      { name: "Tirumala Main Temple", location: "Tirumala Hills", type: "Temple" },
      { name: "Sri Kapileswara Swamy", location: "Tirupati", type: "Temple" },
      { name: "Sri Padmavathi Ammavari", location: "Tiruchanur", type: "Temple" },
      { name: "Talakona Waterfall", location: "Forest Area", type: "Waterfall" },
      { name: "Silathoranam Natural Arch", location: "Tirumala", type: "Landmark" },
      { name: "Chandragiri Fort", location: "Chandragiri", type: "Landmark" },
      { name: "Swami Pushkarini Lake", location: "Tirumala", type: "Landmark" },
      { name: "Venkateswara National Park", location: "Tirumala", type: "Wildlife" },
      { name: "ISKCON Tirupati", location: "Tirupati", type: "Temple" },
      { name: "Akasaganga Teertham", location: "Tirumala Hills", type: "Waterfall" },
      { name: "TTD Gardens", location: "Tirumala", type: "Garden" },
      { name: "Govindarajan Temple", location: "Tirupati", type: "Temple" },
      { name: "Sri Vari Museum", location: "Tirumala", type: "Museum" },
      { name: "Deer Park", location: "Foot Hills", type: "Park" },
      { name: "Papavinasam Waterfall", location: "Tirumala", type: "Waterfall" },
      { name: "Regional Science Centre", location: "Alipiri", type: "Museum" },
      { name: "Srikalahasti Temple (near)", location: "Srikalahasti", type: "Temple" },
      { name: "Kapila Theertham Falls", location: "Foot Hills", type: "Landmark" },
      { name: "Sri Veda Narayanaswami", location: "Nagalapuram", type: "Temple" },
      { name: "Vaikuntha Teertham", location: "Tirumala", type: "Landmark" },
      { name: "Tumburu Teertham", location: "Forest Area", type: "Waterfall" },
      { name: "Sri Bedi Anjaneyaswami", location: "Tirumala", type: "Temple" },
      { name: "Sri Varahaswami Temple", location: "Tirumala", type: "Temple" },
      { name: "Srivari Mettu Path", location: "Alipiri", type: "Landmark" },
      { name: "Silathoranam Garden", location: "Tirumala", type: "Garden" },
      { name: "Sri Venkateswara Museum", location: "Tirumala", type: "Museum" },
      { name: "Regional Science Centre Park", location: "Alipiri", type: "Park" },
      { name: "Papanasanam Waterfall Trek", location: "Tirumala Hills", type: "Activity" },
      { name: "Tarigonda Vengamamba Walk", location: "Tirumala", type: "Landmark" },
      { name: "Sri Prasanna Venkateswara", location: "Appalayagunta", type: "Temple" },
      { name: "Gudimallam Temple", location: "Renigunta", type: "Temple" },
      { name: "Horsley Hills (near)", location: "Madanapalle", type: "Landmark" },
      { name: "Nagari Hills Trek", location: "Nagari", type: "Activity" },
      { name: "Kanakana Raya Cave", location: "Chandragiri", type: "Landmark" },
      { name: "Renigunta Junction Walk", location: "Renigunta", type: "Leisure" },
      { name: "Tirupati Bazaar Shopping", location: "Main Road", type: "Market" },
      { name: "S.V. Ayurvedic Museum", location: "Tirupati", type: "Museum" },
      { name: "Alipiri Srivari Padalu", location: "Foot Hills", type: "Landmark" },
      { name: "Sri Kalyana Venkateswara", location: "Srinivasa Mangapuram", type: "Temple" },
      { name: "Surutapalli Shiva Temple", location: "Surutapalli", type: "Temple" },
      { name: "Kailasakona Waterfalls", location: "Nagari", type: "Waterfall" },
      { name: "Vakalapudi Beach (near)", location: "Kakinada", type: "Beach" },
      { name: "Regional Planetarium", location: "Tirupati", type: "Learning" },
      { name: "Tirumala Forest Safari", location: "Tirumala", type: "Wildlife" },
      { name: "Akasa Ganga ViewPoint", location: "Tirumala", type: "Landmark" },
      { name: "TTD Information Centre", location: "Tirupati", type: "Culture" }
    ]
  },
  "hyderabad": {
    temples: [
      { name: "Birla Mandir", location: "Naubath Pahad", history: { dynasty: "Modern", year: 1976, builder: "B.K. Birla", importance: "Stone-carved white marble temple with city views" }, timings: "7:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Chilkur Balaji", location: "Gandipet", history: { dynasty: "14th Century", year: 1350, builder: "Unknown", importance: "Worshipped as the 'Visa Balaji'" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Karmanghat Hanuman", location: "Karmanghat", history: { dynasty: "Kakatiya", year: 1143, builder: "Prataprudra II", importance: "One of the oldest and most powerful Hanuman temples" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Ujjaini Mahankali", location: "Secunderabad", history: { dynasty: "Ancient", year: 1813, builder: "Appaiah", importance: "Central to the Bonalu festival celebrations" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sita Ramachandraswamy", location: "Ammapalli", history: { dynasty: "Ancient", year: 1600, builder: "Unknown", importance: "Popular film shooting location with historic idols" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.5 }
    ],
    famous_places: [
      { name: "Charminar", location: "Old City", description: "Iconic 16th-century monument with four grand minarets." },
      { name: "Golconda Fort", location: "Golconda", description: "Breathtaking medieval hilltop citadel with acoustic wonders." },
      { name: "Chowmahalla Palace", location: "Old City", description: "Elegant 18th-century palace reflecting the Nizams' royal heritage." },
      { name: "Qutb Shahi Tombs", location: "Ibrahim Bagh", description: "Historic necropolis with stunning Indo-Islamic dome architecture." },
      { name: "Salar Jung Museum", location: "Old City Side", description: "One of the world's largest private art collections." }
    ],
    hotels: [
      { name: "Slackpackr", location: "Begumpet", pricePerNight: 900, rating: 4.5 },
      { name: "Hotel Siri Inn", location: "Hitech City", pricePerNight: 2800, rating: 4.2 },
      { name: "Holiday Inn Express", location: "Banjara Hills", pricePerNight: 4500, rating: 4.3 },
      { name: "The Purple Leaf", location: "Secunderabad", pricePerNight: 3200, rating: 4.1 },
      { name: "Hotel Minerva Grand", location: "Banjara Hills", pricePerNight: 3500, rating: 4.3 }
    ],
    restaurants: [
      { name: "Shah Ghouse", cuisine: "Biryani", location: "Gachibowli", rating: 4.4 },
      { name: "Paradise IT Junction", cuisine: "Biryani", location: "Hitech City", rating: 4.2 },
      { name: "Chutneys", cuisine: "South Veg", location: "Banjara Hills", rating: 4.5 },
      { name: "Rayalaseema Ruchulu", cuisine: "Telugu", location: "Jubilee Hills", rating: 4.4 },
      { name: "Nimrah Cafe", cuisine: "Irani Chai", location: "Charminar", rating: 4.7 }
    ],
    places_pool: [
      { name: "Charminar", location: "Old City", type: "Landmark" },
      { name: "Golconda Fort", location: "Golconda", type: "Landmark" },
      { name: "Ramoji Film City", location: "Outskirts", type: "Activity" },
      { name: "Salar Jung Museum", location: "Old City", type: "Museum" },
      { name: "Chowmahalla Palace", location: "Old City", type: "Landmark" },
      { name: "Hussain Sagar Lake", location: "Central", type: "Landmark" },
      { name: "Qutb Shahi Tombs", location: "Ibrahim Bagh", type: "Landmark" },
      { name: "Birla Mandir", location: "Naubath Pahad", type: "Temple" },
      { name: "Laad Bazaar", location: "Charminar", type: "Market" },
      { name: "Nehru Zoological Park", location: "Bahadurpura", type: "Wildlife" },
      { name: "Statue of Equality", location: "Shamshabad", type: "Landmark" },
      { name: "Taj Falaknuma Palace", location: "Falaknuma", type: "Landmark" },
      { name: "Lumbini Park", location: "Lakeside", type: "Garden" },
      { name: "Shilparamam Village", location: "Hitech City", type: "Culture" },
      { name: "Mecca Masjid", location: "Old City", type: "Temple" },
      { name: "Purani Haveli", location: "Old City", type: "Landmark" },
      { name: "Taramati Baradari", location: "Gandipet", type: "Landmark" },
      { name: "KBR National Park", location: "Jubilee Hills", type: "Park" },
      { name: "Wonderla Hyderabad", location: "Kongara Khurd", type: "Activity" },
      { name: "Birla Planetarium", location: "Naubath Pahad", type: "Learning" },
      { name: "Sudha Car Museum", location: "Bahadurpura", type: "Museum" },
      { name: "Nizam's Museum", location: "Purani Haveli", type: "Museum" },
      { name: "Sanjeevaiah Park", location: "Necklace Road", type: "Park" },
      { name: "Public Gardens", location: "Nampally", type: "Garden" },
      { name: "Gandipet Lake", location: "Gandipet", type: "Landmark" },
      { name: "Hitech City Cyber Towers", location: "Madhapur", type: "Landmark" },
      { name: "Paigah Tombs", location: "Pisalgutta", type: "Landmark" },
      { name: "Spanish Mosque", location: "Begumpet", type: "Temple" },
      { name: "Inorbit Mall", location: "Madhapur", type: "Market" },
      { name: "Ikea Hyderabad", location: "Hitech City", type: "Market" },
      { name: "B.M. Birla Science Centre", location: "Naubath Pahad", type: "Museum" },
      { name: "Lamakaan", location: "Banjara Hills", type: "Culture" },
      { name: "Prasads IMAX", location: "Necklace Road", type: "Activity" },
      { name: "Buddha Statue Boating", location: "Hussain Sagar", type: "Activity" },
      { name: "Durgam Cheruvu Bridge", location: "Madhapur", type: "Landmark" },
      { name: "Jubilee Hills Checkpost", location: "Jubilee Hills", type: "Leisure" },
      { name: "Osmania University Bridge", location: "O.U.", type: "Landmark" },
      { name: "Dhola-ri-Dhani", location: "Kompally", type: "Activity" },
      { name: "Mrugavani National Park", location: "Chilkur", type: "Wildlife" },
      { name: "Sanghi Temple", location: "Ramoji City Side", type: "Temple" },
      { name: "Yadagirigutta Temple (near)", location: "Bhongir", type: "Temple" },
      { name: "Keesaragutta Temple", location: "Keesara", type: "Temple" },
      { name: "Medak Cathedral (near)", location: "Medak", type: "Culture" },
      { name: "Surendrapuri Mythology Park", location: "Bhongir", type: "Activity" },
      { name: "Ananthagiri Hills (near)", location: "Vikarabad", type: "Landmark" },
      { name: "Kondapochamma Sagar", location: "Gajwel", type: "Landmark" },
      { name: "Birla Mandir Hill View", location: "Hills", type: "Landmark" },
      { name: "Old City Food Walk", location: "Charminar", type: "Activity" },
      { name: "GVK House of India", location: "Banjara Hills", type: "Market" },
      { name: "Forum Sujana Mall", location: "Kukatpally", type: "Market" }
    ]
  },
  "goa": {
    temples: [
      { name: "Shree Mangeshi", location: "Ponda", history: { dynasty: "Saraswat", year: 1560, builder: "Local Devotees", importance: "Architectural masterpiece with a 7-story lamp tower" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Shree Shantadurga", location: "Kavlem", history: { dynasty: "Marathi", year: 1738, builder: "Naroram Mantri", importance: "Dedicated to the Goddess of Peace" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Mahadev Temple", location: "Tambdi Surla", history: { dynasty: "Kadamba", year: 1200, builder: "Kings of Kadamba", importance: "Oldest surviving stone temple in Goa" }, timings: "7:00 AM – 5:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Shree Mahalasa Narayani", location: "Mardol", history: { dynasty: "Ancient", year: 1567, builder: "Local Merchants", importance: "Famous for its massive brass lamp tower" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Shri Ramnath", location: "Bandivade", history: { dynasty: "Marathi", year: 1500, builder: "Community", importance: "Where Lord Rama stopped for prayer" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Basilica of Bom Jesus", location: "Old Goa", description: "UNESCO site housing the remains of St. Francis Xavier." },
      { name: "Fort Aguada", location: "Candolim", description: "17th-century Portuguese fortress with a stunning lighthouse." },
      { name: "Cabo de Rama Fort", location: "Canacona", description: "Ancient clifftop fort with sweeping views of the Arabian Sea." },
      { name: "Se Cathedral", location: "Old Goa", description: "One of the largest churches in Asia, known for its Golden Bell." },
      { name: "Dudhsagar Waterfalls", location: "Mollem", description: "Majestic four-tiered waterfall accessible via jungle trek." }
    ],
    hotels: [
      { name: "The Hosteller Goa", location: "Anjuna", pricePerNight: 1200, rating: 4.5 },
      { name: "ibis Styles Goa", location: "Calangute", pricePerNight: 3500, rating: 4.2 },
      { name: "Lotus Sutra", location: "Arambol", pricePerNight: 2800, rating: 4.3 },
      { name: "Summerville Beach", location: "Candolim", pricePerNight: 3200, rating: 4.1 },
      { name: "Kings Villa", location: "Palolem", pricePerNight: 1800, rating: 4.3 }
    ],
    restaurants: [
      { name: "Mum’s Kitchen", cuisine: "Goan", location: "Panjim", rating: 4.4 },
      { name: "Thalassa", cuisine: "Greek", location: "Vagator", rating: 4.6 },
      { name: "Brittos", cuisine: "Seafood", location: "Baga", rating: 4.2 },
      { name: "Fishermans Wharf", cuisine: "Riverside", location: "South Goa", rating: 4.5 },
      { name: "Martin’s Corner", cuisine: "Heritage", location: "Betalbatim", rating: 4.7 }
    ],
    places_pool: [
      // ... deep pool same as before ...
      { name: "Baga Beach", location: "North Goa", type: "Beach" },
      { name: "Calangute Beach", location: "North Goa", type: "Beach" },
      { name: "Anjuna Beach Flea Market", location: "North Goa", type: "Market" },
      { name: "Palolem Beach", location: "South Goa", type: "Beach" },
      { name: "Fort Aguada", location: "Candolim", type: "Landmark" },
      { name: "Basilica of Bom Jesus", location: "Old Goa", type: "Landmark" },
      { name: "Dudhsagar Waterfalls", location: "Mollem", type: "Waterfall" },
      { name: "Chapora Fort (Dil Chahta Hai)", location: "Vagator", type: "Landmark" },
      { name: "Fontainhas Latin Quarter", location: "Panjim", type: "Culture" },
      { name: "Vagator Beach Cliffs", location: "North Goa", type: "Beach" },
      { name: "Colva Beach", location: "South Goa", type: "Beach" },
      { name: "Cabo de Rama Fort", location: "Canacona", type: "Landmark" },
      { name: "Dona Paula Viewpoint", location: "Panjim", type: "Landmark" },
      { name: "Mangeshi Temple", location: "Ponda", type: "Temple" },
      { name: "Se Cathedral", location: "Old Goa", type: "Landmark" },
      { name: "Sahakari Spice Plantation", location: "Ponda", type: "Activity" },
      { name: "Butterfly Beach", location: "South Goa", type: "Beach" },
      { name: "Reis Magos Fort", location: "Verem", type: "Landmark" },
      { name: "Casino Pride Goa", location: "Panjim", type: "Activity" },
      { name: "Mollem National Park", location: "Sanguem", type: "Wildlife" },
      { name: "Arambol Beach Lake", location: "North Goa", type: "Beach" },
      { name: "Sinquerim Beach", location: "North Goa", type: "Beach" },
      { name: "Church of St. Augustine", location: "Old Goa", type: "Landmark" },
      { name: "Naval Aviation Museum", location: "Vasco", type: "Museum" },
      { name: "Morjim Turtle Beach", location: "North Goa", type: "Beach" },
      { name: "Ashwem Beach", location: "North Goa", type: "Beach" },
      { name: "Divar Island Ferry", location: "Divar", type: "Activity" },
      { name: "Salim Ali Bird Sanctuary", location: "Chorao", type: "Wildlife" },
      { name: "Panjim Church (Immaculate)", location: "Panjim", type: "Landmark" },
      { name: "Candolim Beach Walk", location: "North Goa", type: "Beach" },
      { name: "Mandovi River Cruise", location: "Panjim", type: "Activity" },
      { name: "Old Goa Heritage Walk", location: "Old Goa", type: "Culture" },
      { name: "Grand Island Boat Trip", location: "High Seas", type: "Activity" },
      { name: "Vasco da Gama Port", location: "Vasco", type: "Landmark" },
      { name: "Santa Monica Jetty", location: "Panjim", type: "Landmark" },
      { name: "Miramar Beach", location: "Panjim", type: "Beach" },
      { name: "Agonda Beach", location: "South Goa", type: "Beach" },
      { name: "Majorda Beach", location: "South Goa", type: "Beach" },
      { name: "Cavelossim Beach", location: "South Goa", type: "Beach" },
      { name: "Mobor Beach", location: "South Goa", type: "Beach" },
      { name: "Salaulim Dam", location: "Sanguem", type: "Landmark" },
      { name: "Netravali Wildlife", location: "Sanguem", type: "Wildlife" },
      { name: "Bhagwan Mahavir Sanctuary", location: "Mollem", type: "Wildlife" },
      { name: "Corjuem Fort", location: "Aldona", type: "Landmark" }
    ]
  },
  "kerala": {
    temples: [
      { name: "Sree Padmanabhaswamy", location: "Trivandrum", history: { dynasty: "Travancore", year: 1750, builder: "Marthanda Varma", importance: "Richest temple in the world with gold vaults" }, timings: "3:30 AM – 7:20 PM", entryFee: "Free", rating: 4.9 },
      { name: "Guruvayur Krishna", location: "Thrissur", history: { dynasty: "Ancient", year: 1000, builder: "Local Kings", importance: "Vishwa Krishna temple of great power" }, timings: "3:00 AM – 9:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Vadakkumnathan Temple", location: "Thrissur", history: { dynasty: "Ancient", year: 800, builder: "Adi Shankara", importance: "UNESCO recognized classic Kerala architecture" }, timings: "4:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sabarimala Sastha", location: "Pathanamthitta", history: { dynasty: "Ancient", year: 1200, builder: "Kings of Pandalam", importance: "One of the largest pilgrimage centers in the world" }, timings: "Varies", entryFee: "Free", rating: 4.9 },
      { name: "Thirunelli Temple", location: "Wayanad", history: { dynasty: "Puranic", year: 1000, builder: "Lord Brahma", importance: "Known as the 'Kashi of the South'" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Alleppey Backwaters", location: "Alappuzha", description: "Iconic houseboat cruises through palm-fringed lagoons." },
      { name: "Munnar Tea Estates", location: "Munnar", description: "Endless rolling hills covered in mist and tea plantations." },
      { name: "Bekal Fort", location: "Kasaragod", description: "Massive clifftop sea-fort with stunning sunset views." },
      { name: "Mattancherry Palace", location: "Fort Kochi", description: "Royal palace featuring world-famous Hindu temple murals." },
      { name: "Athirappilly Waterfalls", location: "Chalakudy", description: "Magnificent waterfall often called the 'Niagara of India'." }
    ],
    hotels: [
      { name: "The Hosteller Munnar", location: "Munnar", pricePerNight: 1000, rating: 4.5 },
      { name: "Casa Feliz B&B", location: "Fort Kochi", pricePerNight: 2200, rating: 4.6 },
      { name: "Woodland Vista", location: "Thekkady", pricePerNight: 2800, rating: 4.2 },
      { name: "Alleppey Prince", location: "Alappuzha", pricePerNight: 3500, rating: 4.1 },
      { name: "Drizzle Valley Cottage", location: "Munnar", pricePerNight: 2000, rating: 4.2 }
    ],
    restaurants: [
      { name: "Kashi Art Cafe", cuisine: "Continental", location: "Fort Kochi", rating: 4.6 },
      { name: "Fusion Bay", cuisine: "Seafood", location: "Fort Kochi", rating: 4.5 },
      { name: "Dal Roti", cuisine: "North Indian", location: "Fort Kochi", rating: 4.4 },
      { name: "Villa Maya", cuisine: "Traditional", location: "Trivandrum", rating: 4.7 },
      { name: "Oceanos Restaurant", cuisine: "Seafood", location: "Fort Kochi", rating: 4.5 }
    ],
    places_pool: [
      // ... same pool ...
      { name: "Munnar Tea Plantations", location: "Munnar", type: "Landmark" },
      { name: "Alleppey Houseboat Cruise", location: "Alappuzha", type: "Activity" },
      { name: "Fort Kochi Chinese Nets", location: "Kochi", type: "Culture" },
      { name: "Edakkal Caves", location: "Wayanad", type: "Landmark" },
      { name: "Periyar Wildlife Sanctuary", location: "Thekkady", type: "Wildlife" },
      { name: "Kovalam Lighthouse Beach", location: "Kovalam", type: "Beach" },
      { name: "Kumarakom Bird Sanctuary", location: "Kumarakom", type: "Wildlife" },
      { name: "Varkala Cliff Beach", location: "Varkala", type: "Beach" },
      { name: "Vagamon Meadows", location: "Idukki", type: "Landmark" },
      { name: "Bekal Fort", location: "Kasaragod", type: "Landmark" },
      { name: "Athirapally Waterfalls", location: "Thrissur", type: "Waterfall" },
      { name: "Vadakkunnathan Temple", location: "Thrissur", type: "Temple" },
      { name: "Poovar Island Resort Area", location: "Trivandrum", type: "Landmark" },
      { name: "Ashtamudi Lake", location: "Kollam", type: "Landmark" },
      { name: "Kappad Beach", location: "Kozhikode", type: "Beach" },
      { name: "Idukki Arch Dam", location: "Idukki", type: "Landmark" },
      { name: "Guruvayur Krishna Temple", location: "Thrissur", type: "Temple" },
      { name: "Mattupetty Dam", location: "Munnar", type: "Landmark" },
      { name: "Eravikulam National Park", location: "Munnar", type: "Wildlife" },
      { name: "Silent Valley National Park", location: "Palakkad", type: "Wildlife" },
      { name: "Cherai Beach", location: "Kochi", type: "Beach" },
      { name: "Pardesi Synagogue", location: "Kochi", type: "Culture" },
      { name: "Bolgatty Palace", location: "Kochi", type: "Landmark" },
      { name: "Attukal Bhagavathy", location: "Trivandrum", type: "Temple" },
      { name: "Napier Museum", location: "Trivandrum", type: "Museum" },
      { name: "Kerala Folklore Museum", location: "Kochi", type: "Museum" },
      { name: "Muzhappilangad Drive-in Beach", location: "Kannur", type: "Beach" },
      { name: "Meenmutty Waterfalls", location: "Wayanad", type: "Waterfall" },
      { name: "Banasura Sagar Dam", location: "Wayanad", type: "Landmark" },
      { name: "Pookode Lake", location: "Wayanad", type: "Landmark" },
      { name: "St. Angelo Fort", location: "Kannur", type: "Landmark" },
      { name: "Kodanad Elephant Training", location: "Kochi Outskirts", type: "Activity" },
      { name: "Thattekad Bird Sanctuary", location: "Kochi Outskirts", type: "Wildlife" },
      { name: "Hill Palace Museum", location: "Thripunithura", type: "Museum" },
      { name: "Lighthouse Beach Varkala", location: "Varkala", type: "Beach" },
      { name: "Shankumugham Beach", location: "Trivandrum", type: "Beach" },
      { name: "Kottayam Rubber Plantations", location: "Kottayam", type: "Landmark" },
      { name: "Marari Beach", location: "Alleppey", type: "Beach" },
      { name: "Pathiramanal Island", location: "Vembanad Lake", type: "Wildlife" },
      { name: "Kuttanad Backwaters", location: "Alleppey", type: "Landmark" },
      { name: "Neyyar Dam & Safari", location: "Trivandrum", type: "Wildlife" },
      { name: "Ponmudi Hill Station", location: "Trivandrum Outskirts", type: "Landmark" },
      { name: "Chaliyar River Walk", location: "Nilambur", type: "Leisure" },
      { name: "Aruvikkara Dam", location: "Trivandrum", type: "Landmark" }
    ]
  },
  "bangalore": {
    temples: [
      { name: "Bull Temple", location: "Basavanagudi", history: { dynasty: "Vijayanagara", year: 1537, builder: "Kempe Gowda I", importance: "Features a massive 4.5m monolithic Nandi statue" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Gavi Gangadhareshwara", location: "Gavipuram", history: { dynasty: "Gowda", year: 1550, builder: "Kempe Gowda", importance: "Ancient cave temple where sun rays hit the idol twice a year" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Someshwara Temple", location: "Ulsoor", history: { dynasty: "Chola/Vijayanagara", year: 1200, builder: "Unknown", importance: "Classic hybrid architecture with intricate gopurams" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kote Venkataramana", location: "Chamarajpet", history: { dynasty: "Wodeyar", year: 1689, builder: "Chikka Devaraja", importance: "Historic 17th-century royal temple near Tipu's palace" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Chokkanathaswamy", location: "Domlur", history: { dynasty: "Chola", year: 1000, builder: "Kings of Chola", importance: "One of the oldest temples in Bangalore" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Vidhana Soudha", location: "Central", description: "Grand seat of the state legislature, known for its Neo-Dravidian architecture." },
      { name: "Bangalore Palace", location: "Palace Road", description: "Royal palace inspired by Windsor Castle with Tudor-style towers." },
      { name: "Lalbagh Botanical Garden", location: "South Bangalore", description: "Colonial-era garden featuring a magnificent 19th-century glass house." },
      { name: "Cubbon Park", location: "Central District", description: "A vast green oasis housing the High Court and State Central Library." },
      { name: "Tipu Sultan's Summer Palace", location: "Chamarajpet", description: "Ornate wooden palace that served as the summer home of the ruler." }
    ],
    hotels: [
      { name: "The Hosteller Bangalore", location: "Indiranagar", pricePerNight: 1200, rating: 4.5 },
      { name: "Castle Dollars", location: "Koramangala", pricePerNight: 2800, rating: 4.2 },
      { name: "LUHO Grande", location: "BTM Layout", pricePerNight: 3500, rating: 4.4 },
      { name: "Sterling Residency", location: "Hebbal", pricePerNight: 3200, rating: 4.1 },
      { name: "Bloom Hotel", location: "Richmond Road", pricePerNight: 3500, rating: 4.4 }
    ],
    restaurants: [
      { name: "MTR Lalbagh", cuisine: "Heritage South Indian", location: "Lalbagh Road", rating: 4.6 },
      { name: "Vidyarthi Bhavan", cuisine: "Dosa", location: "Basavanagudi", rating: 4.7 },
      { name: "CTR", cuisine: "Butter Dosa", location: "Malleshwaram", rating: 4.8 },
      { name: "Koshy’s", cuisine: "Multi", location: "St Marks Road", rating: 4.4 },
      { name: "Bob's Bar", cuisine: "Pub", location: "Indiranagar", rating: 4.4 }
    ],
    places_pool: [
      { name: "Lalbagh Flower Show", location: "South Bangalore", type: "Garden" },
      { name: "Cubbon Park Library", location: "Central", type: "Park" },
      { name: "Bangalore Palace", location: "North Bangalore", type: "Landmark" },
      { name: "Bannerghatta Safari", location: "Outskirts", type: "Wildlife" },
      { name: "Vidhana Soudha (Night view)", location: "Central", type: "Landmark" },
      { name: "Visvesvaraya Science Museum", location: "Kasturba Road", type: "Museum" },
      { name: "Commercial Street Shopping", location: "Shivajinagar", type: "Market" },
      { name: "HAL Aerospace Museum", location: "Old Airport Road", type: "Museum" },
      { name: "VV Puram Food Street", location: "Basavanagudi", type: "Market" },
      { name: "Nandi Hills Sunrise", location: "Outskirts", type: "Landmark" },
      { name: "Bull Temple", location: "Basavanagudi", type: "Temple" },
      { name: "Ulsoor Lake Boating", location: "Halasuru", type: "Landmark" },
      { name: "Innovative Film City", location: "Bidadi", type: "Activity" },
      { name: "Wonderla Bangalore", location: "Mysore Road", type: "Activity" },
      { name: "Iskcon Temple", location: "Rajajinagar", type: "Temple" },
      { name: "Tipu Sultan's Palace", location: "Chamarajpet", type: "Landmark" }
    ]
  },
  "pune": {
    temples: [
      { name: "Dagadusheth Halwai Ganapati", location: "Budhwar Peth", history: { dynasty: "Modern", year: 1893, builder: "Dagadusheth Halwai", importance: "One of the most popular Ganesh temples in India" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Shaniwar Wada", location: "Shaniwar Peth", description: "18th-century fortification in the city of Pune." },
      { name: "Aga Khan Palace", location: "Yerwada", description: "Historic building that served as a prison for Mahatma Gandhi." },
      { name: "Sinhagad Fort", location: "Thoptewadi", description: "Ancient hill fortress located about 30 km southwest of the city of Pune." }
    ],
    hotels: [
      { name: "The Ritz-Carlton", location: "Yerwada", pricePerNight: 18000, rating: 4.9 },
      { name: "Conrad Pune", location: "Mangaldas Road", pricePerNight: 12000, rating: 4.7 }
    ],
    restaurants: [
      { name: "Vaishali", cuisine: "South Indian", location: "FC Road", rating: 4.5 },
      { name: "Kayani Bakery", cuisine: "Irani", location: "Camp", rating: 4.6 }
    ],
    places_pool: [
      { name: "Shaniwar Wada", location: "Pune", type: "Landmark" },
      { name: "Aga Khan Palace", location: "Pune", type: "Landmark" },
      { name: "Sinhagad Fort", location: "Pune", type: "Landmark" },
      { name: "Dagadusheth Ganpati", location: "Pune", type: "Temple" },
      { name: "Pataleshwar Cave Temple", location: "Pune", type: "Temple" },
      { name: "Osho International Meditation Resort", location: "Koregaon Park", type: "Activity" },
      { name: "Raja Dinkar Kelkar Museum", location: "Pune", type: "Museum" },
      { name: "Saras Baug", location: "Pune", type: "Garden" },
      { name: "Parvati Hill", location: "Pune", type: "Landmark" },
      { name: "Mulshi Dam", location: "Pune Outskirts", type: "Landmark" },
      { name: "National Defence Academy", location: "Khadakwasla", type: "Learning" },
      { name: "Lonavala (Day Trip)", location: "Pune Outskirts", type: "Landmark" },
      { name: "Pune Okayama Friendship Garden", location: "Pune", type: "Garden" }
    ]
  },
  "ahmedabad": {
    temples: [
      { name: "Akshardham Temple", location: "Gandhinagar", history: { dynasty: "Modern", year: 1992, builder: "BAPS", importance: "Stunning cultural complex and temple" }, timings: "9:30 AM – 7:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Hutheesing Jain Temple", location: "Bardolpura", history: { dynasty: "Modern", year: 1848, builder: "Seth Hutheesing", importance: "Known for its extremely intricate stone carvings" }, timings: "8:00 AM – 5:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Sabarmati Ashram", location: "Sabarmati", description: "Gandhi's residence and base for the Indian independence movement." },
      { name: "Adalaj Stepwell", location: "Adalaj", description: "Breathtaking five-story deep stepwell with intricate carvings." },
      { name: "Kankaria Lake", location: "Maninagar", description: "Second largest lake in Ahmedabad with a zoo and water front." }
    ],
    hotels: [
      { name: "Hyatt Regency", location: "Ashram Road", pricePerNight: 8500, rating: 4.5 },
      { name: "The House of MG", location: "Lal Darwaja", pricePerNight: 7500, rating: 4.7 }
    ],
    restaurants: [
      { name: "Agashiye", cuisine: "Gujarati Thali", location: "Lal Darwaja", rating: 4.6 },
      { name: "Manek Chowk Street Food", cuisine: "Street Food", location: "Old City", rating: 4.5 }
    ],
    places_pool: [
      { name: "Sabarmati Ashram", location: "Ahmedabad", type: "Landmark" },
      { name: "Adalaj Stepwell", location: "Ahmedabad", type: "Landmark" },
      { name: "Kankaria Lake", location: "Ahmedabad", type: "Landmark" },
      { name: "Sidi Saiyyed Mosque", location: "Ahmedabad", type: "Temple" },
      { name: "Jama Masjid", location: "Ahmedabad", type: "Temple" },
      { name: "Calico Museum of Textiles", location: "Ahmedabad", type: "Museum" },
      { name: "Science City", location: "Ahmedabad", type: "Learning" },
      { name: "Riverfront Park", location: "Sabarmati Riverfront", type: "Park" },
      { name: "Law Garden Night Market", location: "Ahmedabad", type: "Market" },
      { name: "Auto World Vintage Car Museum", location: "Ahmedabad", type: "Museum" },
      { name: "Modhera Sun Temple (Trip)", location: "Mehsana", type: "Temple" },
      { name: "Rani no Hajiro", location: "Ahmedabad", type: "Landmark" }
    ]
  },
  "udaipur": {
    temples: [
      { name: "Jagdish Temple", location: "City Palace Complex", history: { dynasty: "Mewar", year: 1651, builder: "Maharana Jagat Singh", importance: "Stunning Indo-Aryan architectural marvel" }, timings: "4:30 AM – 1:00 PM, 5:00 PM – 11:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "City Palace", location: "Lake Pichola", description: "Complex of palaces built over nearly 400 years by the Mewar dynasty." },
      { name: "Lake Pichola", location: "Udaipur", description: "Artificial freshwater lake created in the year 1362 AD." },
      { name: "Saheliyon-ki-Bari", location: "Fatehpura", description: "Ornate 18th-century garden with fountains and marble elephants." }
    ],
    hotels: [
      { name: "Taj Lake Palace", location: "Lake Pichola", pricePerNight: 55000, rating: 4.9 },
      { name: "The Oberoi Udaivilas", location: "Lake Pichola", pricePerNight: 48000, rating: 4.9 }
    ],
    restaurants: [
      { name: "Ambrai", cuisine: "Rajasthani", location: "Amet Haveli", rating: 4.6 },
      { name: "Upre by 15AD", cuisine: "International", location: "Lake View", rating: 4.5 }
    ],
    places_pool: [
      { name: "City Palace", location: "Udaipur", type: "Landmark" },
      { name: "Lake Pichola Boating", location: "Udaipur", type: "Activity" },
      { name: "Jag Mandir", location: "Lake Pichola", type: "Landmark" },
      { name: "Saheliyon-ki-Bari", location: "Udaipur", type: "Garden" },
      { name: "Jagdish Temple", location: "Udaipur", type: "Temple" },
      { name: "Fateh Sagar Lake", location: "Udaipur", type: "Landmark" },
      { name: "Monsoon Palace (Sajjangarh)", location: "Udaipur", type: "Landmark" },
      { name: "Vintage Car Museum", location: "Udaipur", type: "Museum" },
      { name: "Shilpgram", location: "Udaipur", type: "Culture" },
      { name: "Bagore Ki Haveli", location: "Udaipur", type: "Landmark" },
      { name: "Eklingji Temple (Trip)", location: "Udaipur Outskirts", type: "Temple" },
      { name: "Kumbhalgarh Fort (Day Trip)", location: "Rajsamand", type: "Landmark" }
    ]
  },
  "jodhpur": {
    temples: [
      { name: "Chamunda Mata Temple", location: "Mehrangarh Fort", history: { dynasty: "Rathore", year: 1460, builder: "Rao Jodha", importance: "Guardian deity of the royal family" }, timings: "5:00 AM – 12:00 PM, 4:00 PM – 9:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Mehrangarh Fort", location: "Jodhpur", description: "One of the largest forts in India, built around 1459 by Rao Jodha." },
      { name: "Umaid Bhawan Palace", location: "Jodhpur", description: "One of the world's largest private residences, partly a hotel and museum." },
      { name: "Jaswant Thada", location: "Mehrangarh", description: "Cenotaph built by Maharaja Sardar Singh in memory of his father." }
    ],
    hotels: [
      { name: "Taj Hari Mahal", location: "Residency Road", pricePerNight: 12000, rating: 4.7 },
      { name: "Indana Palace", location: "Shikargarh", pricePerNight: 8500, rating: 4.5 }
    ],
    restaurants: [
      { name: "Hanwant Mahal", cuisine: "Royal Rajasthani", location: "Jodhpur", rating: 4.4 },
      { name: "Gypsy Dining Hall", cuisine: "Thali", location: "Sardarpura", rating: 4.6 }
    ],
    places_pool: [
      { name: "Mehrangarh Fort", location: "Jodhpur", type: "Landmark" },
      { name: "Jaswant Thada", location: "Jodhpur", type: "Landmark" },
      { name: "Umaid Bhawan Palace", location: "Jodhpur", type: "Landmark" },
      { name: "Mandore Gardens", location: "Jodhpur", type: "Garden" },
      { name: "Clock Tower (Ghanta Ghar)", location: "Jodhpur", type: "Landmark" },
      { name: "Sardar Market", location: "Jodhpur", type: "Market" },
      { name: "Rao Jodha Desert Rock Park", location: "Jodhpur", type: "Park" },
      { name: "Toorji Ka Jhalra Bavdi", location: "Jodhpur", type: "Landmark" },
      { name: "Kaylana Lake", location: "Jodhpur", type: "Landmark" },
      { name: "Bishnoi Village Safari", location: "Jodhpur Outskirts", type: "Activity" },
      { name: "Flying Fox Zipline", location: "Mehrangarh Fort", type: "Activity" },
      { name: "Osian Desert (Trip)", location: "Jodhpur Outskirts", type: "Activity" }
    ]
  },
  "indore": {
    temples: [
      { name: "Khajrana Ganesh", location: "Khajrana", history: { dynasty: "Holkar", year: 1735, builder: "Ahilyabai Holkar", importance: "Considered to be a wish-fulfilling temple" }, timings: "5:00 AM – 11:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Kanch Mandir", location: "Itwaria Bazar", history: { dynasty: "Modern", year: 1903, builder: "Seth Hukumchand", importance: "Jain temple made entirely of glass and mirrors" }, timings: "5:00 AM – 12:00 PM, 4:00 PM – 8:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Rajwada Palace", location: "Old City", description: "Historical seven-story palace of the Holkars, blending Maratha and Mughal styles." },
      { name: "Lal Bagh Palace", location: "Indore", description: "Grand 19th-century palace reflecting the opulent lifestyle of the Holkar rulers." },
      { name: "Sarafa Bazar Night Food Market", location: "Indore", description: "Famous jewelry market that transforms into a street food paradise at night." }
    ],
    hotels: [
      { name: "Sayaji Hotel", location: "Vijay Nagar", pricePerNight: 6500, rating: 4.6 },
      { name: "Indore Marriott", location: "Vijay Nagar", pricePerNight: 7500, rating: 4.7 }
    ],
    restaurants: [
      { name: "Chappan Dukan", cuisine: "Street Food", location: "New Palasia", rating: 4.8 },
      { name: "The Creative Kitchen", cuisine: "Buffet", location: "Sayaji Hotel", rating: 4.5 }
    ],
    places_pool: [
      { name: "Rajwada", location: "Indore", type: "Landmark" },
      { name: "Lal Bagh Palace", location: "Indore", type: "Landmark" },
      { name: "Khajrana Ganesh Temple", location: "Indore", type: "Temple" },
      { name: "Kanch Mandir", location: "Indore", type: "Temple" },
      { name: "Sarafa Night Food Market", location: "Indore", type: "Market" },
      { name: "Chappan Dukan", location: "Indore", type: "Market" },
      { name: "Central Museum", location: "Indore", type: "Museum" },
      { name: "Krishnapura Chhatris", location: "Indore", type: "Landmark" },
      { name: "Patalpani Waterfall (Trip)", location: "Indore Outskirts", type: "Waterfall" },
      { name: "Ralamandal Wildlife Sanctuary", location: "Indore Outskirts", type: "Wildlife" },
      { name: "Annapurna Temple", location: "Indore", type: "Temple" },
      { name: "Omkareshwar (Day Trip)", location: "Mandhata", type: "Temple" },
      { name: "Maheshwar (Day Trip)", location: "Maheshwar", type: "Heritage" }
    ]
  },
  "varanasi": {
    temples: [
      { name: "Kashi Vishwanath", location: "Main City", history: { dynasty: "Holkar", year: 1780, builder: "Ahilyabai", importance: "Center of the world's oldest living city" }, timings: "3:00 AM – 11:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Sankat Mochan Hanuman", location: "Near BHU", history: { dynasty: "Spiritual", year: 1530, builder: "Tulsidas", importance: "Sacred temple where Hanuman was spotted" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kaal Bhairav", location: "Visheshwarganj", history: { dynasty: "Ancient", year: 1000, builder: "Adi Shankara", importance: "Dedicated to the 'Kotwal' or guardian of Kashi" }, timings: "5:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Durga Mandir", location: "Durga Kund", history: { dynasty: "Maratha", year: 1700, builder: "Local Queen", importance: "Famous for its red sandstone architecture and tank" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Annapurna Devi", location: "Near Vishwanath", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Where Goddess Parvati serves food to Lord Shiva" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Dashashwamedh Ghat", location: "River Side", description: "The heart of Varanasi, famous for its spectacular Evening Aarti." },
      { name: "Assi Ghat", location: "South Varanasi", description: "Peaceful riverfront known for Sunrise Yoga and Subah-e-Banaras." },
      { name: "Ramnagar Fort", location: "East Bank", description: "18th-century red sandstone palace housing royal treasures." },
      { name: "Sarnath", location: "Outskirts", description: "Sacred deer park where Buddha delivered his first sermon." },
      { name: "Kashi Vishwanath Corridor", location: "Temple Area", description: "Grand modern development connecting the river to the sacred shrine." }
    ],
    hotels: [
      { name: "Stay Banaras", location: "Cantonment", pricePerNight: 2300, rating: 4.6 },
      { name: "Hotel Alka", location: "Meer Ghat", pricePerNight: 2800, rating: 4.4 },
      { name: "Live Free Hostel", location: "Assi Ghat", pricePerNight: 700, rating: 4.3 },
      { name: "Hotel Temple View", location: "Old Varanasi", pricePerNight: 1500, rating: 4.1 },
      { name: "Hidden Monkey Hostel", location: "Assi Ghat", pricePerNight: 600, rating: 4.3 }
    ],
    restaurants: [
      { name: "Kashi Chat Bhandar", cuisine: "Chat", location: "Varanasi", rating: 4.5 },
      { name: "Deena Chat Bhandar", cuisine: "Chat", location: "Varanasi", rating: 4.4 },
      { name: "Blue Lassi Shop", cuisine: "Lassi", location: "Varanasi", rating: 4.6 },
      { name: "Pizzeria Vaatika", cuisine: "Pizza", location: "Varanasi", rating: 4.7 },
      { name: "Brown Bread Bakery", cuisine: "European", location: "Varanasi", rating: 4.5 }
    ],
    places_pool: [
        { name: "Dashashwamedh Ghat Aarti", location: "Varanasi", type: "Culture" },
        { name: "Kashi Vishwanath Temple", location: "Varanasi", type: "Temple" },
        { name: "Sarnath Deer Park", location: "Varanasi", type: "Landmark" },
        { name: "Assi Ghat Sunrise", location: "Varanasi", type: "Culture" },
        { name: "Manikarnika Ghat (Respectfully)", location: "Varanasi", type: "Culture" },
        { name: "Banaras Hindu University", location: "Varanasi", type: "Learning" },
        { name: "Ramnagar Fort", location: "Varanasi", type: "Landmark" },
        { name: "Chunar Fort", location: "Varanasi", type: "Landmark" },
        { name: "Dhamek Stupa", location: "Sarnath", type: "Landmark" },
        { name: "Bharat Kala Bhavan", location: "BHU", type: "Museum" },
        { name: "Varanasi Silk Weaving", location: "Old City", type: "Market" },
        { name: "Ganga Boat Ride", location: "Ganges", type: "Activity" }
    ]
  },
  "hampi": {
    temples: [
      { name: "Virupaksha Temple", location: "Hampi Bazaar", history: { dynasty: "Vijayanagara", year: 1336, builder: "Lakkana Dandesha", importance: "UNESCO site and one of the oldest functioning temples" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Vijaya Vittala", location: "Stone Chariot Area", history: { dynasty: "Vijayanagara", year: 1513, builder: "Krishnadevaraya", importance: "Home of the iconic stone chariot and musical pillars" }, timings: "8:00 AM – 5:00 PM", entryFee: "Paid", rating: 4.9 },
      { name: "Hazara Rama Temple", location: "Royal Enclosure", history: { dynasty: "Vijayanagara", year: 1500, builder: "Devaraya I", importance: "Known for elaborate carvings depicting the Ramayana" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Achyutaraya Temple", location: "Sule Bazaar", history: { dynasty: "Vijayanagara", year: 1534, builder: "Achyutadeva Raya", importance: "Unique temple nested between hills and a plaza" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Krishna Temple", location: "West Hampi", history: { dynasty: "Vijayanagara", year: 1513, builder: "Krishnadevaraya", importance: "Built to celebrate the conquest of Utkala" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Vijaya Vittala Stone Chariot", location: "Temple Complex", description: "Iconic stone-carved chariot representing the pinnacle of Vijayanagara art." },
      { name: "Lotus Palace", location: "Zenana Enclosure", description: "Exquisite two-story structure blending Hindu and Islamic architecture." },
      { name: "Mahanavami Dibba", location: "Royal Area", description: "Massive ancient platform once used for grand royal celebrations." },
      { name: "Elephant Stables", location: "Zenana Enclosure", description: "Stunning dome-roofed building designed to house royal elephants." },
      { name: "Hemakuta Hill", location: "Near Virupaksha", description: "Scenic hilltop offering spectacular sunset views over the ruins." }
    ],
    hotels: [
      { name: "Prajwal Homestay", location: "Hampi Bazaar", pricePerNight: 1000, rating: 4.4 },
      { name: "Shankar Homestay", location: "Hampi Bazaar", pricePerNight: 1200, rating: 4.5 },
      { name: "Nargila Guest House", location: "Hippie Island", pricePerNight: 1500, rating: 4.1 },
      { name: "Sunrise Guest House", location: "Anegundi", pricePerNight: 900, rating: 4.2 },
      { name: "Gopi Guest House", location: "Hampi Bazaar", pricePerNight: 1500, rating: 4.1 }
    ],
    restaurants: [
      { name: "Mango Tree Restaurant", cuisine: "International Veg", location: "Hampi Bazaar", rating: 4.6 },
      { name: "The Hampi Cafe", cuisine: "Traditional Tiffins", location: "Main Road", rating: 4.5 },
      { name: "Tutti Cafe", cuisine: "Middle Eastern/Israeli", location: "Across River", rating: 4.4 },
      { name: "Sagar Restaurant", cuisine: "South Indian Thali", location: "Hampi Bazaar", rating: 4.3 },
      { name: "Aunty Hotel", cuisine: "Local/Homely", location: "Anegundi", rating: 4.7 }
    ],
    places_pool: [
        { name: "Virupaksha Temple", location: "Hampi", type: "Temple" },
        { name: "Stone Chariot", location: "Vittala Temple", type: "Landmark" },
        { name: "Matanga Hill Trek", location: "Hampi", type: "Activity" },
        { name: "Sanapur Lake Coracle Ride", location: "Hippie Island", type: "Activity" },
        { name: "Lotus Mahal", location: "Zenana Enclosure", type: "Landmark" },
        { name: "Elephant Stables", location: "Zenana Enclosure", type: "Landmark" },
        { name: "Mahanavami Dibba", location: "Royal Enclosure", type: "Landmark" },
        { name: "Stepped Tank", location: "Royal Enclosure", type: "Landmark" },
        { name: "Tungabhadra River Crossing", location: "Hampi", type: "Activity" },
        { name: "Hemakuta Hill Sunset", location: "Hampi", type: "Landmark" },
        { name: "Anegundi Village Tour", location: "Anegundi", type: "Culture" },
        { name: "Queen's Bath", location: "Hampi", type: "Landmark" },
        { name: "Sasivekalu Ganesha", location: "Hampi", type: "Temple" },
        { name: "Badavi Linga", location: "Hampi", type: "Temple" },
        { name: "Ugra Narasimha Statue", location: "Hampi", type: "Landmark" }
    ]
  },
  "delhi": {
    temples: [
      { name: "Lotus Temple", location: "Kalkaji", history: { dynasty: "Modern", year: 1986, builder: "Fariborz Sahba", importance: "Bahá'í House of Worship known for its flowerlike shape" }, timings: "9:00 AM – 5:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Akshardham Temple", location: "Noida Mor", history: { dynasty: "Modern", year: 2005, builder: "BAPS", importance: "World's largest comprehensive Hindu temple complex" }, timings: "10:00 AM – 6:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Swaminarayan Akshardham", location: "Laxmi Nagar", history: { dynasty: "Modern", year: 2005, builder: "BAPS", importance: "Stunning pink sandstone and marble architecture" }, timings: "10:30 AM – 6:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Red Fort", location: "Chandni Chowk", description: "Iconic red sandstone fort that was the main residence of Mughal Emperors." },
      { name: "Qutub Minar", location: "Mehrauli", description: "A 73-metre tall minaret that forms part of the Qutb complex, a UNESCO site." },
      { name: "India Gate", location: "Rajpath", description: "Warm memorial dedicated to soldiers of the British Indian Army who died in WWI." }
    ],
    hotels: [
      { name: "The Lalit New Delhi", location: "Connaught Place", pricePerNight: 8500, rating: 4.4 },
      { name: "Radisson Blu", location: "Paschim Vihar", pricePerNight: 5200, rating: 4.3 },
      { name: "Bloomrooms", location: "Janpath", pricePerNight: 3500, rating: 4.5 }
    ],
    restaurants: [
      { name: "Karim's", cuisine: "Mughlai", location: "Jama Masjid", rating: 4.4 },
      { name: "Bukhara", cuisine: "North Indian", location: "ITC Maurya", rating: 4.8 },
      { name: "Indian Accent", cuisine: "Fusion", location: "Lodhi Road", rating: 4.7 }
    ],
    places_pool: [
      { name: "Red Fort", location: "Old Delhi", type: "Landmark" },
      { name: "Qutub Minar", location: "South Delhi", type: "Landmark" },
      { name: "Humayun's Tomb", location: "Nizamuddin", type: "Landmark" },
      { name: "India Gate", location: "Central Delhi", type: "Landmark" },
      { name: "Lotus Temple", location: "South Delhi", type: "Temple" },
      { name: "Akshardham Temple", location: "East Delhi", type: "Temple" },
      { name: "Jama Masjid", location: "Old Delhi", type: "Temple" },
      { name: "Chandni Chowk Market", location: "Old Delhi", type: "Market" },
      { name: "Rashtrapati Bhavan", location: "Central Delhi", type: "Landmark" },
      { name: "Lodhi Gardens", location: "Lodhi Road", type: "Park" },
      { name: "National Museum", location: "Janpath", type: "Museum" },
      { name: "Gurudwara Bangla Sahib", location: "Connaught Place", type: "Temple" },
      { name: "Dilli Haat", location: "INA", type: "Market" },
      { name: "Hauz Khas Village", location: "South Delhi", type: "Culture" },
      { name: "Connaught Place", location: "Central Delhi", type: "Market" }
    ]
  },
  "jaipur": {
    temples: [
      { name: "Govind Dev Ji Temple", location: "City Palace", history: { dynasty: "Kachwaha", year: 1735, builder: "Maharaja Sawai Jai Singh II", importance: "Dedicated to Lord Krishna, central to Jaipur's culture" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Birla Mandir", location: "Tilak Nagar", history: { dynasty: "Modern", year: 1988, builder: "B.M. Birla Foundation", importance: "Exquisite white marble temple dedicated to Lakshmi Narayan" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Hawa Mahal", location: "Badi Chaupar", description: "The 'Palace of Winds', a stunning five-story honeycomb structure." },
      { name: "Amer Fort", location: "Amer", description: "Magnificent hilltop fort known for its artistic Hindu style elements." },
      { name: "City Palace", location: "Old City", description: "Royal residence and museum showcasing Rajasthani and Mughal architecture." }
    ],
    hotels: [
      { name: "ITC Rajputana", location: "Gopalbari", pricePerNight: 7500, rating: 4.5 },
      { name: "Zostel Jaipur", location: "Hawa Mahal Rd", pricePerNight: 800, rating: 4.6 },
      { name: "Pearl Palace", location: "Ajmer Road", pricePerNight: 2200, rating: 4.4 }
    ],
    restaurants: [
      { name: "Rawat Mishtan Bhandar", cuisine: "Rajasthani", location: "Sindhi Camp", rating: 4.4 },
      { name: "Chokhi Dhani", cuisine: "Traditional", location: "Tonk Road", rating: 4.5 },
      { name: "Tapri Central", cuisine: "Cafe", location: "C-Scheme", rating: 4.7 }
    ],
    places_pool: [
      { name: "Hawa Mahal", location: "Jaipur", type: "Landmark" },
      { name: "Amer Fort", location: "Jaipur", type: "Landmark" },
      { name: "City Palace", location: "Jaipur", type: "Landmark" },
      { name: "Jantar Mantar", location: "Jaipur", type: "Landmark" },
      { name: "Nahargarh Fort", location: "Jaipur", type: "Landmark" },
      { name: "Jaigarh Fort", location: "Jaipur", type: "Landmark" },
      { name: "Birla Mandir", location: "Jaipur", type: "Temple" },
      { name: "Albert Hall Museum", location: "Jaipur", type: "Museum" },
      { name: "Johari Bazar", location: "Jaipur", type: "Market" },
      { name: "Bapu Bazar", location: "Jaipur", type: "Market" },
      { name: "Galta Ji (Monkey Temple)", location: "Jaipur", type: "Temple" },
      { name: "Jal Mahal", location: "Jaipur", type: "Landmark" },
      { name: "Patrika Gate", location: "Jaipur", type: "Landmark" },
      { name: "Panna Meena ka Kund", location: "Jaipur", type: "Landmark" },
      { name: "Chokhi Dhani", location: "Jaipur Outskirts", type: "Culture" }
    ]
  },
  "agra": {
    temples: [
      { name: "Mankameshwar Temple", location: "Rawatpara", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Dedicated to Lord Shiva, one of the oldest in Agra" }, timings: "5:00 AM – 10:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Taj Mahal", location: "Dharmapuri", description: "World-famous ivory-white marble mausoleum on the south bank of the Yamuna." },
      { name: "Agra Fort", location: "Rakabganj", description: "UNESCO site, a historical fort that was the main residence of the Mughals." },
      { name: "Fatehpur Sikri", location: "Outskirts", description: "A city founded in 1569 by Akbar, serving as the capital of the Mughal Empire." }
    ],
    hotels: [
      { name: "The Oberoi Amarvilas", location: "Taj East Gate Road", pricePerNight: 45000, rating: 4.9 },
      { name: "Hotel Taj Resorts", location: "Taj East Gate Road", pricePerNight: 3500, rating: 4.2 },
      { name: "Zostel Agra", location: "Tajganj", pricePerNight: 700, rating: 4.4 }
    ],
    restaurants: [
      { name: "Pinch of Spice", cuisine: "North Indian", location: "Fatehabad Road", rating: 4.4 },
      { name: "Sheroes Hangout", cuisine: "Cafe", location: "Agra", rating: 4.8 },
      { name: "Mama Chicken Mama Franky", cuisine: "Street Food", location: "Sadar Bazar", rating: 4.3 }
    ],
    places_pool: [
      { name: "Taj Mahal", location: "Agra", type: "Landmark" },
      { name: "Agra Fort", location: "Agra", type: "Landmark" },
      { name: "Mehtab Bagh", location: "Agra", type: "Garden" },
      { name: "Itimad-ud-Daulah (Baby Taj)", location: "Agra", type: "Landmark" },
      { name: "Fatehpur Sikri", location: "Agra", type: "Landmark" },
      { name: "Akbar's Tomb", location: "Sikandra", type: "Landmark" },
      { name: "Jama Masjid", location: "Agra", type: "Temple" },
      { name: "Sadar Bazar", location: "Agra", type: "Market" },
      { name: "Kinari Bazar", location: "Agra", type: "Market" },
      { name: "Tomb of Mariam-uz-Zamani", location: "Sikandra", type: "Landmark" },
      { name: "Ram Bagh", location: "Agra", type: "Garden" },
      { name: "Wildlife SOS Elephant Conservation", location: "Agra Outskirts", type: "Wildlife" },
      { name: "Chini ka Rauza", location: "Agra", type: "Landmark" },
      { name: "Kalakriti Cultural Centre", location: "Fatehabad Road", type: "Culture" },
      { name: "Agra Petha Shopping", location: "Agra", type: "Market" }
    ]
  },
  "mumbai": {
    temples: [
      { name: "Siddhivinayak Temple", location: "Prabhadevi", history: { dynasty: "Modern", year: 1801, builder: "Laxman Vithu", importance: "One of the richest and most famous Ganpati temples" }, timings: "5:30 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Mahalakshmi Temple", location: "Bhulabhai Desai Road", history: { dynasty: "Modern", year: 1831, builder: "Dhakji Dadaji", importance: "Dedicated to Mahalakshmi, the Goddess of wealth" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Gateway of India", location: "Colaba", description: "Iconic arch-monument built to commemorate the landing of King George V." },
      { name: "Marine Drive", location: "South Mumbai", description: "3.6km long promenade known as the 'Queen's Necklace' at night." },
      { name: "Elephanta Caves", location: "Elephanta Island", description: "UNESCO site with rock-cut temples dedicated to Shiva." }
    ],
    hotels: [
      { name: "The Taj Mahal Palace", location: "Colaba", pricePerNight: 28000, rating: 4.9 },
      { name: "Sahara Star", location: "Vile Parle", pricePerNight: 8500, rating: 4.5 },
      { name: "The Dormary", location: "Andheri", pricePerNight: 1200, rating: 4.6 }
    ],
    restaurants: [
      { name: "Leopold Cafe", cuisine: "Multi-cuisine", location: "Colaba", rating: 4.3 },
      { name: "Bademiya", cuisine: "Kebab", location: "Colaba", rating: 4.2 },
      { name: "Trishna", cuisine: "Seafood", location: "Kala Ghoda", rating: 4.5 }
    ],
    places_pool: [
      { name: "Gateway of India", location: "South Mumbai", type: "Landmark" },
      { name: "Marine Drive", location: "South Mumbai", type: "Landmark" },
      { name: "Colaba Causeway", location: "Colaba", type: "Market" },
      { name: "Chhatrapati Shivaji Terminus", location: "Fort", type: "Landmark" },
      { name: "Elephanta Caves", location: "Island", type: "Landmark" },
      { name: "Haji Ali Dargah", location: "Worli", type: "Temple" },
      { name: "Siddhivinayak Temple", location: "Prabhadevi", type: "Temple" },
      { name: "Juhu Beach", location: "Juhu", type: "Beach" },
      { name: "Bandra-Worli Sea Link", location: "Bandra", type: "Landmark" },
      { name: "Chor Bazaar", location: "Old Mumbai", type: "Market" },
      { name: "Sanjay Gandhi National Park", location: "Borivali", type: "Wildlife" },
      { name: "Kanheri Caves", location: "Borivali", type: "Landmark" },
      { name: "Crawford Market", location: "Fort", type: "Market" },
      { name: "Dhobi Ghat", location: "Mahalakshmi", type: "Culture" },
      { name: "Prithvi Theatre", location: "Juhu", type: "Culture" }
    ]
  },
  "kolkata": {
    temples: [
      { name: "Dakshineswar Kali", location: "Dakshineswar", history: { dynasty: "Modern", year: 1855, builder: "Rani Rashmoni", importance: "Famous for its association with Ramakrishna Paramahamsa" }, timings: "6:00 AM – 12:30 PM, 3:30 PM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kalighat Temple", location: "Kalighat", history: { dynasty: "Ancient", year: 1809, builder: "Local Sabarno Chowdhury family", importance: "One of the 51 Shakti Peethas" }, timings: "5:00 AM – 10:30 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Victoria Memorial", location: "Maidan", description: "Large marble building dedicated to the memory of Queen Victoria." },
      { name: "Howrah Bridge", location: "Hooghly River", description: "Iconic cantilever bridge that links Kolkata and Howrah." },
      { name: "Indian Museum", location: "Park Street", description: "The largest and oldest museum in India with rare collections." }
    ],
    hotels: [
      { name: "The Oberoi Grand", location: "Park Street", pricePerNight: 12000, rating: 4.8 },
      { name: "ITC Sonar", location: "EM Bypass", pricePerNight: 9500, rating: 4.6 },
      { name: "The Peerless Inn", location: "Dharmatala", pricePerNight: 4500, rating: 4.2 }
    ],
    restaurants: [
      { name: "Arsalan", cuisine: "Biryani", location: "Park Circus", rating: 4.4 },
      { name: "Peter Cat", cuisine: "Continental/North Indian", location: "Park Street", rating: 4.5 },
      { name: "Flurys", cuisine: "Bakery/Breakfast", location: "Park Street", rating: 4.3 }
    ],
    places_pool: [
      { name: "Victoria Memorial", location: "Kolkata", type: "Landmark" },
      { name: "Howrah Bridge", location: "Kolkata", type: "Landmark" },
      { name: "Dakshineswar Kali Temple", location: "Kolkata", type: "Temple" },
      { name: "Belur Math", location: "Kolkata", type: "Temple" },
      { name: "Indian Museum", location: "Kolkata", type: "Museum" },
      { name: "Mother House", location: "Kolkata", type: "Culture" },
      { name: "Park Street", location: "Kolkata", type: "Market" },
      { name: "Eco Park", location: "Rajarhat", type: "Park" },
      { name: "Prinsep Ghat", location: "Kolkata", type: "Landmark" },
      { name: "Marble Palace", location: "Kolkata", type: "Landmark" },
      { name: "St. Paul's Cathedral", location: "Kolkata", type: "Temple" },
      { name: "Alipore Zoo", location: "Kolkata", type: "Wildlife" },
      { name: "Kalighat Temple", location: "Kolkata", type: "Temple" },
      { name: "Mullick Ghat Flower Market", location: "Kolkata", type: "Market" },
      { name: "Dakhineswar Kali Temple", location: "Kolkata", type: "Temple" }
    ]
  },
  "kanchipuram": {
    temples: [
      { name: "Kanchi Kailasanathar", location: "West Kanchi", history: { dynasty: "Pallava", year: 700, builder: "Rajasimha", importance: "Oldest and most architecturally significant structure" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ekambareswarar", location: "Main Road", history: { dynasty: "Pallava/Chola", year: 600, builder: "Various Kings", importance: " Earth element temple with a 57m Raja Gopuram" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kanchi Kamakshi Amman", location: "City Center", history: { dynasty: "Chola", year: 1200, builder: "Local Rulers", importance: "Major Shakti shrine and central cultural heart of Kanchi" }, timings: "5:30 AM – 9:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Varadharaja Perumal", location: "East Kanchi", history: { dynasty: "Chola", year: 1053, builder: "Unknown", importance: "Home to the rare 100-pillared carved hall" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ashtabujakaram Temple", location: "South Kanchi", history: { dynasty: "Pallava", year: 800, builder: "Unknown", importance: "Vishnu temple where the deity has eight arms" }, timings: "6:00 AM – 7:30 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Kanchipuram Silk Saree Markets", location: "City Center", description: "Town's world-famous heritage of gold-bordered silk weaving." },
      { name: "Vaikuntha Perumal Palace Ruins", location: "Temple Site", description: "Historic architecture showcasing rare sculpted lion pillars." },
      { name: "Panchabhoota Sthalam Sites", location: "Kanchipuram", description: "Earth element pilgrimage hub featuring grand temple corridors." },
      { name: "Chitragupta Temple", location: "Railway Road", description: "One of the world's few temples dedicated to the record-keeper god." },
      { name: "Silk Weaving Village Tour", location: "Outskirts", description: "Educational tour of traditional handloom weaving techniques." }
    ],
    hotels: [
      { name: "Hotel SSK Grand", location: "Nelukkara St", pricePerNight: 2600, rating: 3.8 },
      { name: "Sree Sakthi Residency", location: "East Raja St", pricePerNight: 1800, rating: 4.0 },
      { name: "Nitheesh Residency", location: "Railway Station Rd", pricePerNight: 2200, rating: 4.1 },
      { name: "Sai Homestay", location: "Kanchi Center", pricePerNight: 2000, rating: 4.2 },
      { name: "Sri Rams Residency", location: "East Raja St", pricePerNight: 2000, rating: 4.2 }
    ],
    restaurants: [
      { name: "Hotel Saravana Bhavan", cuisine: "South Veg", location: "Near Temple", rating: 4.5 },
      { name: "Dindigul Thalappakatti", cuisine: "Biryani", location: "East Raja St", rating: 4.3 },
      { name: "Gongura", cuisine: "Andhra Veg", location: "Kanchipuram", rating: 4.2 },
      { name: "Murugan Idli Shop", cuisine: "South Indian", location: "City Center", rating: 4.6 },
      { name: "Adayar Ananda Bhavan", cuisine: "Sweets/Veg", location: "Main Road", rating: 4.4 }
    ],
    places_pool: [ { name: "Silk Markets", location: "Kanchi", type: "Market" } ]
  },
  "kochi": {
    temples: [
      { name: "Chottanikkara Bhagawathy", location: "Chottanikkara", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Famous for its power to heal mental illnesses" }, timings: "4:00 AM – 12:00 PM, 4:00 PM – 8:30 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Fort Kochi", location: "Kochi", description: "Historic neighborhood known for its Dutch, Portuguese, and British colonial architecture." },
      { name: "Chinese Fishing Nets", location: "Fort Kochi", description: "Iconic fixed land installations for fishing, used for centuries." },
      { name: "Mattancherry Palace", location: "Mattancherry", description: "Portuguese palace popularly known as the Dutch Palace, with murals." }
    ],
    hotels: [
      { name: "Grand Hyatt Kochi Bolgatty", location: "Bolgatty Island", pricePerNight: 14000, rating: 4.8 },
      { name: "Fragrant Nature Kochi", location: "Bazaar Road", pricePerNight: 6500, rating: 4.6 }
    ],
    restaurants: [
      { name: "Kashi Art Cafe", cuisine: "European/Cafe", location: "Fort Kochi", rating: 4.5 },
      { name: "Oceanos Restaurant", cuisine: "Seafood/Kerala", location: "Fort Kochi", rating: 4.4 }
    ],
    places_pool: [
      { name: "Fort Kochi Walk", location: "Fort Kochi", type: "Activity" },
      { name: "Chinese Fishing Nets", location: "Fort Kochi", type: "Landmark" },
      { name: "Mattancherry Palace", location: "Mattancherry", type: "Landmark" },
      { name: "Jewish Synagogue", location: "Jew Town", type: "Temple" },
      { name: "Marine Drive", location: "Ernakulam", type: "Landmark" },
      { name: "Lulu Mall", location: "Edappally", type: "Market" },
      { name: "Willingdon Island", location: "Kochi", type: "Landmark" },
      { name: "Cherai Beach", location: "Vypin Island", type: "Beach" },
      { name: "Kathakali Performance", location: "Kochi", type: "Culture" },
      { name: "Hill Palace Museum", location: "Tripunithura", type: "Museum" },
      { name: "Bolgatty Palace", location: "Bolgatty Island", type: "Landmark" },
      { name: "Kochi-Muziris Biennale (Seasonal)", location: "Fort Kochi", type: "Culture" }
    ]
  },
  "srinagar": {
    temples: [
      { name: "Shankaracharya Temple", location: "Srinagar", history: { dynasty: "Ancient", year: 200, builder: "Unknown", importance: "Ancient Shiva temple on a hilltop offering panoramic city views" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Dal Lake", location: "Srinagar", description: "The 'Jewel in the crown of Kashmir', famous for houseboats and shikaras." },
      { name: "Shalimar Bagh", location: "Srinagar", description: "Mughal garden built by Jahangir, known for its terraces and fountains." },
      { name: "Nishat Bagh", location: "Srinagar", description: "The 'Garden of Bliss', the second largest Mughal garden in the Kashmir Valley." }
    ],
    hotels: [
      { name: "The Lalit Grand Palace", location: "Gupkar Road", pricePerNight: 22000, rating: 4.7 },
      { name: "Vivanta Dal View", location: "Kralsangri", pricePerNight: 18000, rating: 4.6 }
    ],
    restaurants: [
      { name: "Ahdoos", cuisine: "Wazwan", location: "Residency Road", rating: 4.5 },
      { name: "Mughal Darbar", cuisine: "Kashmiri", location: "Residency Road", rating: 4.3 }
    ],
    places_pool: [
      { name: "Dal Lake Shikara Ride", location: "Srinagar", type: "Activity" },
      { name: "Houseboat Stay", location: "Dal Lake", type: "Activity" },
      { name: "Shalimar Bagh", location: "Srinagar", type: "Garden" },
      { name: "Nishat Bagh", location: "Srinagar", type: "Garden" },
      { name: "Shankaracharya Temple", location: "Srinagar", type: "Temple" },
      { name: "Hazratbal Shrine", location: "Srinagar", type: "Temple" },
      { name: "Pari Mahal", location: "Srinagar", type: "Landmark" },
      { name: "Tulip Garden (Seasonal)", location: "Srinagar", type: "Garden" },
      { name: "Wular Lake (Day Trip)", location: "Bandipora", type: "Landmark" },
      { name: "Sonmarg (Day Trip)", location: "Ganderbal", type: "Landmark" },
      { name: "Gulmarg (Day Trip)", location: "Baramulla", type: "Landmark" },
      { name: "Old City Heritage Walk", location: "Srinagar", type: "Culture" }
    ]
  },
  "leh": {
    temples: [
      { name: "Shanti Stupa", location: "Chanspa", history: { dynasty: "Modern", year: 1991, builder: "Japanese Buddhists", importance: "White-domed Buddhist stupa providing incredible views" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.9 }
    ],
    famous_places: [
      { name: "Leh Palace", location: "Leh", description: "Former royal palace overlooking the Ladakhi Himalayan town of Leh." },
      { name: "Magnetic Hill", location: "Leh-Kargil Hwy", description: "A 'gravity hill' that creates an optical illusion of vehicles moving uphill." },
      { name: "Pangong Tso (Trip)", location: "Ladakh", description: "Stunning endorheic lake situated at a height of about 4,350 m." }
    ],
    hotels: [
      { name: "The Grand Dragon Ladakh", location: "Old Leh Road", pricePerNight: 12000, rating: 4.8 },
      { name: "The Zen Ladakh", location: "Sheynam Road", pricePerNight: 8500, rating: 4.6 }
    ],
    restaurants: [
      { name: "German Bakery", cuisine: "Bakery/Continental", location: "Main Market", rating: 4.3 },
      { name: "Sky Wok", cuisine: "Tibetan/Chinese", location: "Main Market", rating: 4.4 }
    ],
    places_pool: [
      { name: "Leh Palace", location: "Leh", type: "Landmark" },
      { name: "Shanti Stupa", location: "Leh", type: "Landmark" },
      { name: "Leh Main Market", location: "Leh", type: "Market" },
      { name: "Hall of Fame", location: "Leh Outskirts", type: "Museum" },
      { name: "Spituk Monastery", location: "Leh Outskirts", type: "Temple" },
      { name: "Thiksey Monastery (Trip)", location: "Leh Outskirts", type: "Temple" },
      { name: "Hemis Monastery (Trip)", location: "Leh Outskirts", type: "Temple" },
      { name: "Magnetic Hill", location: "Leh Outskirts", type: "Landmark" },
      { name: "Sangam (Confluence)", location: "Leh Outskirts", type: "Landmark" },
      { name: "Khardung La (Pass Trip)", location: "Ladakh", type: "Landmark" },
      { name: "Nubra Valley (2-Day Trip)", location: "Ladakh", type: "Landmark" },
      { name: "Pangong Lake Trip", location: "Ladakh", type: "Landmark" }
    ]
  },
  "shimla": {
    temples: [
      { name: "Jakhoo Temple", location: "Jakhoo Hill", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Dedicated to Hanuman, features a giant 108ft statue" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "The Ridge", location: "Shimla Mall", description: "Large open space in the center of Shimla, center of all cultural activities." },
      { name: "Mall Road", location: "Shimla", description: "The main street in Shimla, famous for shopping and colonial architecture." },
      { name: "Kalka-Shimla Toy Train", location: "Shimla Station", description: "UNESCO World Heritage site offering a scenic mountain railway journey." }
    ],
    hotels: [
      { name: "Wildflower Hall", location: "Chharabra", pricePerNight: 35000, rating: 4.9 },
      { name: "The Oberoi Cecil", location: "Chaura Maidan", pricePerNight: 18000, rating: 4.8 }
    ],
    restaurants: [
      { name: "Cafe Sol", cuisine: "Multi-cuisine", location: "Mall Road", rating: 4.4 },
      { name: "The Wake & Bake Cafe", cuisine: "Continental", location: "Mall Road", rating: 4.5 }
    ],
    places_pool: [
      { name: "The Ridge Walk", location: "Shimla", type: "Activity" },
      { name: "Mall Road Shopping", location: "Shimla", type: "Market" },
      { name: "Jakhoo Hill Trek", location: "Shimla", type: "Activity" },
      { name: "Christ Church", location: "The Ridge", type: "Landmark" },
      { name: "Vice Regal Lodge", location: "Shimla", type: "Landmark" },
      { name: "Kufri (Day Trip)", location: "Shimla Outskirts", type: "Activity" },
      { name: "Mashobra (Day Trip)", location: "Shimla Outskirts", type: "Landmark" },
      { name: "Naldehra Golf Course", location: "Shimla Outskirts", type: "Activity" },
      { name: "Himachal State Museum", location: "Shimla", type: "Museum" },
      { name: "Tara Devi Temple", location: "Shimla Outskirts", type: "Temple" },
      { name: "Annandale Ground", location: "Shimla", type: "Activity" },
      { name: "Chail (Day Trip)", location: "Chail", type: "Landmark" }
    ]
  },
  "manali": {
    temples: [
      { name: "Hadimba Devi Temple", location: "Manali", history: { dynasty: "Ancient", year: 1553, builder: "Maharaja Bahadur Singh", importance: "Ancient cave temple dedicated to Hidimbi Devi" }, timings: "8:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Rohtang Pass (Seasonal)", location: "Manali Outskirts", description: "High mountain pass on the eastern Pir Panjal Range of the Himalayas." },
      { name: "Solang Valley", location: "Manali", description: "Side valley at the top of the Kullu Valley, known for adventure sports." },
      { name: "Old Manali", location: "Manali", description: "Charming area known for its cafes, shops, and relaxed vibe." }
    ],
    hotels: [
      { name: "The Himalayan", location: "Hadimba Road", pricePerNight: 12000, rating: 4.7 },
      { name: "Span Resort and Spa", location: "Manali-Kullu Hwy", pricePerNight: 15000, rating: 4.6 }
    ],
    restaurants: [
      { name: "Johnson Cafe", cuisine: "Trout/European", location: "Old Manali", rating: 4.5 },
      { name: "Cafe 1947", cuisine: "Italian/Israeli", location: "Old Manali", rating: 4.6 }
    ],
    places_pool: [
      { name: "Hadimba Temple", location: "Manali", type: "Temple" },
      { name: "Solang Valley Sports", location: "Manali Outskirts", type: "Activity" },
      { name: "Old Manali Cafe Crawl", location: "Old Manali", type: "Activity" },
      { name: "Mall Road Shimla", location: "Manali Market", type: "Market" },
      { name: "Vashisht Hot Springs", location: "Manali Outskirts", type: "Activity" },
      { name: "Jogini Falls Trek", location: "Manali Outskirts", type: "Activity" },
      { name: "Manu Temple", location: "Old Manali", type: "Temple" },
      { name: "Beas River Rafting", location: "Manali", type: "Activity" },
      { name: "Naggar Castle (Day Trip)", location: "Naggar", type: "Landmark" },
      { name: "Atal Tunnel (Pass)", location: "Manali Outskirts", type: "Landmark" },
      { name: "Sissu (Day Trip)", location: "Lahaul", type: "Landmark" },
      { name: "Kasol (Day Trip)", location: "Parvati Valley", type: "Landmark" }
    ]
  },
  "amritsar": {
    temples: [
      { name: "Golden Temple", location: "Amritsar", history: { dynasty: "Sikh", year: 1577, builder: "Guru Ram Das", importance: "Preeminient spiritual site of Sikhism, the holiest Gurdwara" }, timings: "All day", entryFee: "Free", rating: 5.0 },
      { name: "Durgiana Temple", location: "Amritsar", history: { dynasty: "Modern", year: 1921, builder: "Guru Harsai Mal Kapoor", importance: "Similar architecture to Golden Temple, dedicated to Durga" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Jallianwala Bagh", location: "Near Golden Temple", description: "Historic garden memorial of the 1919 massacre, essential for history buffs." },
      { name: "Wagah Border", location: "Attari-Wagah", description: "Border crossing between India & Pakistan, famous for its daily lowering of flags ceremony." },
      { name: "Partition Museum", location: "Town Hall", description: "First museum in the world dedicated to the story of the 1947 partition." }
    ],
    hotels: [
      { name: "Taj Swarna", location: "Circular Road", pricePerNight: 8500, rating: 4.7 },
      { name: "Radisson Blu", location: "Airport Road", pricePerNight: 5500, rating: 4.4 }
    ],
    restaurants: [
      { name: "Kesar Da Dhaba", cuisine: "Authentic Punjabi", location: "Old City", rating: 4.6 },
      { name: "Bharawan Da Dhaba", cuisine: "Punjabi Thali", location: "Town Hall", rating: 4.4 }
    ],
    places_pool: [
      { name: "Golden Temple Palki Ceremony", location: "Amritsar", type: "Culture" },
      { name: "Wagah Border Parade", location: "Wagah", type: "Activity" },
      { name: "Jallianwala Bagh Memorial", location: "Amritsar", type: "Landmark" },
      { name: "Partition Museum", location: "Amritsar", type: "Museum" },
      { name: "Durgiana Temple", location: "Amritsar", type: "Temple" },
      { name: "Ram Tirath Temple", location: "Amritsar Outskirts", type: "Temple" },
      { name: "Hall Bazaar Shopping", location: "Amritsar", type: "Market" },
      { name: "Guru Ke Mahal", location: "Amritsar", type: "Landmark" },
      { name: "Pul Kanjari", location: "Amritsar Outskirts", type: "Landmark" },
      { name: "Gobindgarh Fort", location: "Amritsar", type: "Landmark" },
      { name: "Langar Service", location: "Golden Temple", type: "Activity" },
      { name: "Akal Takht", location: "Amritsar", type: "Temple" }
    ]
  },
  "rishikesh": {
    temples: [
      { name: "Trimbakeshwar Temple", location: "Laxman Jhula", history: { dynasty: "Ancient", year: 800, builder: "Adi Shankara", importance: "13-story temple with multiple deities on the river bank" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Laxman Jhula", location: "Rishikesh", description: "Iconic iron suspension bridge across the Ganges river." },
      { name: "Triveni Ghat", location: "Rishikesh", description: "The most famous bathing ghat, known for the evening Ganga Aarti." },
      { name: "The Beatles Ashram", location: "Swarg Ashram", description: "The location where The Beatles learned transcendental meditation in 1968." }
    ],
    hotels: [
      { name: "Ananda in the Himalayas", location: "Narendra Nagar", pricePerNight: 45000, rating: 4.9 },
      { name: "Zostel Rishikesh", location: "Tapovan", pricePerNight: 800, rating: 4.5 }
    ],
    restaurants: [
      { name: "Chotiwala", cuisine: "Traditional Indian", location: "Swarg Ashram", rating: 4.2 },
      { name: "Little Buddha Cafe", cuisine: "International", location: "Laxman Jhula", rating: 4.6 }
    ],
    places_pool: [
      { name: "Ganga Aarti", location: "Triveni Ghat", type: "Culture" },
      { name: "River Rafting", location: "Ganges", type: "Activity" },
      { name: "Laxman Jhula Walk", location: "Rishikesh", type: "Landmark" },
      { name: "Ram Jhula Walk", location: "Rishikesh", type: "Landmark" },
      { name: "Beatles Ashram Tour", location: "Rishikesh", type: "Landmark" },
      { name: "Neer Garh Waterfall Trek", location: "Rishikesh Outskirts", type: "Activity" },
      { name: "Jumpin Heights Bungee", location: "Mohanchatti", type: "Activity" },
      { name: "Yoga Session", location: "Parmarth Niketan", type: "Activity" },
      { name: "Kunjapuri Sunrise Trek", location: "Rishikesh Outskirts", type: "Activity" },
      { name: "Vashishta Gufa", location: "Rishikesh Outskirts", type: "Temple" },
      { name: "Patna Waterfall", location: "Rishikesh Outskirts", type: "Landmark" },
      { name: "Bharat Mandir", location: "Rishikesh", type: "Temple" }
    ]
  },
  "madurai": {
    temples: [
      { name: "Meenakshi Amman", location: "Madurai", history: { dynasty: "Pandyan/Nayakar", year: 1200, builder: "Kulasekara Pandyan", importance: "Iconic temple city, famous for its 14 gopurams" }, timings: "5:00 AM – 10:00 PM", entryFee: "Free", rating: 5.0 }
    ],
    famous_places: [
      { name: "Thirumalai Nayakkar Mahal", location: "Madurai", description: "17th-century palace built by King Thirumalai Nayak, known for its giant pillars." },
      { name: "Gandhi Memorial Museum", location: "Madurai", description: "Historic museum housing the blood-stained garment worn by Gandhi when assassinated." }
    ],
    hotels: [
      { name: "Heritage Madurai", location: "Melakkal Main Road", pricePerNight: 8500, rating: 4.6 },
      { name: "The Gateway Hotel", location: "Pasumalai", pricePerNight: 7500, rating: 4.5 }
    ],
    restaurants: [
      { name: "Murugan Idli Shop", cuisine: "South Indian", location: "Near Temple", rating: 4.4 },
      { name: "Jigarthanda Shop", cuisine: "Famous Drink", location: "Madurai City", rating: 4.7 }
    ],
    places_pool: [
      { name: "Meenakshi Temple Evening Ceremony", location: "Madurai", type: "Culture" },
      { name: "Thirumalai Nayakar Palace", location: "Madurai", type: "Landmark" },
      { name: "Gandhi Museum", location: "Madurai", type: "Museum" },
      { name: "Koodal Azhagar Temple", location: "Madurai", type: "Temple" },
      { name: "Alagar Koyil Trip", location: "Madurai Outskirts", type: "Temple" },
      { name: "Pazhamudhircholai Temple", location: "Madurai Outskirts", type: "Temple" },
      { name: "Vandiyur Mariamman Teppakulam", location: "Madurai", type: "Landmark" },
      { name: "Vaigai Dam", location: "Madurai Outskirts", type: "Landmark" },
      { name: "Madurai Street Food Tour", location: "Madurai City", type: "Activity" },
      { name: "St. Mary's Cathedral", location: "Madurai", type: "Temple" }
    ]
  },
  "kanyakumari": {
    temples: [
      { name: "Kumari Amman", location: "Main City", history: { dynasty: "Ancient", year: 1000, builder: "Sage Parashurama", importance: "Temple at the southernmost tip of India dedicated to Devi Kanya" }, timings: "4:30 AM – 12:30 PM, 4:00 PM – 8:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Vivekananda Rock Memorial", location: "Island", description: "Popular tourist monument built on a rock where Swami Vivekananda meditated." },
      { name: "Thiruvalluvar Statue", location: "Island", description: "133-foot tall stone sculpture of the Tamil poet and philosopher Thiruvalluvar." },
      { name: "Kanyakumari Beach", location: "Mainland", description: "The confluence point of the Arabian Sea, Bay of Bengal, and Indian Ocean." }
    ],
    hotels: [
      { name: "Sparsa Resort", location: "Coastal Road", pricePerNight: 5500, rating: 4.4 },
      { name: "Hotel Sea View", location: "East Car Street", pricePerNight: 3500, rating: 4.2 }
    ],
    restaurants: [
      { name: "The Ocean Heritage", cuisine: "Seafood", location: "Kanyakumari", rating: 4.3 },
      { name: "Hotel Saravana", cuisine: "South Indian", location: "Main Road", rating: 4.4 }
    ],
    places_pool: [
      { name: "Vivekananda Rock Ferry", location: "Kanyakumari", type: "Activity" },
      { name: "Sun Rise View Point", location: "Kanyakumari", type: "Landmark" },
      { name: "Sun Set View Point", location: "Kanyakumari", type: "Landmark" },
      { name: "Gandhi Mandapam", location: "Kanyakumari", type: "Landmark" },
      { name: "Our Lady of Ransom Church", location: "Kanyakumari", type: "Temple" },
      { name: "Padmanabhapuram Palace (Trip)", location: "Kanyakumari Outskirts", type: "Landmark" },
      { name: "Vattakottai Fort", location: "Kanyakumari Outskirts", type: "Landmark" },
      { name: "Mathur Hanging Bridge", location: "Kanyakumari Outskirts", type: "Landmark" },
      { name: "Kanyakumari Wax Museum", location: "Kanyakumari", type: "Museum" },
      { name: "Triveni Sangam", location: "Kanyakumari", type: "Landmark" }
    ]
  },
  "mysore": {
    temples: [
      { name: "Chamundeshwari", location: "Chamundi Hill", history: { dynasty: "Ganga/Wodeyar", year: 1100, builder: "Wodeyar Kings", importance: "Stunning temple overlooking the historic city of Mysore" }, timings: "7:30 AM – 2:00 PM, 3:30 PM – 6:00 PM", entryFee: "Free", rating: 4.9 }
    ],
    famous_places: [
      { name: "Mysore Palace", location: "Mysore", description: "Incredible Indo-Saracenic palace, the official residence of the Wadiyar dynasty." },
      { name: "Brindavan Gardens", location: "Mandya", description: "Terraced gardens with fountain musical shows, located adjoining the KRS Dam." },
      { name: "Srirangapatna (Trip)", location: "Outskirts", description: "Historical island town once the capital of Tipu Sultan." }
    ],
    hotels: [
      { name: "Radisson Blu Plaza", location: "M G Road", pricePerNight: 8500, rating: 4.6 },
      { name: "Fortune JP Palace", location: "Nazarbad", pricePerNight: 5500, rating: 4.3 }
    ],
    restaurants: [
      { name: "Mylari Hotel", cuisine: "Mysore Masala Dosa", location: "Nazarbad", rating: 4.8 },
      { name: "Vinayaka Mylari", cuisine: "Tiffin", location: "Mysore City", rating: 4.7 }
    ],
    places_pool: [
      { name: "Mysore Palace Tour", location: "Mysore", type: "Landmark" },
      { name: "Mysore Palace Illumination", location: "Mysore", type: "Culture" },
      { name: "Brindavan Garden Show", location: "Mysore", type: "Landmark" },
      { name: "Mysore Zoo", location: "Mysore", type: "Wildlife" },
      { name: "St. Philomena's Church", location: "Mysore", type: "Temple" },
      { name: "Lalitha Mahal Palace", location: "Mysore", type: "Landmark" },
      { name: "Mysore Sand Sculpture Museum", location: "Mysore", type: "Museum" },
      { name: "Mysore Rail Museum", location: "Mysore", type: "Museum" },
      { name: "GRP Hill View", location: "Mysore Outskirts", type: "Landmark" },
      { name: "Cauvery Emporium Shopping", location: "Mysore", type: "Market" },
      { name: "Devaraja Market", location: "Mysore", type: "Market" }
    ]
  },
  "darjeeling": {
    temples: [
      { name: "Mahakal Temple", location: "Observatory Hill", history: { dynasty: "Ancient", year: 1782, builder: "Local Monks", importance: "Sacred site where Hindu and Buddhist traditions coexist" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Tiger Hill", location: "Darjeeling", description: "Famous for its panoramic views of Mount Everest and Kanchenjunga at sunrise." },
      { name: "Batasia Loop", location: "Ghoom", description: "A spiral railway created to lower the gradient of ascent of the Toy Train." },
      { name: "Darjeeling Himalayan Railway", location: "Darjeeling", description: "UNESCO site affectionately known as the 'Toy Train'." }
    ],
    hotels: [
      { name: "Mayfair Darjeeling", location: "The Mall", pricePerNight: 12000, rating: 4.7 },
      { name: "Windamere Hotel", location: "Observatory Hill", pricePerNight: 15000, rating: 4.6 }
    ],
    restaurants: [
      { name: "Glenary's", cuisine: "Bakery/Pub", location: "Mall Road", rating: 4.5 },
      { name: "Kunga Restaurant", cuisine: "Tibetan", location: "Gandhi Road", rating: 4.4 }
    ],
    places_pool: [
      { name: "Tiger Hill Sunrise", location: "Darjeeling", type: "Activity" },
      { name: "Batasia Loop Visit", location: "Darjeeling", type: "Landmark" },
      { name: "Toy Train Ride", location: "Darjeeling", type: "Activity" },
      { name: "Himalayan Mountaineering Institute", location: "Darjeeling", type: "Museum" },
      { name: "Padmaja Naidu Himalayan Zoological Park", location: "Darjeeling", type: "Wildlife" },
      { name: "Happy Valley Tea Estate", location: "Darjeeling", type: "Activity" },
      { name: "Japanese Peace Pagoda", location: "Darjeeling", type: "Temple" },
      { name: "Rock Garden", location: "Darjeeling Outskirts", type: "Garden" },
      { name: "Ghoom Monastery", location: "Ghoom", type: "Temple" },
      { name: "Mall Road Stroll", location: "Darjeeling", type: "Activity" },
      { name: "Nightingale Park", location: "Darjeeling", type: "Park" },
      { name: "Mirik Lake (Day Trip)", location: "Mirik", type: "Landmark" }
    ]
  },
  "gangtok": {
    temples: [
      { name: "Rumtek Monastery", location: "Gangtok", history: { dynasty: "Tibetan", year: 1700, builder: "9th Karmapa", importance: "Largest monastery in Sikkim, focal point for spiritual learning" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.9 }
    ],
    famous_places: [
      { name: "Nathu La Pass (Permit Required)", location: "Sikkim Border", description: "A mountain pass in the Himalayas connecting Sikkim with Tibet." },
      { name: "Tsomgo Lake", location: "Gangtok Outskirts", description: "A glacial lake in the East Sikkim district, highly sacred to the locals." },
      { name: "MG Marg", location: "Gangtok City", description: "The town's main street, a pedestrian-only zone with shops and cafes." }
    ],
    hotels: [
      { name: "Mayfair Spa Resort", location: "Ranipool", pricePerNight: 14000, rating: 4.8 },
      { name: "The Elgin Nor-Khill", location: "Paljor Stadium Road", pricePerNight: 10000, rating: 4.6 }
    ],
    restaurants: [
      { name: "The Coffee Shop", cuisine: "Italian/Cafe", location: "MG Marg", rating: 4.5 },
      { name: "Baker's Cafe", cuisine: "Bakery", location: "MG Marg", rating: 4.4 }
    ],
    places_pool: [
      { name: "Rumtek Monastery", location: "Gangtok", type: "Temple" },
      { name: "Enchey Monastery", location: "Gangtok", type: "Temple" },
      { name: "Tsomgo Lake Trip", location: "Gangtok Outskirts", type: "Activity" },
      { name: "Baba Mandir Visit", location: "Gangtok Outskirts", type: "Temple" },
      { name: "Nathu La Pass Trip", location: "Sikkim Border", type: "Activity" },
      { name: "Namgyal Institute of Tibetology", location: "Gangtok", type: "Museum" },
      { name: "Do Drul Chorten", location: "Gangtok", type: "Temple" },
      { name: "Gangtok Ropeway", location: "Gangtok", type: "Activity" },
      { name: "Banjhakri Falls", location: "Gangtok Outskirts", type: "Landmark" },
      { name: "MG Marg Walk", location: "Gangtok", type: "Activity" },
      { name: "Tashi View Point", location: "Gangtok", type: "Landmark" },
      { name: "Ganesh Tok", location: "Gangtok", type: "Temple" },
      { name: "Hanuman Tok", location: "Gangtok", type: "Temple" }
    ]
  },
  "shillong": {
    temples: [
      { name: "Don Bosco Museum", location: "Mawlai", history: { dynasty: "Modern", year: 2003, builder: "Salesians of Don Bosco", importance: "A great center for religious and cultural learning of Northeast India" }, timings: "9:00 AM – 5:30 PM", entryFee: "Paid", rating: 4.7 }
    ],
    famous_places: [
      { name: "Elephant Falls", location: "Upper Shillong", description: "Beautiful multi-tiered waterfall named after an elephant-shaped rock." },
      { name: "Shillong Peak", location: "Upper Shillong", description: "The highest point in Shillong, offering breathtaking views of the city." },
      { name: "Umiam Lake", location: "Ri Bhoi", description: "A massive reservoir popularly known as Barapani, similar to Scotland's lochs." }
    ],
    hotels: [
      { name: "Ri Kynjai", location: "Umiam Lake", pricePerNight: 16000, rating: 4.8 },
      { name: "Polo Towers", location: "Oakland Road", pricePerNight: 6500, rating: 4.4 }
    ],
    restaurants: [
      { name: "Dylan's Cafe", cuisine: "American/Cafe", location: "Fruit Garden", rating: 4.6 },
      { name: "City Hut Family Dhaba", cuisine: "Indian/Multi", location: "Police Bazar", rating: 4.4 }
    ],
    places_pool: [
      { name: "Elephant Falls", location: "Shillong", type: "Landmark" },
      { name: "Shillong Peak", location: "Shillong", type: "Landmark" },
      { name: "Umiam Lake Boating", location: "Ri Bhoi", type: "Activity" },
      { name: "Don Bosco Museum", location: "Shillong", type: "Museum" },
      { name: "Police Bazar Shopping", location: "Shillong", type: "Market" },
      { name: "Ward's Lake", location: "Shillong", type: "Park" },
      { name: "Laitlum Canyons", location: "Shillong Outskirts", type: "Landmark" },
      { name: "Mawlynnong Village (Day Trip)", location: "Meghalaya", type: "Culture" },
      { name: "Dawki River (Day Trip)", location: "Meghalaya", type: "Activity" },
      { name: "Cherrapunjee (Day Trip)", location: "Sohra", type: "Landmark" },
      { name: "Living Root Bridges", location: "Cherrapunjee", type: "Landmark" },
      { name: "Lady Hydari Park", location: "Shillong", type: "Park" }
    ]
  },
  "guwahati": {
    temples: [
      { name: "Kamakhya Temple", location: "Nilachal Hill", history: { dynasty: "Ancient/Ahom", year: 1565, builder: "Chilarai", importance: "One of the oldest and most revered Shakti Peethas in India" }, timings: "8:00 AM – 1:00 PM, 2:30 PM – 5:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Umananda Temple", location: "Peacock Island", history: { dynasty: "Ahom", year: 1694, builder: "Gadhar Singha", importance: "Located on the smallest inhabited river island in the world" }, timings: "5:30 AM – 6:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Kaziranga (Trip)", location: "Kanchanjuri", description: "UNESCO site famous for its population of One-horned Rhinos." },
      { name: "Brahmaputra Cruise", location: "Guwahati City", description: "Evening cruises on the mighty Brahmaputra river with traditional music." }
    ],
    hotels: [
      { name: "Radisson Blu", location: "National Hwy 37", pricePerNight: 9500, rating: 4.6 },
      { name: "Vivanta Guwahati", location: "Khanapara", pricePerNight: 12000, rating: 4.8 }
    ],
    restaurants: [
      { name: "Paradise", cuisine: "Traditional Assamese", location: "Silpukhuri", rating: 4.4 },
      { name: "Gam's Delicacy", cuisine: "Assamese/North Indian", location: "Guwahati", rating: 4.3 }
    ],
    places_pool: [
      { name: "Kamakhya Temple", location: "Guwahati", type: "Temple" },
      { name: "Umananda Island visit", location: "Guwahati", type: "Activity" },
      { name: "Brahmaputra Evening Cruise", location: "Guwahati", type: "Activity" },
      { name: "Assam State Museum", location: "Guwahati", type: "Museum" },
      { name: "Shrimanta Sankardeva Kalakshetra", location: "Guwahati", type: "Culture" },
      { name: "Guwahati Zoo", location: "Guwahati", type: "Wildlife" },
      { name: "Pobitora Wildlife Sanctuary (Trip)", location: "Guwahati Outskirts", type: "Wildlife" },
      { name: "Sualkuchi Silk Village", location: "Guwahati Outskirts", type: "Culture" },
      { name: "Hajo Pilgrimage Center", location: "Guwahati Outskirts", type: "Temple" },
      { name: "Deepor Beel Bird Sanctuary", location: "Guwahati", type: "Wildlife" }
    ]
  },
  "puri": {
    temples: [
      { name: "Jagannath Temple", location: "Puri City", history: { dynasty: "Ganga", year: 1161, builder: "Anantavarman Chodaganga", importance: "Part of the Char Dham pilgrimage, famous for the Rath Yatra" }, timings: "5:00 AM – 11:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Konark Sun Temple", location: "Konark", history: { dynasty: "Ganga", year: 1250, builder: "Narasimhadeva I", importance: "UNESCO site architectural masterpiece shaped like a giant chariot" }, timings: "6:00 AM – 8:00 PM", entryFee: "Paid", rating: 5.0 }
    ],
    famous_places: [
      { name: "Puri Beach", location: "Puri", description: "Beautiful golden sand beach famous for sand art by Sudarsan Pattnaik." },
      { name: "Chilika Lake (Trip)", location: "Satapada", description: "Brakish water lagoon, home to Irrawaddy dolphins and migratory birds." }
    ],
    hotels: [
      { name: "Mayfair Waves", location: "Chakratirth Road", pricePerNight: 11000, rating: 4.7 },
      { name: "Hans Coco Palms", location: "Swargadwar", pricePerNight: 6500, rating: 4.4 }
    ],
    restaurants: [
      { name: "Wildgrass Restaurant", cuisine: "Odia/Seafood", location: "Puri City", rating: 4.5 },
      { name: "Chung Wah", cuisine: "Chinese", location: "VIP Road", rating: 4.2 }
    ],
    places_pool: [
      { name: "Jagannath Temple", location: "Puri", type: "Temple" },
      { name: "Puri Beach Stroll", location: "Puri", type: "Activity" },
      { name: "Konark Sun Temple Visit", location: "Konark", type: "Landmark" },
      { name: "Chilika Lake Dolphin Trip", location: "Satapada", type: "Activity" },
      { name: "Raghurajpur Crafts Village", location: "Puri Outskirts", type: "Culture" },
      { name: "Sakshigopal Temple", location: "Puri Outskirts", type: "Temple" },
      { name: "Narendra Tank", location: "Puri", type: "Landmark" },
      { name: "Puri Light House", location: "Puri", type: "Landmark" },
      { name: "Pipli Applique Village", location: "Puri Outskirts", type: "Culture" },
      { name: "Chandrabhaga Beach", location: "Konark", type: "Beach" }
    ]
  },
  "arunachalam": {
    temples: [
      { name: "Arunachalesvara", location: "Foot of Hill", history: { dynasty: "Pallava/Chola", year: 800, builder: "Ancient Kings", importance: " Fire element temple - one of the largest in India" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Adi Annamalai Temple", location: "Girivalam Path", history: { dynasty: "Puranic", year: "2000 BC", builder: "Lord Brahma", importance: "Oldest structure on the girivalam path" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Arulmigu Renugambal", location: "Padavedu", history: { dynasty: "Ancient", year: 1000, builder: "Kings", importance: "Major Shakti shrine in the region" }, timings: "6:00 AM – 7:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Mallikarjuna Swamy", location: "Parvathamalai", history: { dynasty: "Siddhar", year: 1500, builder: "Siddhars", importance: "Hilltop temple known for intense spiritual energy" }, timings: "Varies", entryFee: "Free", rating: 4.7 },
      { name: "Sri Varadaraja Perumal", location: "Injimedu", history: { dynasty: "Ancient", year: 1000, builder: "Kings", importance: "Calm and historic Vishnu temple outside town" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Arunachala Hill", location: "Tiruvannamalai", description: "Sacred fire hill around which millions perform the 14km walking ritual." },
      { name: "Sri Ramanasramam", location: "Ramana Nagar", description: "The spiritual ashram of sage Ramana Maharshi, a place of deep silence." },
      { name: "Arunachala Raja Gopuram", location: "Temple Entrance", description: "Massive 217-foot gopuram, a signature landmark of the city." },
      { name: "Seshadri Swamigal Ashram", location: "Girivalam Path", description: "Quiet spiritual haven dedicated to the 20th-century mystic." },
      { name: "Yogi Ramsuratkumar Ashram", location: "Tiruvannamalai", description: "Beautiful contemporary ashram dedicated to the Godchild of Tiruvannamalai." }
    ],
    hotels: [
      { name: "Ellora Hotel", location: "Ramana Nagar", pricePerNight: 2500, rating: 4.3 },
      { name: "Hotel Ramakrishna", location: "Temple Front", pricePerNight: 1800, rating: 4.1 },
      { name: "Dwaraka Guest House", location: "Girivalam Path", pricePerNight: 1500, rating: 4.2 },
      { name: "Sai Guest House", location: "Ramana Nagar", pricePerNight: 1200, rating: 4.2 },
      { name: "Leaf Hotel", location: "Arunachalam", pricePerNight: 3500, rating: 4.4 }
    ],
    restaurants: [
      { name: "Akshaya Restaurant", cuisine: "South Indian", location: "Main Road", rating: 4.4 },
      { name: "German Bakery", cuisine: "European", location: "Near Ramana Ashram", rating: 4.5 },
      { name: "Hotel Arpana", cuisine: "Vegetarian", location: "Temple Area", rating: 4.2 },
      { name: "The Dreaming Tree", cuisine: "International Veg", location: "Ramana Nagar", rating: 4.2 },
      { name: "Vellalar Mess", cuisine: "Local", location: "Main Road", rating: 4.6 }
    ],
    places_pool: [ { name: "Girivalam Path", location: "Hill", type: "Culture" } ]
  }
};

/**
 * Adaptive Schedule Generator (Super Dense v5.0)
 * Uses adaptive density logic for items per day.
 */
function generateDailySchedule(placesPool, days) {
  const shuffledUnique = [...placesPool].sort(() => Math.random() - 0.5);
  const shuffledLeisure = [...commonLeisure].sort(() => Math.random() - 0.5);
  
  const schedule = [];
  let uniqueIndex = 0;
  let leisureOffset = 0;

  // Adaptive Density
  let itemsPerDay = 6;
  if (days <= 3) itemsPerDay = 7;
  else if (days >= 10) itemsPerDay = 5;

  for (let d = 1; d <= days; d++) {
    const dayPlaces = [];
    while (dayPlaces.length < itemsPerDay && uniqueIndex < shuffledUnique.length) {
      dayPlaces.push(shuffledUnique[uniqueIndex]);
      uniqueIndex++;
    }
    while (dayPlaces.length < itemsPerDay) {
        dayPlaces.push({ ...shuffledLeisure[leisureOffset % shuffledLeisure.length], day: d });
        leisureOffset++;
    }
    schedule.push({ day: d, places: dayPlaces });
  }
  return schedule;
}

function generateTravelPlan(destination, budget, days) {
  const key = destination.toLowerCase().trim();
  const data = destinations[key] || { temples: [], hotels: [], restaurants: [], places_pool: [], famous_places: [] };

  const budgetBreakdown = {
    hotels: Math.round(budget * 0.40),
    food: Math.round(budget * 0.30),
    travel: Math.round(budget * 0.30)
  };

  const daily_schedule = generateDailySchedule(data.places_pool, days);

  return {
    destination: destination,
    budget,
    days,
    budget_breakdown: budgetBreakdown,
    daily_schedule,
    temples: data.temples,
    famous_places: data.famous_places || [],
    hotels: data.hotels || [],
    restaurants: data.restaurants || []
  };
}

module.exports = generateTravelPlan;
