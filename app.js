const destinations = [
  {
    id: "tirupati",
    name: "Tirupati Pilgrimage Hub",
    country: "India",
    region: "Andhra Pradesh",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 13.6288,
    lon: 79.4192,
    tags: ["darshan", "ttd", "balaji", "venkateswara", "devotional"],
    subPlaces: [
      "Sri Venkateswara Temple",
      "Padmavathi Temple",
      "Kapila Theertham",
      "Govindaraja Swamy Temple",
    ],
    stays: ["Tirumala cottages", "Temple guest houses", "Family hotels in Tirupati"],
    bookingHint: "TTD slot + accommodation",
    officialBooking: "https://ttdevasthanams.ap.gov.in/",
    assistance: [
      "Check darshan type: Sarva Darshan, Special Entry, Seva tickets.",
      "Recommend nearest route from airport, bus, or rail.",
      "Share queue timings, dress code, and luggage guidelines.",
    ],
  },
  {
    id: "varanasi",
    name: "Varanasi Sacred Corridor",
    country: "India",
    region: "Uttar Pradesh",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 25.3176,
    lon: 82.9739,
    tags: ["kashi", "aarti", "ghats", "shiv temple"],
    subPlaces: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", "Assi Ghat"],
    stays: ["Ghat-view hotels", "Pilgrim lodges", "Boutique stays in old city"],
    bookingHint: "Temple access + guided ghat tour",
    officialBooking: "https://www.shrikashivishwanath.org/",
    assistance: [
      "Reserve priority temple access slots.",
      "Set up evening Ganga aarti experience.",
      "Book local guide for heritage walk.",
    ],
  },
  {
    id: "vatican",
    name: "Vatican City Faith Journey",
    country: "Vatican City",
    region: "Rome",
    continent: "Europe",
    type: "holy",
    spotType: "Church",
    lat: 41.9029,
    lon: 12.4534,
    tags: ["church", "basilica", "catholic", "rome"],
    subPlaces: ["St. Peter's Basilica", "Vatican Museums", "Sistine Chapel", "Vatican Gardens"],
    stays: ["Historic district hotels", "Pilgrim hostels", "Premium city stays"],
    bookingHint: "Church entry + museum pass",
    officialBooking: "https://www.museivaticani.va/",
    assistance: [
      "Book timed entry windows and skip-the-line passes.",
      "Build walking route for all main basilica points.",
      "Add language-based guided tour support.",
    ],
  },
  {
    id: "mecca",
    name: "Makkah Spiritual Route",
    country: "Saudi Arabia",
    region: "Makkah Province",
    continent: "Asia",
    type: "holy",
    spotType: "Mosque",
    lat: 21.4225,
    lon: 39.8262,
    tags: ["umrah", "hajj", "masjid al haram", "pilgrimage"],
    subPlaces: ["Masjid al-Haram", "Jabal al-Nour", "Mina", "Arafat"],
    stays: ["Clock tower hotels", "Pilgrim apartments", "Group accommodation"],
    bookingHint: "Pilgrimage package planning",
    officialBooking: "https://www.nusuk.sa/",
    assistance: [
      "Plan season-aware pilgrimage itinerary.",
      "Coordinate approved transport and local transfers.",
      "Prepare travel and health checklist.",
    ],
  },
  {
    id: "jerusalem",
    name: "Jerusalem Holy Crossroads",
    country: "Israel",
    region: "Jerusalem District",
    continent: "Asia",
    type: "holy",
    spotType: "Mixed Faith",
    lat: 31.7767,
    lon: 35.2345,
    tags: ["church", "mosque", "synagogue", "old city"],
    subPlaces: ["Western Wall", "Church of the Holy Sepulchre", "Al-Aqsa Area", "Mount of Olives"],
    stays: ["Old city hotels", "Faith-center hostels", "Luxury heritage suites"],
    bookingHint: "Multi-faith guided route",
    officialBooking: "https://www.itraveljerusalem.com/",
    assistance: [
      "Craft multi-faith route by timing and access rules.",
      "Suggest local transport and security guidance.",
      "Offer custom language guide options.",
    ],
  },
  {
    id: "bodh-gaya",
    name: "Bodh Gaya Meditation Circuit",
    country: "India",
    region: "Bihar",
    continent: "Asia",
    type: "holy",
    spotType: "Monastery",
    lat: 24.695,
    lon: 84.991,
    tags: ["buddhist", "monastery", "meditation", "mahabodhi"],
    subPlaces: ["Mahabodhi Temple", "Thai Monastery", "Great Buddha Statue", "Meditation Parks"],
    stays: ["Monastery guest houses", "Budget hotels", "Pilgrim dormitories"],
    bookingHint: "Monastery stay + meditation plan",
    officialBooking: "https://www.incredibleindia.gov.in/",
    assistance: [
      "Recommend monastic stays by budget.",
      "Set up meditation and temple visit schedule.",
      "Arrange local transfers from Gaya airport.",
    ],
  },
  {
    id: "ireland-west",
    name: "Ireland Wild Atlantic Journey",
    country: "Ireland",
    region: "County Clare",
    continent: "Europe",
    type: "vacation",
    spotType: "Coast",
    lat: 52.9715,
    lon: -9.4309,
    tags: ["ireland", "cliffs", "atlantic", "road trip", "moher"],
    subPlaces: ["Cliffs of Moher", "Doolin", "Burren National Park", "Galway City"],
    stays: ["Cliff-view hotels", "Countryside B&Bs", "Atlantic coast resorts"],
    bookingHint: "Coastal drive + stay package",
    officialBooking: "https://www.ireland.com/",
    assistance: [
      "Book timed Cliffs of Moher visitor slots and parking.",
      "Recommend Atlantic route with weather-safe timings.",
      "Bundle cliff walk, caves cruise, and local stays.",
    ],
  },
  {
    id: "goa",
    name: "Goa Coastal Escape",
    country: "India",
    region: "Goa",
    continent: "Asia",
    type: "vacation",
    spotType: "Beach",
    lat: 15.2993,
    lon: 74.124,
    tags: ["beach", "nightlife", "water sports", "india vacation"],
    subPlaces: ["Baga Beach", "Calangute Beach", "Palolem Beach", "Dudhsagar Falls"],
    stays: ["Beach resorts", "Boutique villas", "Family hotels"],
    bookingHint: "Beach stay + activity packages",
    officialBooking: "https://www.goatourism.gov.in/",
    assistance: [
      "Match beaches by family, nightlife, or calm vibes.",
      "Book parasailing, scuba, and cruise experiences.",
      "Combine stay + airport transfer package.",
    ],
  },
  {
    id: "bali",
    name: "Bali Island Retreat",
    country: "Indonesia",
    region: "Bali",
    continent: "Asia",
    type: "vacation",
    spotType: "Island",
    lat: -8.4095,
    lon: 115.1889,
    tags: ["indonasia", "indonesia", "island", "retreat", "ubud"],
    subPlaces: ["Ubud Rice Terraces", "Seminyak Beach", "Uluwatu Temple Cliffs", "Nusa Penida"],
    stays: ["Pool villas", "Eco-lodges", "Luxury beachfront resorts"],
    bookingHint: "Villa + island day tours",
    officialBooking: "https://www.indonesia.travel/",
    assistance: [
      "Plan beach + culture + adventure balance.",
      "Book private drivers and island transfer boats.",
      "Suggest family, honeymoon, and group itineraries.",
    ],
  },
  {
    id: "mauritius",
    name: "Mauritius Lagoon Holidays",
    country: "Mauritius",
    region: "Black River",
    continent: "Africa",
    type: "vacation",
    spotType: "Island",
    lat: -20.3484,
    lon: 57.5522,
    tags: ["honeymoon", "island", "lagoon", "beach"],
    subPlaces: ["Le Morne Beach", "Chamarel", "Ile aux Cerfs", "Pamplemousses Garden"],
    stays: ["All-inclusive resorts", "Family beach hotels", "Private villas"],
    bookingHint: "Resort + lagoon excursion",
    officialBooking: "https://mauritiusnow.com/",
    assistance: [
      "Book all-inclusive stays with transfers.",
      "Create island activity planner by age group.",
      "Arrange catamaran and reef excursion slots.",
    ],
  },
  {
    id: "thailand-phuket",
    name: "Phuket and Krabi Beaches",
    country: "Thailand",
    region: "Phuket",
    continent: "Asia",
    type: "vacation",
    spotType: "Beach",
    lat: 7.8804,
    lon: 98.3923,
    tags: ["thailand", "beaches", "islands", "phi phi"],
    subPlaces: ["Patong Beach", "Phi Phi Islands", "Maya Bay", "Krabi Railay Beach"],
    stays: ["Beachfront hotels", "Party district stays", "Luxury island resorts"],
    bookingHint: "Island hopping + beach hotels",
    officialBooking: "https://www.tourismthailand.org/",
    assistance: [
      "Compare nightlife and family-safe zones.",
      "Reserve island hopping and snorkeling trips.",
      "Support ferry and airport transfer booking.",
    ],
  },
  {
    id: "china-beijing",
    name: "Beijing Heritage Discovery",
    country: "China",
    region: "Beijing",
    continent: "Asia",
    type: "vacation",
    spotType: "City",
    lat: 39.9042,
    lon: 116.4074,
    tags: ["china", "history", "great wall", "forbidden city"],
    subPlaces: ["Forbidden City", "Great Wall (Mutianyu)", "Summer Palace", "Temple of Heaven"],
    stays: ["City center hotels", "Business hotels", "Heritage boutique stays"],
    bookingHint: "Attraction passes + city stay",
    officialBooking: "https://english.visitbeijing.com.cn/",
    assistance: [
      "Prioritize attractions by available time.",
      "Book city transport and entry tickets.",
      "Arrange multilingual guide support.",
    ],
  },
  {
    id: "dubai",
    name: "Dubai Urban Luxury",
    country: "United Arab Emirates",
    region: "Dubai",
    continent: "Asia",
    type: "vacation",
    spotType: "City",
    lat: 25.2048,
    lon: 55.2708,
    tags: ["desert safari", "burj khalifa", "shopping", "luxury"],
    subPlaces: ["Burj Khalifa", "Desert Safari", "Palm Jumeirah", "Dubai Marina"],
    stays: ["Skyline hotels", "Palm resorts", "Business bay apartments"],
    bookingHint: "Activity pass + premium stays",
    officialBooking: "https://www.visitdubai.com/",
    assistance: [
      "Set up desert, yacht, and city attraction bundles.",
      "Balance premium and budget stay options.",
      "Optimize transfer routes by traffic windows.",
    ],
  },
  {
    id: "maldives",
    name: "Maldives Coral Getaway",
    country: "Maldives",
    region: "Kaafu Atoll",
    continent: "Asia",
    type: "vacation",
    spotType: "Island",
    lat: 3.2028,
    lon: 73.2207,
    tags: ["overwater villa", "snorkeling", "honeymoon", "island"],
    subPlaces: ["Maafushi", "Male City", "Banana Reef", "Resort Private Islands"],
    stays: ["Overwater villas", "Guest houses", "All-inclusive resorts"],
    bookingHint: "Resort + speedboat/seaplane transfer",
    officialBooking: "https://visitmaldives.com/",
    assistance: [
      "Match atoll and resort by budget and travel style.",
      "Reserve seaplane/speedboat transfer windows.",
      "Create snorkeling and diving activity plan.",
    ],
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps Panorama",
    country: "Switzerland",
    region: "Bernese Oberland",
    continent: "Europe",
    type: "vacation",
    spotType: "Mountain",
    lat: 46.8182,
    lon: 8.2275,
    tags: ["alps", "mountains", "ski", "scenic rail"],
    subPlaces: ["Interlaken", "Jungfraujoch", "Grindelwald", "Lauterbrunnen"],
    stays: ["Mountain chalets", "Scenic hotels", "Ski lodges"],
    bookingHint: "Rail pass + mountain stays",
    officialBooking: "https://www.myswitzerland.com/",
    assistance: [
      "Align itinerary with weather and altitude.",
      "Book mountain rail and pass bundles.",
      "Suggest ski or hiking packages by season.",
    ],
  },
  {
    id: "paris",
    name: "Paris Culture Week",
    country: "France",
    region: "Ile-de-France",
    continent: "Europe",
    type: "vacation",
    spotType: "City",
    lat: 48.8566,
    lon: 2.3522,
    tags: ["museum", "eiffel", "city break", "romance"],
    subPlaces: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Montmartre"],
    stays: ["Central boutique hotels", "Budget city hostels", "Luxury riverfront stays"],
    bookingHint: "Museum passes + city stays",
    officialBooking: "https://parisjetaime.com/eng/",
    assistance: [
      "Book timed entries for top attractions.",
      "Plan metro-optimized daily routes.",
      "Suggest family and romantic itinerary modes.",
    ],
  },
  {
    id: "new-york",
    name: "New York Signature Tour",
    country: "United States",
    region: "New York",
    continent: "North America",
    type: "vacation",
    spotType: "City",
    lat: 40.7128,
    lon: -74.006,
    tags: ["nyc", "broadway", "city pass", "usa"],
    subPlaces: ["Times Square", "Statue of Liberty", "Central Park", "Empire State Building"],
    stays: ["Midtown hotels", "Family suites", "Luxury downtown stays"],
    bookingHint: "City pass + hotel bundle",
    officialBooking: "https://www.nycgo.com/",
    assistance: [
      "Combine city pass with attraction bookings.",
      "Choose neighborhoods by travel priority.",
      "Coordinate airport and local transfers.",
    ],
  },
  {
    id: "cape-town",
    name: "Cape Town Coast Explorer",
    country: "South Africa",
    region: "Western Cape",
    continent: "Africa",
    type: "vacation",
    spotType: "Coast",
    lat: -33.9249,
    lon: 18.4241,
    tags: ["table mountain", "coast", "safari add-on"],
    subPlaces: ["Table Mountain", "Camps Bay", "Cape Point", "V&A Waterfront"],
    stays: ["City waterfront hotels", "Coastal villas", "Adventure lodges"],
    bookingHint: "Coastline trip + city stay",
    officialBooking: "https://www.capetown.travel/",
    assistance: [
      "Blend coastline, city, and wildlife options.",
      "Plan safest transport routes and timings.",
      "Book guided day trips with local operators.",
    ],
  },
  {
    id: "kyoto",
    name: "Kyoto Temple and Culture",
    country: "Japan",
    region: "Kyoto",
    continent: "Asia",
    type: "mixed",
    spotType: "Culture",
    lat: 35.0116,
    lon: 135.7681,
    tags: ["temples", "japan", "heritage", "gardens"],
    subPlaces: ["Fushimi Inari Shrine", "Kiyomizu-dera", "Arashiyama", "Gion"],
    stays: ["Ryokans", "City hotels", "Traditional machiya stays"],
    bookingHint: "Temple route + culture stays",
    officialBooking: "https://kyoto.travel/en",
    assistance: [
      "Prioritize shrine and garden route by crowds.",
      "Book tea and cultural workshop sessions.",
      "Guide rail pass and station transfers.",
    ],
  },
  {
    id: "rishikesh",
    name: "Rishikesh Spiritual Adventure",
    country: "India",
    region: "Uttarakhand",
    continent: "Asia",
    type: "mixed",
    spotType: "Retreat",
    lat: 30.0869,
    lon: 78.2676,
    tags: ["yoga", "ashram", "rafting", "aarti"],
    subPlaces: ["Parmarth Niketan", "Triveni Ghat", "Laxman Jhula", "Neelkanth Mahadev"],
    stays: ["Ashram stays", "Riverside camps", "Wellness resorts"],
    bookingHint: "Retreat + adventure package",
    officialBooking: "https://uttarakhandtourism.gov.in/",
    assistance: [
      "Combine yoga retreats and temple visits.",
      "Book rafting and outdoor experiences safely.",
      "Suggest peaceful stays by the Ganga.",
    ],
  },
];

