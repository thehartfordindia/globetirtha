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
  {
    id: "amritsar",
    name: "Amritsar Golden Temple",
    country: "India",
    region: "Punjab",
    continent: "Asia",
    type: "holy",
    spotType: "Gurudwara",
    lat: 31.62,
    lon: 74.8765,
    tags: ["sikh", "golden temple", "harmandir sahib", "langar", "devotional"],
    subPlaces: ["Harmandir Sahib", "Akal Takht", "Jallianwala Bagh", "Durgiana Temple"],
    stays: ["Sarai guest houses", "Heritage hotels", "City stays near temple"],
    bookingHint: "Darshan slot + langar + heritage walk",
    officialBooking: "https://sgpc.net/",
    assistance: [
      "Guide early-morning Palki Sahib ceremony timings.",
      "Explain head-covering and etiquette in the complex.",
      "Add Wagah border and Jallianwala Bagh visits.",
    ],
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi Yatra",
    country: "India",
    region: "Jammu & Kashmir",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 33.0303,
    lon: 74.9497,
    tags: ["mata rani", "hindu", "trek", "shakti peeth", "devotional"],
    subPlaces: ["Bhawan (Main Cave)", "Ardhkuwari", "Bhairon Temple", "Katra Base"],
    stays: ["Katra hotels", "Bhawan guest houses", "Yatri niwas"],
    bookingHint: "Yatra slip + helicopter + stay",
    officialBooking: "https://www.maavaishnodevi.org/",
    assistance: [
      "Book yatra registration and helicopter tickets.",
      "Advise trek vs battery-car vs pony options.",
      "Plan weather-safe darshan timing.",
    ],
  },
  {
    id: "shirdi",
    name: "Shirdi Sai Baba Darshan",
    country: "India",
    region: "Maharashtra",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 19.7645,
    lon: 74.4776,
    tags: ["sai baba", "hindu", "darshan", "devotional"],
    subPlaces: ["Samadhi Mandir", "Dwarkamai", "Chavadi", "Shani Shingnapur"],
    stays: ["Sansthan bhakta niwas", "Family hotels", "Premium stays"],
    bookingHint: "Darshan pass + aarti + stay",
    officialBooking: "https://online.sai.org.in/",
    assistance: [
      "Reserve aarti and special darshan slots.",
      "Guide nearby Shani Shingnapur day trip.",
      "Arrange Sansthan accommodation.",
    ],
  },
  {
    id: "kedarnath",
    name: "Kedarnath Char Dham",
    country: "India",
    region: "Uttarakhand",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 30.7346,
    lon: 79.0669,
    tags: ["shiva", "char dham", "himalaya", "trek", "jyotirlinga"],
    subPlaces: ["Kedarnath Temple", "Bhairavnath Temple", "Gaurikund", "Vasuki Tal"],
    stays: ["GMVN camps", "Guest houses", "Base-town lodges"],
    bookingHint: "Char Dham registration + helicopter + trek",
    officialBooking: "https://badrinath-kedarnath.gov.in/",
    assistance: [
      "Complete mandatory Char Dham registration.",
      "Book helicopter and trek support for elders.",
      "Advise seasonal opening and weather windows.",
    ],
  },
  {
    id: "puri",
    name: "Puri Jagannath Dham",
    country: "India",
    region: "Odisha",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 19.8048,
    lon: 85.8181,
    tags: ["jagannath", "rath yatra", "hindu", "char dham", "devotional"],
    subPlaces: ["Jagannath Temple", "Puri Beach", "Konark Sun Temple", "Gundicha Temple"],
    stays: ["Sea-facing hotels", "Dharamshala", "Family lodges"],
    bookingHint: "Darshan + Rath Yatra + Konark tour",
    officialBooking: "https://jagannath.nic.in/",
    assistance: [
      "Plan around Rath Yatra crowd management.",
      "Add Konark Sun Temple heritage visit.",
      "Guide temple entry rules for visitors.",
    ],
  },
  {
    id: "madurai",
    name: "Madurai Meenakshi Temple",
    country: "India",
    region: "Tamil Nadu",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 9.9195,
    lon: 78.1193,
    tags: ["meenakshi", "dravidian", "hindu", "gopuram", "devotional"],
    subPlaces: ["Meenakshi Amman Temple", "Thousand Pillar Hall", "Thirumalai Nayakkar Palace", "Alagar Koil"],
    stays: ["Heritage hotels", "Temple-side stays", "Business hotels"],
    bookingHint: "Darshan + heritage architecture tour",
    officialBooking: "https://maduraimeenakshi.tnhrce.in/",
    assistance: [
      "Time visits around temple ceremonies.",
      "Arrange guided architecture and history walk.",
      "Suggest nearby palace and shrine circuit.",
    ],
  },
  {
    id: "madinah",
    name: "Madinah Ziyarat",
    country: "Saudi Arabia",
    region: "Al Madinah",
    continent: "Asia",
    type: "holy",
    spotType: "Mosque",
    lat: 24.4686,
    lon: 39.6142,
    tags: ["islam", "prophet mosque", "ziyarat", "umrah", "pilgrimage"],
    subPlaces: ["Al-Masjid an-Nabawi", "Quba Mosque", "Mount Uhud", "Qiblatain Mosque"],
    stays: ["Haram-view hotels", "Pilgrim hotels", "Premium suites"],
    bookingHint: "Ziyarat + Umrah linkage + stay",
    officialBooking: "https://nusuk.sa/",
    assistance: [
      "Coordinate Madinah–Makkah travel for Umrah.",
      "Guide ziyarat sites and etiquette.",
      "Book Haram-proximity accommodation.",
    ],
  },
  {
    id: "karbala",
    name: "Karbala & Najaf Pilgrimage",
    country: "Iraq",
    region: "Karbala",
    continent: "Asia",
    type: "holy",
    spotType: "Shrine",
    lat: 32.6167,
    lon: 44.0333,
    tags: ["shia", "islam", "imam hussain", "ziyarat", "arbaeen"],
    subPlaces: ["Imam Hussain Shrine", "Al-Abbas Shrine", "Imam Ali Shrine (Najaf)", "Wadi-us-Salaam"],
    stays: ["Pilgrim hotels", "Guest houses", "Group lodges"],
    bookingHint: "Ziyarat + Arbaeen support + stay",
    officialBooking: "https://www.iraqivisa.iq/",
    assistance: [
      "Advise Arbaeen season logistics and safety.",
      "Coordinate Karbala–Najaf transfers.",
      "Guide visa and group travel steps.",
    ],
  },
  {
    id: "lourdes",
    name: "Lourdes Sanctuary",
    country: "France",
    region: "Occitanie",
    continent: "Europe",
    type: "holy",
    spotType: "Church",
    lat: 43.0968,
    lon: -0.0459,
    tags: ["catholic", "marian", "healing", "grotto", "pilgrimage"],
    subPlaces: ["Grotto of Massabielle", "Rosary Basilica", "Baths", "Candlelight Procession"],
    stays: ["Pilgrim hotels", "Sanctuary lodges", "City hotels"],
    bookingHint: "Sanctuary access + procession + stay",
    officialBooking: "https://www.lourdes-france.org/en/",
    assistance: [
      "Plan candlelight and Eucharistic processions.",
      "Arrange accessible support for the sick.",
      "Guide baths and grotto visit timings.",
    ],
  },
  {
    id: "fatima",
    name: "Fatima Sanctuary",
    country: "Portugal",
    region: "Santarem",
    continent: "Europe",
    type: "holy",
    spotType: "Church",
    lat: 39.6317,
    lon: -8.6722,
    tags: ["catholic", "marian", "apparition", "pilgrimage"],
    subPlaces: ["Chapel of Apparitions", "Basilica of the Holy Trinity", "Basilica of Our Lady", "Candle Offering"],
    stays: ["Pilgrim hotels", "Guest houses", "City stays"],
    bookingHint: "Sanctuary visit + procession + stay",
    officialBooking: "https://www.fatima.pt/en",
    assistance: [
      "Time visits around major apparition dates.",
      "Guide candlelight processions and Masses.",
      "Add Lisbon and Nazare day trips.",
    ],
  },
  {
    id: "santiago",
    name: "Santiago de Compostela (Camino)",
    country: "Spain",
    region: "Galicia",
    continent: "Europe",
    type: "holy",
    spotType: "Cathedral",
    lat: 42.8805,
    lon: -8.5457,
    tags: ["catholic", "camino", "st james", "pilgrim walk", "unesco"],
    subPlaces: ["Santiago Cathedral", "Praza do Obradoiro", "Camino Trails", "Pilgrim Office"],
    stays: ["Albergues", "Boutique hotels", "Pilgrim hostels"],
    bookingHint: "Camino route + credential + stays",
    officialBooking: "https://catedraldesantiago.es/en/",
    assistance: [
      "Plan Camino stages and pilgrim credential.",
      "Arrange stage-wise albergue bookings.",
      "Guide Compostela certificate collection.",
    ],
  },
  {
    id: "lumbini",
    name: "Lumbini Buddha Birthplace",
    country: "Nepal",
    region: "Lumbini Province",
    continent: "Asia",
    type: "holy",
    spotType: "Monastery",
    lat: 27.4833,
    lon: 83.2764,
    tags: ["buddhist", "buddha birthplace", "unesco", "meditation"],
    subPlaces: ["Maya Devi Temple", "Sacred Garden", "Ashoka Pillar", "World Peace Pagoda"],
    stays: ["Monastery guest houses", "Eco lodges", "Pilgrim hotels"],
    bookingHint: "Sacred garden + monastery circuit",
    officialBooking: "https://www.lumbinidevtrust.gov.np/",
    assistance: [
      "Guide the international monastery zone tour.",
      "Arrange meditation and chanting sessions.",
      "Add Kapilvastu heritage day trip.",
    ],
  },
  {
    id: "kathmandu",
    name: "Kathmandu Pashupatinath",
    country: "Nepal",
    region: "Bagmati",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 27.7106,
    lon: 85.3489,
    tags: ["shiva", "hindu", "pashupatinath", "aarti", "unesco"],
    subPlaces: ["Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath", "Bagmati Ghats"],
    stays: ["Thamel hotels", "Heritage stays", "Guest houses"],
    bookingHint: "Temple darshan + aarti + heritage",
    officialBooking: "https://pashupatinathtemple.org/",
    assistance: [
      "Time the evening Bagmati aarti.",
      "Combine Hindu and Buddhist heritage sites.",
      "Guide entry norms for the inner temple.",
    ],
  },
  {
    id: "bethlehem",
    name: "Bethlehem Nativity Journey",
    country: "Palestine",
    region: "West Bank",
    continent: "Asia",
    type: "holy",
    spotType: "Church",
    lat: 31.7054,
    lon: 35.2024,
    tags: ["christian", "nativity", "jesus", "pilgrimage"],
    subPlaces: ["Church of the Nativity", "Manger Square", "Milk Grotto", "Shepherds' Field"],
    stays: ["Pilgrim hotels", "Guest houses", "Heritage stays"],
    bookingHint: "Nativity sites + Jerusalem linkage",
    officialBooking: "https://www.travelpalestine.ps/",
    assistance: [
      "Coordinate Bethlehem–Jerusalem transfers.",
      "Guide Nativity and Shepherds' Field visits.",
      "Advise crossing and access logistics.",
    ],
  },
  {
    id: "meteora",
    name: "Meteora Monasteries",
    country: "Greece",
    region: "Thessaly",
    continent: "Europe",
    type: "holy",
    spotType: "Monastery",
    lat: 39.7217,
    lon: 21.6306,
    tags: ["orthodox", "monastery", "cliff", "unesco", "byzantine"],
    subPlaces: ["Great Meteoron", "Varlaam Monastery", "Roussanou", "Holy Trinity"],
    stays: ["Kalabaka hotels", "Guest houses", "Cliff-view stays"],
    bookingHint: "Monastery circuit + heritage tour",
    officialBooking: "https://www.visitmeteora.travel/",
    assistance: [
      "Plan monastery opening days and dress code.",
      "Arrange sunrise and sunset viewpoints.",
      "Guide hiking vs driving routes.",
    ],
  },
  {
    id: "guadalupe",
    name: "Basilica of Guadalupe",
    country: "Mexico",
    region: "Mexico City",
    continent: "Americas",
    type: "holy",
    spotType: "Basilica",
    lat: 19.4847,
    lon: -99.1177,
    tags: ["catholic", "marian", "guadalupe", "pilgrimage"],
    subPlaces: ["New Basilica", "Old Basilica", "Tepeyac Hill", "Tilma of Juan Diego"],
    stays: ["City hotels", "Pilgrim stays", "Boutique hotels"],
    bookingHint: "Basilica visit + city heritage",
    officialBooking: "https://virgendeguadalupe.org.mx/",
    assistance: [
      "Time visits around December feast crowds.",
      "Guide the moving-walkway tilma viewing.",
      "Add Mexico City heritage day tour.",
    ],
  },
  {
    id: "assisi",
    name: "Assisi & St. Francis",
    country: "Italy",
    region: "Umbria",
    continent: "Europe",
    type: "holy",
    spotType: "Basilica",
    lat: 43.0707,
    lon: 12.6196,
    tags: ["catholic", "st francis", "basilica", "unesco"],
    subPlaces: ["Basilica of St. Francis", "Basilica of St. Clare", "Hermitage of the Carceri", "Santa Maria degli Angeli"],
    stays: ["Hilltop hotels", "Convent stays", "Boutique inns"],
    bookingHint: "Basilica route + hermitage walk",
    officialBooking: "https://www.assisiofm.it/en/",
    assistance: [
      "Guide frescoes and basilica timings.",
      "Arrange peaceful hermitage visits.",
      "Add Rome and Florence rail links.",
    ],
  },
  {
    id: "angkor",
    name: "Angkor Wat Temple City",
    country: "Cambodia",
    region: "Siem Reap",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 13.4125,
    lon: 103.867,
    tags: ["hindu", "buddhist", "angkor", "unesco", "heritage"],
    subPlaces: ["Angkor Wat", "Bayon Temple", "Ta Prohm", "Banteay Srei"],
    stays: ["Siem Reap resorts", "Boutique hotels", "Heritage stays"],
    bookingHint: "Temple pass + sunrise tour",
    officialBooking: "https://www.angkorenterprise.gov.kh/",
    assistance: [
      "Book Angkor pass and sunrise slots.",
      "Plan multi-temple routes by distance.",
      "Arrange guide for Khmer history.",
    ],
  },
  {
    id: "borobudur",
    name: "Borobudur Buddhist Temple",
    country: "Indonesia",
    region: "Central Java",
    continent: "Asia",
    type: "holy",
    spotType: "Monastery",
    lat: -7.6079,
    lon: 110.2038,
    tags: ["buddhist", "borobudur", "unesco", "stupa", "heritage"],
    subPlaces: ["Borobudur Temple", "Mendut Temple", "Pawon Temple", "Prambanan"],
    stays: ["Yogyakarta hotels", "Eco resorts", "Heritage stays"],
    bookingHint: "Temple pass + sunrise + Prambanan",
    officialBooking: "https://borobudurpark.com/en/",
    assistance: [
      "Book sunrise entry and study tour.",
      "Combine Borobudur and Prambanan visits.",
      "Guide respectful stupa circumambulation.",
    ],
  },
  {
    id: "lhasa",
    name: "Lhasa Potala Palace",
    country: "China",
    region: "Tibet",
    continent: "Asia",
    type: "holy",
    spotType: "Monastery",
    lat: 29.6558,
    lon: 91.1171,
    tags: ["buddhist", "tibetan", "potala", "unesco", "himalaya"],
    subPlaces: ["Potala Palace", "Jokhang Temple", "Barkhor Street", "Sera Monastery"],
    stays: ["Lhasa hotels", "Guest houses", "Heritage stays"],
    bookingHint: "Palace permit + monastery circuit",
    officialBooking: "https://en.tibet.cn/",
    assistance: [
      "Arrange Tibet travel permits.",
      "Advise altitude acclimatization plan.",
      "Guide Jokhang and pilgrim kora routes.",
    ],
  },
  {
    id: "ise",
    name: "Ise Grand Shrine",
    country: "Japan",
    region: "Mie",
    continent: "Asia",
    type: "holy",
    spotType: "Shrine",
    lat: 34.4549,
    lon: 136.7256,
    tags: ["shinto", "ise jingu", "amaterasu", "pilgrimage"],
    subPlaces: ["Naiku (Inner Shrine)", "Geku (Outer Shrine)", "Uji Bridge", "Oharaimachi"],
    stays: ["Ryokans", "City hotels", "Traditional stays"],
    bookingHint: "Shrine circuit + cultural walk",
    officialBooking: "https://www.isejingu.or.jp/en/",
    assistance: [
      "Guide Geku-then-Naiku visiting order.",
      "Explain purification and shrine etiquette.",
      "Add Oharaimachi food street stroll.",
    ],
  },
  {
    id: "kandy",
    name: "Kandy Temple of the Tooth",
    country: "Sri Lanka",
    region: "Central Province",
    continent: "Asia",
    type: "holy",
    spotType: "Temple",
    lat: 7.2936,
    lon: 80.6413,
    tags: ["buddhist", "sacred tooth", "esala perahera", "unesco"],
    subPlaces: ["Sri Dalada Maligawa", "Kandy Lake", "Royal Botanical Gardens", "Bahirawakanda Buddha"],
    stays: ["Lake-view hotels", "Heritage bungalows", "City stays"],
    bookingHint: "Temple visit + Perahera + hill tour",
    officialBooking: "https://sridaladamaligawa.lk/",
    assistance: [
      "Time visits around Esala Perahera festival.",
      "Guide puja ceremony timings.",
      "Add tea-country and garden day trips.",
    ],
  },
  {
    id: "london",
    name: "London Icons Tour",
    country: "United Kingdom",
    region: "England",
    continent: "Europe",
    type: "vacation",
    spotType: "City",
    lat: 51.5074,
    lon: -0.1278,
    tags: ["london", "big ben", "museums", "royal"],
    subPlaces: ["Tower of London", "Buckingham Palace", "British Museum", "London Eye"],
    stays: ["Central hotels", "Boutique stays", "Riverside hotels"],
    bookingHint: "City pass + landmarks + theatre",
    officialBooking: "https://www.visitlondon.com/",
    assistance: [
      "Bundle attraction passes and transport.",
      "Book West End shows and museum slots.",
      "Plan day trips to Windsor and Oxford.",
    ],
  },
  {
    id: "rome",
    name: "Rome Eternal City",
    country: "Italy",
    region: "Lazio",
    continent: "Europe",
    type: "mixed",
    spotType: "City",
    lat: 41.9028,
    lon: 12.4964,
    tags: ["rome", "colosseum", "history", "unesco"],
    subPlaces: ["Colosseum", "Roman Forum", "Trevi Fountain", "Pantheon"],
    stays: ["Historic-center hotels", "Boutique stays", "City hotels"],
    bookingHint: "Heritage pass + guided tours",
    officialBooking: "https://www.turismoroma.it/en",
    assistance: [
      "Book skip-the-line Colosseum entry.",
      "Combine Vatican day for pilgrims.",
      "Plan walkable historic itineraries.",
    ],
  },
  {
    id: "barcelona",
    name: "Barcelona Gaudi & Coast",
    country: "Spain",
    region: "Catalonia",
    continent: "Europe",
    type: "vacation",
    spotType: "City",
    lat: 41.3874,
    lon: 2.1686,
    tags: ["barcelona", "gaudi", "beach", "architecture"],
    subPlaces: ["Sagrada Familia", "Park Guell", "La Rambla", "Barceloneta Beach"],
    stays: ["Beachfront hotels", "Boutique stays", "City hotels"],
    bookingHint: "City + beach + architecture pass",
    officialBooking: "https://www.barcelonaturisme.com/",
    assistance: [
      "Book timed Sagrada Familia entry.",
      "Balance beach and architecture days.",
      "Guide tapas and neighborhood walks.",
    ],
  },
  {
    id: "santorini",
    name: "Santorini Aegean Escape",
    country: "Greece",
    region: "Cyclades",
    continent: "Europe",
    type: "vacation",
    spotType: "Island",
    lat: 36.3932,
    lon: 25.4615,
    tags: ["santorini", "caldera", "sunset", "island"],
    subPlaces: ["Oia Village", "Fira", "Red Beach", "Caldera Cruise"],
    stays: ["Caldera-view suites", "Cave hotels", "Boutique villas"],
    bookingHint: "Island stay + sunset cruise",
    officialBooking: "https://www.santorini.gr/",
    assistance: [
      "Book Oia sunset and caldera cruise.",
      "Advise best-view accommodation zones.",
      "Plan island-hopping to Mykonos.",
    ],
  },
  {
    id: "istanbul",
    name: "Istanbul Two Continents",
    country: "Turkey",
    region: "Marmara",
    continent: "Europe",
    type: "mixed",
    spotType: "City",
    lat: 41.0082,
    lon: 28.9784,
    tags: ["istanbul", "bosphorus", "mosque", "bazaar", "heritage"],
    subPlaces: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar"],
    stays: ["Old-city hotels", "Bosphorus stays", "Boutique hotels"],
    bookingHint: "Heritage + Bosphorus cruise",
    officialBooking: "https://www.goturkiye.com/",
    assistance: [
      "Guide Hagia Sophia and mosque etiquette.",
      "Book Bosphorus dinner cruise.",
      "Plan bazaar shopping and food tours.",
    ],
  },
  {
    id: "iceland",
    name: "Iceland Northern Lights",
    country: "Iceland",
    region: "Capital Region",
    continent: "Europe",
    type: "vacation",
    spotType: "Nature",
    lat: 64.1466,
    lon: -21.9426,
    tags: ["iceland", "aurora", "glacier", "geyser", "waterfall"],
    subPlaces: ["Golden Circle", "Blue Lagoon", "Jokulsarlon", "Reykjavik"],
    stays: ["Reykjavik hotels", "Countryside lodges", "Glass igloos"],
    bookingHint: "Aurora tour + Golden Circle",
    officialBooking: "https://www.visiticeland.com/",
    assistance: [
      "Plan aurora season and viewing spots.",
      "Book Blue Lagoon and glacier tours.",
      "Advise ring-road self-drive routes.",
    ],
  },
  {
    id: "amsterdam",
    name: "Amsterdam Canals & Art",
    country: "Netherlands",
    region: "North Holland",
    continent: "Europe",
    type: "vacation",
    spotType: "City",
    lat: 52.3676,
    lon: 4.9041,
    tags: ["amsterdam", "canals", "museums", "tulips"],
    subPlaces: ["Rijksmuseum", "Van Gogh Museum", "Anne Frank House", "Canal Cruise"],
    stays: ["Canal-side hotels", "Boutique stays", "City hotels"],
    bookingHint: "Museum pass + canal cruise",
    officialBooking: "https://www.iamsterdam.com/",
    assistance: [
      "Pre-book Anne Frank and museum slots.",
      "Plan canal cruise and bike tours.",
      "Add Keukenhof tulip season trip.",
    ],
  },
  {
    id: "cairo",
    name: "Cairo & Giza Pyramids",
    country: "Egypt",
    region: "Cairo",
    continent: "Africa",
    type: "mixed",
    spotType: "Heritage",
    lat: 29.9792,
    lon: 31.1342,
    tags: ["egypt", "pyramids", "sphinx", "nile", "ancient"],
    subPlaces: ["Great Pyramid of Giza", "Sphinx", "Egyptian Museum", "Khan el-Khalili"],
    stays: ["Pyramid-view hotels", "Nile hotels", "City stays"],
    bookingHint: "Pyramids + museum + Nile cruise",
    officialBooking: "https://egypt.travel/",
    assistance: [
      "Book Giza plateau and museum entry.",
      "Add Luxor and Nile cruise extension.",
      "Arrange trusted guides and transfers.",
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech Medina Magic",
    country: "Morocco",
    region: "Marrakech-Safi",
    continent: "Africa",
    type: "vacation",
    spotType: "City",
    lat: 31.6295,
    lon: -7.9811,
    tags: ["morocco", "medina", "souk", "desert"],
    subPlaces: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Atlas Mountains"],
    stays: ["Riads", "Boutique hotels", "Desert camps"],
    bookingHint: "Medina + riad + desert tour",
    officialBooking: "https://www.visitmorocco.com/en",
    assistance: [
      "Book authentic riad stays.",
      "Plan Atlas and Sahara excursions.",
      "Guide souk bargaining and food tours.",
    ],
  },
  {
    id: "serengeti",
    name: "Serengeti Safari",
    country: "Tanzania",
    region: "Mara",
    continent: "Africa",
    type: "vacation",
    spotType: "Safari",
    lat: -2.3333,
    lon: 34.8333,
    tags: ["safari", "big five", "migration", "wildlife"],
    subPlaces: ["Serengeti Plains", "Ngorongoro Crater", "Great Migration Routes", "Seronera Valley"],
    stays: ["Luxury tented camps", "Safari lodges", "Eco camps"],
    bookingHint: "Safari package + migration timing",
    officialBooking: "https://www.tanzaniatourism.go.tz/",
    assistance: [
      "Plan around Great Migration season.",
      "Book game drives and balloon safaris.",
      "Arrange park permits and transfers.",
    ],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu Inca Trail",
    country: "Peru",
    region: "Cusco",
    continent: "Americas",
    type: "mixed",
    spotType: "Heritage",
    lat: -13.1631,
    lon: -72.545,
    tags: ["machu picchu", "inca", "unesco", "andes", "trek"],
    subPlaces: ["Machu Picchu Citadel", "Huayna Picchu", "Sacred Valley", "Cusco"],
    stays: ["Aguas Calientes hotels", "Cusco stays", "Valley lodges"],
    bookingHint: "Citadel permit + train/trek",
    officialBooking: "https://www.peru.travel/en",
    assistance: [
      "Book timed citadel and Huayna Picchu permits.",
      "Advise Inca Trail vs train options.",
      "Plan altitude acclimatization in Cusco.",
    ],
  },
  {
    id: "rio",
    name: "Rio de Janeiro Vibes",
    country: "Brazil",
    region: "Rio de Janeiro",
    continent: "Americas",
    type: "vacation",
    spotType: "City",
    lat: -22.9068,
    lon: -43.1729,
    tags: ["rio", "christ redeemer", "beach", "carnival"],
    subPlaces: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach", "Ipanema"],
    stays: ["Beachfront hotels", "Boutique stays", "City hotels"],
    bookingHint: "Landmarks + beach + Carnival",
    officialBooking: "https://visit.rio/en/",
    assistance: [
      "Book Christ Redeemer and Sugarloaf tickets.",
      "Plan around Carnival season crowds.",
      "Guide safe beach and neighborhood tours.",
    ],
  },
  {
    id: "cancun",
    name: "Cancun & Riviera Maya",
    country: "Mexico",
    region: "Quintana Roo",
    continent: "Americas",
    type: "vacation",
    spotType: "Beach",
    lat: 21.1619,
    lon: -86.8515,
    tags: ["cancun", "caribbean", "beach", "maya", "cenote"],
    subPlaces: ["Chichen Itza", "Tulum Ruins", "Playa del Carmen", "Cenotes"],
    stays: ["All-inclusive resorts", "Beach hotels", "Boutique stays"],
    bookingHint: "Beach resort + Maya ruins tour",
    officialBooking: "https://www.visitmexico.com/",
    assistance: [
      "Balance beach days and ruins tours.",
      "Book cenote and reef snorkeling.",
      "Add Chichen Itza heritage trip.",
    ],
  },
  {
    id: "banff",
    name: "Banff Rockies Retreat",
    country: "Canada",
    region: "Alberta",
    continent: "Americas",
    type: "vacation",
    spotType: "Mountain",
    lat: 51.1784,
    lon: -115.5708,
    tags: ["banff", "rockies", "lakes", "nature"],
    subPlaces: ["Lake Louise", "Moraine Lake", "Banff Gondola", "Johnston Canyon"],
    stays: ["Mountain lodges", "Resort hotels", "Chalets"],
    bookingHint: "Lakes + gondola + trails",
    officialBooking: "https://www.banfflakelouise.com/",
    assistance: [
      "Plan lake visits by season and light.",
      "Book gondola and canoe experiences.",
      "Advise wildlife-safe hiking routes.",
    ],
  },
  {
    id: "las-vegas",
    name: "Las Vegas & Grand Canyon",
    country: "United States",
    region: "Nevada",
    continent: "Americas",
    type: "vacation",
    spotType: "City",
    lat: 36.1699,
    lon: -115.1398,
    tags: ["las vegas", "grand canyon", "shows", "desert"],
    subPlaces: ["The Strip", "Grand Canyon", "Hoover Dam", "Fremont Street"],
    stays: ["Strip resorts", "Casino hotels", "Boutique stays"],
    bookingHint: "Shows + Grand Canyon tour",
    officialBooking: "https://www.visitlasvegas.com/",
    assistance: [
      "Book shows and Grand Canyon day tours.",
      "Add helicopter and Hoover Dam trips.",
      "Plan family-friendly attraction bundles.",
    ],
  },
  {
    id: "hawaii",
    name: "Hawaii Island Paradise",
    country: "United States",
    region: "Hawaii",
    continent: "Americas",
    type: "vacation",
    spotType: "Island",
    lat: 21.3069,
    lon: -157.8583,
    tags: ["hawaii", "beach", "volcano", "surf"],
    subPlaces: ["Waikiki Beach", "Pearl Harbor", "Diamond Head", "Volcanoes National Park"],
    stays: ["Beach resorts", "Island hotels", "Boutique stays"],
    bookingHint: "Island stay + volcano + beaches",
    officialBooking: "https://www.gohawaii.com/",
    assistance: [
      "Plan island-hopping itineraries.",
      "Book volcano and snorkeling tours.",
      "Add Pearl Harbor historic visit.",
    ],
  },
  {
    id: "sydney",
    name: "Sydney Harbour Highlights",
    country: "Australia",
    region: "New South Wales",
    continent: "Oceania",
    type: "vacation",
    spotType: "City",
    lat: -33.8688,
    lon: 151.2093,
    tags: ["sydney", "opera house", "harbour", "beach"],
    subPlaces: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach", "Blue Mountains"],
    stays: ["Harbour hotels", "Beach stays", "City hotels"],
    bookingHint: "Harbour + beaches + day trips",
    officialBooking: "https://www.sydney.com/",
    assistance: [
      "Book Opera House tours and cruises.",
      "Plan Bondi and coastal walks.",
      "Add Blue Mountains day trip.",
    ],
  },
  {
    id: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    region: "Queensland",
    continent: "Oceania",
    type: "vacation",
    spotType: "Reef",
    lat: -16.9186,
    lon: 145.7781,
    tags: ["reef", "diving", "snorkel", "unesco", "marine"],
    subPlaces: ["Cairns Reef Trips", "Whitsunday Islands", "Green Island", "Daintree Rainforest"],
    stays: ["Island resorts", "Cairns hotels", "Eco lodges"],
    bookingHint: "Reef dive + island + rainforest",
    officialBooking: "https://www.queensland.com/",
    assistance: [
      "Book reef diving and snorkel trips.",
      "Advise eco-friendly reef operators.",
      "Add Daintree Rainforest tour.",
    ],
  },
  {
    id: "queenstown",
    name: "Queenstown Adventure",
    country: "New Zealand",
    region: "Otago",
    continent: "Oceania",
    type: "vacation",
    spotType: "Mountain",
    lat: -45.0312,
    lon: 168.6626,
    tags: ["queenstown", "adventure", "bungee", "fjord", "alps"],
    subPlaces: ["Milford Sound", "Skyline Gondola", "Lake Wakatipu", "Bungee Bridge"],
    stays: ["Lakeside hotels", "Alpine lodges", "Boutique stays"],
    bookingHint: "Adventure + fjord cruise",
    officialBooking: "https://www.newzealand.com/",
    assistance: [
      "Book Milford Sound cruise and flights.",
      "Plan adventure activities safely.",
      "Advise scenic self-drive routes.",
    ],
  },
  {
    id: "fiji",
    name: "Fiji Island Bliss",
    country: "Fiji",
    region: "Viti Levu",
    continent: "Oceania",
    type: "vacation",
    spotType: "Island",
    lat: -17.7134,
    lon: 178.065,
    tags: ["fiji", "island", "beach", "resort", "diving"],
    subPlaces: ["Mamanuca Islands", "Yasawa Islands", "Coral Coast", "Denarau Island"],
    stays: ["Overwater resorts", "Beach villas", "Island lodges"],
    bookingHint: "Island resort + reef + cruise",
    officialBooking: "https://www.fiji.travel/",
    assistance: [
      "Match resorts to family or couples.",
      "Book island-hopping and diving.",
      "Plan seaplane and boat transfers.",
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo Modern & Tradition",
    country: "Japan",
    region: "Kanto",
    continent: "Asia",
    type: "mixed",
    spotType: "City",
    lat: 35.6762,
    lon: 139.6503,
    tags: ["tokyo", "shrine", "tech", "food", "culture"],
    subPlaces: ["Senso-ji Temple", "Shibuya Crossing", "Meiji Shrine", "Mount Fuji Day Trip"],
    stays: ["City hotels", "Ryokan stays", "Boutique hotels"],
    bookingHint: "City pass + Fuji day trip",
    officialBooking: "https://www.gotokyo.org/en/",
    assistance: [
      "Plan rail passes and station transfers.",
      "Balance shrines, tech, and food tours.",
      "Book Mount Fuji and Hakone trips.",
    ],
  },
  {
    id: "singapore",
    name: "Singapore City Garden",
    country: "Singapore",
    region: "Singapore",
    continent: "Asia",
    type: "vacation",
    spotType: "City",
    lat: 1.3521,
    lon: 103.8198,
    tags: ["singapore", "gardens", "family", "food"],
    subPlaces: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Universal Studios"],
    stays: ["Marina hotels", "Family hotels", "Boutique stays"],
    bookingHint: "City pass + Sentosa + gardens",
    officialBooking: "https://www.visitsingapore.com/",
    assistance: [
      "Bundle Sentosa and attraction passes.",
      "Plan family-friendly itineraries.",
      "Guide hawker food experiences.",
    ],
  },
  {
    id: "seoul",
    name: "Seoul K-Culture Tour",
    country: "South Korea",
    region: "Seoul Capital Area",
    continent: "Asia",
    type: "mixed",
    spotType: "City",
    lat: 37.5665,
    lon: 126.978,
    tags: ["seoul", "palace", "kpop", "food", "shopping"],
    subPlaces: ["Gyeongbokgung Palace", "Bukchon Hanok Village", "Myeongdong", "N Seoul Tower"],
    stays: ["City hotels", "Hanok stays", "Boutique hotels"],
    bookingHint: "Palace + K-culture + shopping",
    officialBooking: "https://english.visitkorea.or.kr/",
    assistance: [
      "Plan palace hanbok experiences.",
      "Guide K-food and market tours.",
      "Add DMZ and day-trip options.",
    ],
  },
  {
    id: "petra",
    name: "Petra Rose City",
    country: "Jordan",
    region: "Ma'an",
    continent: "Asia",
    type: "mixed",
    spotType: "Heritage",
    lat: 30.3285,
    lon: 35.4444,
    tags: ["petra", "nabatean", "unesco", "desert", "ancient"],
    subPlaces: ["The Treasury", "The Monastery", "Siq Canyon", "Wadi Rum"],
    stays: ["Petra hotels", "Desert camps", "Boutique stays"],
    bookingHint: "Petra pass + Wadi Rum camp",
    officialBooking: "https://international.visitjordan.com/",
    assistance: [
      "Book Petra pass and night show.",
      "Add Wadi Rum desert camp.",
      "Plan Dead Sea extension.",
    ],
  },
  {
    id: "seychelles",
    name: "Seychelles Beach Haven",
    country: "Seychelles",
    region: "Mahe",
    continent: "Africa",
    type: "vacation",
    spotType: "Island",
    lat: -4.6796,
    lon: 55.492,
    tags: ["seychelles", "island", "beach", "honeymoon", "reef"],
    subPlaces: ["Anse Source d'Argent", "Praslin Island", "La Digue", "Morne Seychellois"],
    stays: ["Beach resorts", "Island villas", "Boutique lodges"],
    bookingHint: "Island resort + reef + hopping",
    officialBooking: "https://www.seychelles.travel/",
    assistance: [
      "Match islands to honeymoon or family.",
      "Book island-hopping and snorkeling.",
      "Plan private-beach experiences.",
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
  const faved = isFavorite(place.id) ? " is-fav" : "";
  return `
    <article class="place-card">
      <div class="place-top">
        <h4>${place.name}</h4>
        <span class="type-pill">${badgeText(place)}</span>
      </div>
      <button class="fav-btn${faved}" data-fav="${place.id}" data-fav-name="${place.name}" type="button" aria-label="Save to wishlist">♥</button>
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

/* ============================================================
   UI Enhancements: theme, wishlist, counters, reveal, toasts
   (additive, self-contained — does not alter booking logic)
   ============================================================ */
const FAV_KEY = "gt_favorites_v1";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "{}");
  } catch (_e) {
    return {};
  }
}

function isFavorite(id) {
  return Boolean(getFavorites()[id]);
}

function toggleFavorite(id, name) {
  const favs = getFavorites();
  if (favs[id]) {
    delete favs[id];
  } else {
    favs[id] = name || id;
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  return Boolean(favs[id]);
}

function showToast(message, type) {
  const host = document.getElementById("toastHost");
  if (!host) return;
  const el = document.createElement("div");
  el.className = "toast" + (type ? " toast-" + type : "");
  el.textContent = message;
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, 2600);
}

function updateWishlistCount() {
  const count = Object.keys(getFavorites()).length;
  const badge = document.getElementById("wishlistCount");
  if (!badge) return;
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function renderWishlistDrawer() {
  const wrap = document.getElementById("wishlistItems");
  if (!wrap) return;
  const favs = getFavorites();
  const ids = Object.keys(favs);
  if (!ids.length) {
    wrap.innerHTML = '<p class="wishlist-empty">No saved places yet. Tap the ♥ on any destination.</p>';
    return;
  }
  wrap.innerHTML = ids
    .map(
      (id) => `
      <div class="wishlist-item">
        <span>${favs[id]}</span>
        <div class="wishlist-item-actions">
          <button class="btn btn-ghost" data-wish-book="${id}" type="button">Book</button>
          <button class="wish-remove" data-wish-remove="${id}" type="button" aria-label="Remove">✕</button>
        </div>
      </div>`
    )
    .join("");
}

function openWishlist() {
  renderWishlistDrawer();
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("wishlistBackdrop");
  if (drawer) drawer.hidden = false;
  if (backdrop) backdrop.hidden = false;
  requestAnimationFrame(() => {
    if (drawer) drawer.classList.add("open");
  });
}

function closeWishlist() {
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("wishlistBackdrop");
  if (drawer) drawer.classList.remove("open");
  if (backdrop) backdrop.hidden = true;
  setTimeout(() => {
    if (drawer) drawer.hidden = true;
  }, 300);
}

function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("gt_theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (toggle) toggle.querySelector(".icon-theme").textContent = "☀️";
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("gt_theme", "light");
        toggle.querySelector(".icon-theme").textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("gt_theme", "dark");
        toggle.querySelector(".icon-theme").textContent = "☀️";
      }
    });
  }
}

function initCounters() {
  const nums = Array.from(document.querySelectorAll(".stat-num"));
  if (!nums.length || !("IntersectionObserver" in window)) {
    nums.forEach((n) => (n.textContent = n.dataset.count + (n.dataset.suffix || "")));
    return;
  }
  const animate = (el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach((n) => obs.observe(n));
}

function initReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.hidden = window.scrollY < 500;
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterEmail");
    showToast("Subscribed! Check your inbox for a welcome note.", "success");
    if (input) input.value = "";
  });
}

function initWishlistUi() {
  updateWishlistCount();

  document.addEventListener("click", (event) => {
    const favBtn = event.target.closest("[data-fav]");
    if (favBtn) {
      event.preventDefault();
      const id = favBtn.getAttribute("data-fav");
      const name = favBtn.getAttribute("data-fav-name");
      const nowFav = toggleFavorite(id, name);
      favBtn.classList.toggle("is-fav", nowFav);
      updateWishlistCount();
      showToast(nowFav ? "Saved to your wishlist ♥" : "Removed from wishlist", nowFav ? "success" : "");
      return;
    }
    const removeBtn = event.target.closest("[data-wish-remove]");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-wish-remove");
      toggleFavorite(id);
      updateWishlistCount();
      renderWishlistDrawer();
      document.querySelectorAll(`[data-fav="${id}"]`).forEach((b) => b.classList.remove("is-fav"));
      return;
    }
    const wishBook = event.target.closest("[data-wish-book]");
    if (wishBook) {
      const id = wishBook.getAttribute("data-wish-book");
      closeWishlist();
      if (typeof selectDestination === "function") selectDestination(id);
      return;
    }
  });

  const wishlistBtn = document.getElementById("wishlistBtn");
  const closeBtn = document.getElementById("closeWishlist");
  const backdrop = document.getElementById("wishlistBackdrop");
  if (wishlistBtn) wishlistBtn.addEventListener("click", openWishlist);
  if (closeBtn) closeBtn.addEventListener("click", closeWishlist);
  if (backdrop) backdrop.addEventListener("click", closeWishlist);
}

(function initEnhancements() {
  initTheme();
  initCounters();
  initReveal();
  initBackToTop();
  initNewsletter();
  initWishlistUi();
})();