const dom = {
  searchInput: document.getElementById("searchInput"),
  countryFilter: document.getElementById("countryFilter"),
  regionFilter: document.getElementById("regionFilter"),
  typeFilter: document.getElementById("typeFilter"),
  spotFilter: document.getElementById("spotFilter"),
  placesGrid: document.getElementById("placesGrid"),
  livePlacesGrid: document.getElementById("livePlacesGrid"),
  liveStatus: document.getElementById("liveStatus"),
  useMyLocation: document.getElementById("useMyLocation"),
  liveSearchBtn: document.getElementById("liveSearchBtn"),
  radiusSelect: document.getElementById("radiusSelect"),
  resultCount: document.getElementById("resultCount"),
  destinationSelect: document.getElementById("destinationSelect"),
  subPlaceSelect: document.getElementById("subPlaceSelect"),
  bookingForm: document.getElementById("bookingForm"),
  assistBtn: document.getElementById("assistBtn"),
  assistOutput: document.getElementById("assistOutput"),
  integrationStatusText: document.getElementById("integrationStatusText"),
  bookingRefInput: document.getElementById("bookingRefInput"),
  checkStatusBtn: document.getElementById("checkStatusBtn"),
  detailContent: document.getElementById("detailContent"),
  exploreNow: document.getElementById("exploreNow"),
  quickTirupati: document.getElementById("quickTirupati"),
  quickChips: [...document.querySelectorAll(".chip")],
};

const state = {
  livePlaces: [],
};

const PARTNER_API_CONNECTED = false;
const BACKEND_BASE_URL = "http://localhost:8787";

const keywordAliases = {
  indonasia: "indonesia",
  baali: "bali",
  tirupathi: "tirupati",
  mohr: "moher",
  vacation: "vacation",
  devotional: "holy",
  pilgrimage: "holy",
};
function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function notificationSummaryLines(notifications) {
  if (!Array.isArray(notifications) || !notifications.length) {
    return ["Notifications: not available"]; 
  }

  return notifications.map(
    (item) =>
      `${item.channel.toUpperCase()}: ${item.status}${item.detail ? ` (${item.detail})` : ""}`
  );
}

function normalizeToken(token) {
  const clean = normalizeText(token);
  return keywordAliases[clean] || clean;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function setSelectOptions(selectNode, values, allLabel) {
  selectNode.innerHTML = "";
  if (allLabel) {
    selectNode.add(new Option(allLabel, "all"));
  }
  values.forEach((value) => selectNode.add(new Option(value, value)));
}

function buildFilters() {
  setSelectOptions(dom.countryFilter, uniqueSorted(destinations.map((d) => d.country)), "All Countries");
  setSelectOptions(dom.regionFilter, uniqueSorted(destinations.map((d) => d.region)), "All Regions");
  setSelectOptions(dom.spotFilter, uniqueSorted(destinations.map((d) => d.spotType)), "All Categories");
}

function buildDestinationOptions() {
  dom.destinationSelect.innerHTML = "";
  destinations.forEach((d) => {
    dom.destinationSelect.add(new Option(`${d.name} - ${d.region}, ${d.country}`, d.id));
  });
}

function updateSubPlaceOptions(destination) {
  dom.subPlaceSelect.innerHTML = "";
  destination.subPlaces.forEach((spot) => {
    dom.subPlaceSelect.add(new Option(spot, spot));
  });
}

function getSearchTokens() {
  const raw = normalizeText(dom.searchInput.value);
  if (!raw) return [];
  return raw.split(" ").map(normalizeToken).filter(Boolean);
}

function getFilteredDestinations() {
  const tokens = getSearchTokens();
  const country = dom.countryFilter.value;
  const region = dom.regionFilter.value;
  const type = dom.typeFilter.value;
  const spot = dom.spotFilter.value;

  return destinations.filter((place) => {
    const searchable = normalizeText(
      [
        place.name,
        place.country,
        place.region,
        place.type,
        place.spotType,
        place.continent,
        ...place.tags,
        ...place.subPlaces,
        ...place.stays,
      ].join(" ")
    );

    const textOk = tokens.every((token) => searchable.includes(token));
    const countryOk = country === "all" || place.country === country;
    const regionOk = region === "all" || place.region === region;
    const typeOk = type === "all" || place.type === type;
    const spotOk = spot === "all" || place.spotType === spot;

    return textOk && countryOk && regionOk && typeOk && spotOk;
  });
}

function badgeText(place) {
  if (place.type === "holy") return "Devotional";
  if (place.type === "vacation") return "Vacation";
  return "Mixed";
}

function cardTemplate(place) {
  const highlights = place.subPlaces.slice(0, 3).map((spot) => `<li>${spot}</li>`).join("");
  return `
    <article class="place-card">
      <div class="place-top">
        <h4>${place.name}</h4>
        <span class="type-pill">${badgeText(place)}</span>
      </div>
      <p>${place.region}, ${place.country} (${place.continent})</p>
      <p class="coords">Lat: ${place.lat.toFixed(4)} | Lon: ${place.lon.toFixed(4)} | ${place.spotType}</p>
      <ul class="micro-list">${highlights}</ul>
      <button class="btn btn-ghost" data-select="${place.id}">View and Book</button>
    </article>
  `;
}

function renderDetail(place) {
  const placeList = place.subPlaces.map((spot) => `<li>${spot}</li>`).join("");
  const stayList = place.stays.map((stay) => `<li>${stay}</li>`).join("");

  dom.detailContent.innerHTML = `
    <article class="detail-card">
      <h4>${place.name}</h4>
      <div class="meta-grid">
        <div class="meta-item"><b>Country</b>${place.country}</div>
        <div class="meta-item"><b>Region</b>${place.region}</div>
        <div class="meta-item"><b>Type</b>${badgeText(place)}</div>
        <div class="meta-item"><b>Category</b>${place.spotType}</div>
      </div>
      <p><b>Top places to book:</b></p>
      <ul>${placeList}</ul>
      <a class="book-link" href="${place.officialBooking}" target="_blank" rel="noopener">Official booking / tourism portal</a>
    </article>
    <article class="detail-card">
      <h4>Stay and Assistance</h4>
      <p><b>Accommodation ideas:</b></p>
      <ul>${stayList}</ul>
      <p><b>Best package format:</b> ${place.bookingHint}</p>
      <p><b>Geo coordinates:</b> ${place.lat}, ${place.lon}</p>
    </article>
  `;
}

function renderPlaces() {
  const filtered = getFilteredDestinations();
  dom.resultCount.textContent = `${filtered.length} destinations found`;

  if (!filtered.length) {
    dom.placesGrid.innerHTML = "<p>No destinations match this search. Try country, region, or a broader keyword.</p>";
    return;
  }

  dom.placesGrid.innerHTML = filtered.map(cardTemplate).join("");
}

function selectDestination(id) {
  const destination = destinations.find((d) => d.id === id);
  if (!destination) return;

  dom.destinationSelect.value = id;
  updateSubPlaceOptions(destination);
  renderDetail(destination);

  document.getElementById("book").scrollIntoView({ behavior: "smooth", block: "start" });
}

function activeDestination() {
  return destinations.find((d) => d.id === dom.destinationSelect.value) || destinations[0];
}

function generateAssistancePlan(place) {
  const today = new Date().toLocaleDateString();
  const selectedSpot = dom.subPlaceSelect.value || place.subPlaces[0];

  const details = [
    `Assistance Plan (${today})`,
    `Destination: ${place.name}`,
    `Selected Spot: ${selectedSpot}`,
    `Region: ${place.region}, ${place.country}`,
    `Category: ${badgeText(place)} / ${place.spotType}`,
    `Coordinates: ${place.lat}, ${place.lon}`,
    "",
    "Suggested support actions:",
    ...place.assistance.map((tip, i) => `${i + 1}. ${tip}`),
    "",
    `Accommodation suggestions: ${place.stays.join(", ")}`,
    "Next: Complete booking form to receive final trip references.",
  ];

  dom.assistOutput.textContent = details.join("\n");
}

function setQuickChip(type) {
  dom.quickChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.chip === type);
  });
}

function classifyLiveType(title) {
  const value = normalizeText(title);
  const holyKeywords = ["temple", "church", "mosque", "cathedral", "shrine", "monastery", "basilica"];
  const vacationKeywords = ["beach", "island", "park", "museum", "resort", "tower", "marina", "waterfront"];

  if (holyKeywords.some((word) => value.includes(word))) return "holy";
  if (vacationKeywords.some((word) => value.includes(word))) return "vacation";
  return "mixed";
}

function liveCardTemplate(place) {
  return `
    <article class="place-card live-card">
      <div class="place-top">
        <h4>${place.title}</h4>
        <span class="type-pill">Live</span>
      </div>
      <p>${place.display}</p>
      <p class="coords">Lat: ${place.lat.toFixed(4)} | Lon: ${place.lon.toFixed(4)} | ${badgeText({ type: place.type })}</p>
      <button class="btn btn-ghost" data-live-select="${place.id}">Book This Live Place</button>
    </article>
  `;
}

function renderLivePlaces() {
  const visiblePlaces = applyTypeFilterToLive(state.livePlaces);

  if (!visiblePlaces.length) {
    dom.livePlacesGrid.innerHTML = "";
    return;
  }

  dom.livePlacesGrid.innerHTML = visiblePlaces.map(liveCardTemplate).join("");
}

function radiusMeters() {
  return Number(dom.radiusSelect.value || "10") * 1000;
}

async function fetchNearbyWiki(lat, lon) {
  const radius = radiusMeters();
  const limit = 25;
  const url =
    `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lon}` +
    `&gsradius=${radius}&gslimit=${limit}&format=json&origin=*`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not load nearby places from live source.");

  const data = await response.json();
  return (data?.query?.geosearch || []).map((item) => {
    const placeType = classifyLiveType(item.title);
    return {
      id: `live-${item.pageid}`,
      title: item.title,
      lat: item.lat,
      lon: item.lon,
      type: placeType,
      display: `${Math.round(item.dist)}m away`,
      source: "wikipedia-geosearch",
    };
  });
}

async function geocodeQuery(query) {
  const url =
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not geocode the query.");

  const results = await response.json();
  if (!results.length) return null;

  return {
    lat: Number(results[0].lat),
    lon: Number(results[0].lon),
    label: results[0].display_name,
  };
}

function applyTypeFilterToLive(places) {
  const selectedType = dom.typeFilter.value;
  if (selectedType === "all") return places;
  return places.filter((p) => p.type === selectedType || p.type === "mixed");
}

function attachLiveDestination(livePlace) {
  const existing = destinations.find((d) => d.id === livePlace.id);
  if (!existing) {
    destinations.push({
      id: livePlace.id,
      name: livePlace.title,
      country: "Live Discovery",
      region: "Geo Located",
      continent: "Global",
      type: livePlace.type,
      spotType: "Live Place",
      lat: livePlace.lat,
      lon: livePlace.lon,
      tags: ["live", "dynamic", "geo"],
      subPlaces: [livePlace.title],
      stays: ["Partner hotel API required", "Aggregator API required", "Direct supplier API required"],
      bookingHint: "Requires connected partner booking API",
      officialBooking: "https://www.openstreetmap.org/",
      assistance: [
        "Validate supplier for this place using partner API catalogs.",
        "Create booking request with supplier mapping ID.",
        "Enable SMS/email callback from provider webhook.",
      ],
      source: "live",
    });
  }

  if (![...dom.destinationSelect.options].some((opt) => opt.value === livePlace.id)) {
    dom.destinationSelect.add(new Option(`${livePlace.title} - Live Geo Result`, livePlace.id));
  }

  selectDestination(livePlace.id);
}

function storeLocalBooking(booking) {
  const key = "globetirtha_local_bookings";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(booking);
  localStorage.setItem(key, JSON.stringify(existing));
}

function readLocalBooking(referenceId) {
  const key = "globetirtha_local_bookings";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  return existing.find((item) => item.id === referenceId) || null;
}

async function createBooking(payload) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Booking API unavailable");
    const data = await response.json();
    return { ...data, mode: "backend" };
  } catch (_error) {
    const localId = `LOCAL-${Date.now()}`;
    const localBooking = {
      id: localId,
      status: "PENDING_PARTNER_CONFIRMATION",
      destinationName: payload.destinationName,
      spot: payload.spot,
      createdAt: new Date().toISOString(),
    };
    storeLocalBooking(localBooking);
    return { ...localBooking, mode: "local" };
  }
}

async function fetchBookingStatus(referenceId) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/bookings/${encodeURIComponent(referenceId)}`);
    if (!response.ok) throw new Error("Status API unavailable");
    const booking = await response.json();
    return { ...booking, mode: "backend" };
  } catch (_error) {
    const local = readLocalBooking(referenceId);
    if (!local) return null;
    return { ...local, mode: "local" };
  }
}

async function runLiveQuerySearch() {
  const query = dom.searchInput.value.trim();
  if (!query) {
    dom.liveStatus.textContent = "Enter a location name first (example: Dubai, Qatar, Tokyo).";
    return;
  }

  dom.liveStatus.textContent = `Finding coordinates for: ${query} ...`;
  try {
    const center = await geocodeQuery(query);
    if (!center) {
      state.livePlaces = [];
      renderLivePlaces();
      dom.liveStatus.textContent = "No live geo match found for this query.";
      return;
    }

    dom.liveStatus.textContent = `Fetching live places near ${center.label} ...`;
    const nearby = await fetchNearbyWiki(center.lat, center.lon);
    state.livePlaces = applyTypeFilterToLive(nearby);
    renderLivePlaces();
    dom.liveStatus.textContent = `Live results loaded for ${center.label}.`;
  } catch (error) {
    state.livePlaces = [];
    renderLivePlaces();
    dom.liveStatus.textContent = `Live mode error: ${error.message}`;
  }
}

async function runLiveCurrentLocationSearch() {
  if (!navigator.geolocation) {
    dom.liveStatus.textContent = "Geolocation is not supported by this browser.";
    return;
  }

  dom.liveStatus.textContent = "Getting your location...";
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        dom.liveStatus.textContent = `Fetching places near ${latitude.toFixed(4)}, ${longitude.toFixed(4)} ...`;
        const nearby = await fetchNearbyWiki(latitude, longitude);
        state.livePlaces = applyTypeFilterToLive(nearby);
        renderLivePlaces();
        dom.liveStatus.textContent = `Live places loaded around your current location.`;
      } catch (error) {
        state.livePlaces = [];
        renderLivePlaces();
        dom.liveStatus.textContent = `Live mode error: ${error.message}`;
      }
    },
    () => {
      dom.liveStatus.textContent = "Location permission denied. You can still use Live Geo Search by query.";
    }
  );
}

function bindEvents() {
  [dom.searchInput, dom.countryFilter, dom.regionFilter, dom.typeFilter, dom.spotFilter].forEach((node) => {
    node.addEventListener("input", renderPlaces);
    node.addEventListener("change", renderPlaces);
  });

  dom.quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const selected = chip.dataset.chip;
      dom.typeFilter.value = selected;
      setQuickChip(selected);
      renderPlaces();
      renderLivePlaces();
    });
  });

  dom.destinationSelect.addEventListener("change", () => {
    const place = activeDestination();
    updateSubPlaceOptions(place);
    renderDetail(place);
    generateAssistancePlan(place);
  });

  dom.placesGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.dataset.select;
    if (!id) return;
    selectDestination(id);
  });

  dom.livePlacesGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.dataset.liveSelect;
    if (!id) return;

    const livePlace = state.livePlaces.find((place) => place.id === id);
    if (!livePlace) return;
    attachLiveDestination(livePlace);
    generateAssistancePlan(activeDestination());
  });

  dom.bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const destination = activeDestination();
    if (!destination) return;

    const name = document.getElementById("fullName").value.trim();
    const date = document.getElementById("travelDate").value;
    const purpose = document.getElementById("purposeSelect").value;
    const spot = dom.subPlaceSelect.value;
    const accommodationNights = Number(document.getElementById("accommodationNights").value || 0);
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const notes = document.getElementById("notes").value.trim();

    const createdBooking = await createBooking({
      destinationId: destination.id,
      destinationName: destination.name,
      spot,
      date,
      purpose,
      accommodationNights,
      customer: { name, email, phone },
      notes,
      source: destination.source || "catalog",
    });

    const isOfficial = createdBooking.status === "CONFIRMED_BY_PROVIDER";
    const firstLine = isOfficial
      ? `Official booking confirmed for ${name}.`
      : `Booking request received for ${name}.`;

    const cautionLine = isOfficial
      ? "Provider confirmation received. You can proceed with confidence."
      : "Do not travel until status is CONFIRMED_BY_PROVIDER and official provider reference is issued.";

    dom.assistOutput.textContent =
      `${firstLine}\n` +
      `Reference: ${createdBooking.id}\n` +
      `Status: ${createdBooking.status}\n` +
      `Payment: ${createdBooking.paymentStatus || "PENDING"}\n` +
      `Destination: ${destination.name}\n` +
      `Spot: ${spot}\n` +
      `Accommodation nights: ${accommodationNights}\n` +
      `Date: ${date}\n` +
      `Purpose: ${purpose}\n` +
      `Max confirmation window: ${createdBooking.sla?.globalMaxWaitMinutes || "N/A"} minutes\n` +
      `ETA remaining: ${createdBooking.etaMinutesRemaining ?? "N/A"} minutes\n` +
      `Stay suggestions: ${destination.stays.join(", ")}\n` +
      `${notificationSummaryLines(createdBooking.notifications).join("\n")}\n\n` +
      `${cautionLine}\n` +
      "Updates are sent only after provider webhook/API confirmation.";

    if (PARTNER_API_CONNECTED || createdBooking.mode === "backend") {
      dom.integrationStatusText.textContent =
        "Provider pipeline mode: booking request stored and waiting for external provider confirmation callback.";
    } else {
      dom.integrationStatusText.textContent =
        "Local fallback mode: booking stored on this device only. Connect backend + partner APIs for official global confirmations.";
    }

    dom.bookingForm.reset();
    dom.destinationSelect.value = destination.id;
    updateSubPlaceOptions(destination);
    dom.bookingRefInput.value = createdBooking.id;
  });

  dom.checkStatusBtn.addEventListener("click", async () => {
    const referenceId = dom.bookingRefInput.value.trim();
    if (!referenceId) {
      dom.assistOutput.textContent = "Enter a booking reference first.";
      return;
    }

    const booking = await fetchBookingStatus(referenceId);
    if (!booking) {
      dom.assistOutput.textContent = "Reference not found. Verify the booking ID or provider callback status.";
      return;
    }

    dom.assistOutput.textContent =
      `Booking Reference: ${booking.id}\n` +
      `Current Status: ${booking.status}\n` +
      `Payment: ${booking.paymentStatus || "N/A"}\n` +
      `Destination: ${booking.destinationName || "N/A"}\n` +
      `Spot: ${booking.spot || "N/A"}\n` +
      `Elapsed wait: ${booking.elapsedMinutes ?? "N/A"} minutes\n` +
      `ETA remaining: ${booking.etaMinutesRemaining ?? "N/A"} minutes\n` +
      `Channel: ${booking.mode === "backend" ? "Backend API" : "Local Fallback"}\n` +
      `${notificationSummaryLines(booking.notifications).join("\n")}\n\n` +
      `Next action: ${booking.nextAction || "Wait for provider callback"}\n\n` +
      "Official travel should proceed only when status is CONFIRMED_BY_PROVIDER.";
  });

  dom.assistBtn.addEventListener("click", () => {
    generateAssistancePlan(activeDestination());
  });

  dom.exploreNow.addEventListener("click", () => {
    document.getElementById("discover").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  dom.quickTirupati.addEventListener("click", () => {
    selectDestination("tirupati");
    generateAssistancePlan(activeDestination());
  });

  dom.liveSearchBtn.addEventListener("click", runLiveQuerySearch);
  dom.useMyLocation.addEventListener("click", runLiveCurrentLocationSearch);
  dom.radiusSelect.addEventListener("change", () => {
    if (state.livePlaces.length) {
      dom.liveStatus.textContent = "Radius changed. Run live search again to refresh nearby places.";
    }
  });
}

function init() {
  buildFilters();
  buildDestinationOptions();
  dom.typeFilter.value = "all";
  setQuickChip("all");

  const initial = destinations[0];
  dom.destinationSelect.value = initial.id;
  updateSubPlaceOptions(initial);
  renderDetail(initial);
  renderPlaces();
  generateAssistancePlan(initial);
  bindEvents();
}

init();
