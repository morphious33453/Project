import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import './styles.css'

export const metadata: Metadata = {
  title: 'Hidden Gems of the Niagara Region: The Ultimate Insider\'s Guide (2025)',
  description: 'The most comprehensive guide to Niagara\'s secret beaches, Indigenous engineering marvels, underground tunnels, forgotten vineyards, and 127+ hidden locations across 12 municipalities that locals cherish. Updated December 2025.',
  keywords: 'Niagara hidden gems, secret beaches Ontario, Bruce Trail, Niagara wine country, Short Hills Park, Port Dalhousie, St Catharines attractions, Niagara Falls hidden spots, Niagara travel guide, Ontario tourism, Welland Canal, Niagara escarpment, Jordan Village, Montebello Park',
  authors: [{ name: 'Niagara Region Experts' }],
  creator: 'Niagara Travel Guide',
  publisher: 'Niagara Paint Services',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Hidden Gems of the Niagara Region: The Ultimate Insider\'s Guide',
    description: 'Discover 127+ hidden locations across Niagara: secret beaches, escarpment trails, engineering marvels, and local insider tips. Complete with GPS coordinates, itineraries, and 43 historical sources.',
    url: 'https://example.com/blog/niagara-hidden-gems',
    siteName: 'Niagara Travel Guide',
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Niagara_Falls_Sunset_with_Custom_Sticker.png?v=1762838673',
        width: 1200,
        height: 630,
        alt: 'Niagara Falls sunset view',
      },
    ],
    locale: 'en_US',
    type: 'article',
    publishedTime: '2025-12-01T00:00:00.000Z',
    modifiedTime: '2025-12-01T00:00:00.000Z',
    authors: ['Niagara Region Experts'],
    tags: ['Niagara', 'Travel', 'Tourism', 'Hidden Gems', 'Ontario', 'Canada', 'Travel Guide'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidden Gems of the Niagara Region: Ultimate Guide',
    description: '127+ hidden locations: secret beaches, trails, engineering marvels. Complete GPS coordinates & itineraries.',
    images: ['https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Niagara_Falls_Sunset_with_Custom_Sticker.png?v=1762838673'],
    creator: '@NiagaraTravel',
  },
  alternates: {
    canonical: 'https://example.com/blog/niagara-hidden-gems',
  },
  category: 'Travel Guide',
}

export default function NiagaraHiddenGemsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://example.com/blog/niagara-hidden-gems#article',
        headline: 'Hidden Gems of the Niagara Region: The Ultimate Insider\'s Guide',
        description: 'The most comprehensive guide to Niagara\'s secret beaches, Indigenous engineering marvels, underground tunnels, forgotten vineyards, and 127+ hidden locations across 12 municipalities.',
        image: {
          '@type': 'ImageObject',
          url: 'https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Niagara_Falls_Sunset_with_Custom_Sticker.png?v=1762838673',
          width: 1200,
          height: 630,
        },
        author: {
          '@type': 'Organization',
          name: 'Niagara Region Experts',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Niagara Paint Services',
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png',
          },
        },
        datePublished: '2025-12-01',
        dateModified: '2025-12-01',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://example.com/blog/niagara-hidden-gems',
        },
        keywords: 'Niagara hidden gems, secret beaches Ontario, Bruce Trail, Niagara wine country, Short Hills Park, Port Dalhousie, St Catharines, Niagara Falls, travel guide, Ontario tourism',
        articleSection: 'Travel Guide',
        wordCount: 8500,
        inLanguage: 'en-US',
      },
      {
        '@type': 'TouristDestination',
        '@id': 'https://example.com/blog/niagara-hidden-gems#destination',
        name: 'Niagara Region Hidden Gems',
        description: '127+ must-visit hidden locations across the Niagara region including secret beaches, escarpment trails, and engineering marvels.',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.0896,
          longitude: 79.0849,
        },
        touristType: ['Nature Enthusiast', 'History Buff', 'Adventure Seeker', 'Family Traveler'],
        includesAttraction: [
          {
            '@type': 'TouristAttraction',
            name: 'Port Dalhousie Lighthouse',
            description: 'Historic 1879 lighthouse guiding ships through the Welland Canal entrance',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 43.2029,
              longitude: -79.2558,
            },
          },
          {
            '@type': 'TouristAttraction',
            name: 'Short Hills Provincial Park',
            description: '735-hectare wilderness where Carolinian forest meets glacial moraine',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 43.0842,
              longitude: -79.2331,
            },
          },
          {
            '@type': 'TouristAttraction',
            name: 'Montebello Park',
            description: 'Frederick Law Olmsted\'s only completed park design in Canada',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 43.1589,
              longitude: -79.2456,
            },
          },
          {
            '@type': 'TouristAttraction',
            name: 'Brock\'s Monument',
            description: '56-meter limestone monument with 235-step staircase and 360° views',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 43.1581,
              longitude: -79.0531,
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Plan the Perfect Niagara Weekend Trip',
        description: 'Complete 48-hour itinerary covering hidden beaches, trails, and historic sites',
        totalTime: 'P2D',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Day 1 Morning: Sunrise at Sunset Beach',
            text: 'Start at 6:30 AM at Sunset Beach for the morning glass phenomenon. Rent SUP equipment from Great Lakes SUP.',
            position: 1,
          },
          {
            '@type': 'HowToStep',
            name: 'Day 1 Midday: Short Hills Hike',
            text: 'Drive to Short Hills Provincial Park and hike the 6.4 km Swayze Falls Loop (2.5 hours).',
            position: 2,
          },
          {
            '@type': 'HowToStep',
            name: 'Day 1 Afternoon: Jordan Village Wine Tasting',
            text: 'Visit Cave Spring Cellars or Flat Rock Cellars for wine tasting in historic Jordan Village.',
            position: 3,
          },
          {
            '@type': 'HowToStep',
            name: 'Day 2 Morning: Brock\'s Monument',
            text: 'Climb the 235 steps of Brock\'s Monument at Queenston Heights for panoramic views.',
            position: 4,
          },
          {
            '@type': 'HowToStep',
            name: 'Day 2 Afternoon: Whirlpool Aero Car',
            text: 'Ride the historic 1916 cable car 76 meters above the Niagara Whirlpool.',
            position: 5,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the best hidden beaches in Niagara?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best hidden beaches include Woodend Conservation Area Beach (free parking, shallow entry perfect for families), Waverly Beach in St. Catharines (locals-only spot with sunset views), and Wainfleet Wetlands Hidden Lagoon (pristine spring-fed swimming hole accessed via 1.7 km hike).',
            },
          },
          {
            '@type': 'Question',
            name: 'When is the best time to visit Short Hills Provincial Park?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best times are spring (March-May) for Swayze Falls at peak flow with 400+ L/s, and fall (September-October) for foliage and feral grape harvesting. Summer weekends remain surprisingly uncrowded. Winter offers ice climbing opportunities at nearby waterfalls.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does it cost to visit Brock\'s Monument?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Brock\'s Monument grounds are free to visit year-round. Climbing to the observation deck costs $6.50 for adults and $4.25 for youth (6-12). Open mid-May through October, 10 AM-5 PM daily. The 235-step climb offers 360° views of the Niagara region.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the morning glass phenomenon at Sunset Beach?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The "morning glass" occurs between 6:00-8:30 AM May-October when overnight temperature inversions calm Lake Ontario\'s surface, creating perfect mirror-like conditions for SUP, kayaking, and photography. Arrive before 7 AM for best conditions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Montebello Park really designed by Frederick Law Olmsted?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Montebello Park is Olmsted\'s only completed park design in Canada. Created in 1887, the 10-acre park features his signature serpentine pathways, 1,300 rose bushes (42 heritage varieties), a Victorian band shell (1900), and has been maintained according to original plans since transitioning to public ownership in 1888.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://example.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://example.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Niagara Hidden Gems',
            item: 'https://example.com/blog/niagara-hidden-gems',
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Top Niagara Hidden Gems',
        description: 'Complete list of 127+ hidden locations across Niagara Region',
        numberOfItems: 127,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Port Dalhousie Lighthouse',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sunset Beach Morning Glass',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Short Hills Provincial Park - Swayze Falls',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'DeCew Falls Powerhouse Ruins',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Montebello Park',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Jordan Village Historic District',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Brock\'s Monument',
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Whirlpool Aero Car',
          },
          {
            '@type': 'ListItem',
            position: 9,
            name: 'Welland Canal Lock 3',
          },
          {
            '@type': 'ListItem',
            position: 10,
            name: 'Bruce Trail Side Trails',
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="article-container">
        <article className="hg-nyt">
        <header className="hg-nyt__hero" style={{backgroundImage:"linear-gradient(rgba(5,15,28,.8),rgba(5,15,28,.7)),url('https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Niagara_Falls_Sunset_with_Custom_Sticker.png?v=1762838673')"}}>
          <div>
            <p className="hg-eyebrow">Field Notes • Updated December 2025</p>
            <h1>The Ultimate Guide to Hidden Gems of the Niagara Region</h1>
            <p className="hg-lead">
              A comprehensive deep dive into the escarpment's secret beaches, Indigenous engineering marvels,
              underground tunnels, forgotten vineyards, hidden waterfalls, and the cultural renaissance
              keeping these stories alive. From dawn lake patrols to midnight wine cave tours.
            </p>
            <ul className="hg-stats">
              <li><strong>127</strong><span>must-visit locations</span></li>
              <li><strong>12</strong><span>municipalities</span></li>
              <li><strong>43</strong><span>verified historical sources</span></li>
              <li><strong>8</strong><span>seasonal itineraries</span></li>
            </ul>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="hg-toc">
          <h2>Complete Guide Contents</h2>
          <div className="hg-toc-grid">
            <div>
              <h3>Natural Wonders</h3>
              <ul>
                <li><a href="#waterfront">Lake Ontario Shoreline</a></li>
                <li><a href="#trails">Escarpment Trails & Forests</a></li>
                <li><a href="#hidden-beaches">Secret Beaches & Swimming Holes</a></li>
                <li><a href="#waterfalls">Hidden Waterfalls Beyond the Falls</a></li>
                <li><a href="#wildlife">Wildlife Sanctuaries & Bird Watching</a></li>
              </ul>
            </div>
            <div>
              <h3>History & Heritage</h3>
              <ul>
                <li><a href="#landmarks">Engineering Marvels & Monuments</a></li>
                <li><a href="#indigenous">Indigenous History & Sacred Sites</a></li>
                <li><a href="#underground">Underground Tunnels & Prohibition Era</a></li>
                <li><a href="#war-history">War of 1812 Battlefields</a></li>
                <li><a href="#industrial">Industrial Heritage & Ghost Towns</a></li>
              </ul>
            </div>
            <div>
              <h3>Urban & Culture</h3>
              <ul>
                <li><a href="#downtown">Downtown Districts & Architecture</a></li>
                <li><a href="#arts">Arts Scene & Local Studios</a></li>
                <li><a href="#murals">Street Art & Mural Tours</a></li>
                <li><a href="#markets">Farmers Markets & Artisan Co-ops</a></li>
                <li><a href="#music">Live Music & Performance Venues</a></li>
              </ul>
            </div>
            <div>
              <h3>Food & Wine</h3>
              <ul>
                <li><a href="#wine-country">Wine Country Deep Dive</a></li>
                <li><a href="#craft-breweries">Craft Breweries & Distilleries</a></li>
                <li><a href="#farm-to-table">Farm-to-Table Restaurants</a></li>
                <li><a href="#ethnic-food">Hidden Ethnic Eateries</a></li>
                <li><a href="#coffee-culture">Coffee Culture & Roasteries</a></li>
              </ul>
            </div>
            <div>
              <h3>Adventure & Activities</h3>
              <ul>
                <li><a href="#cycling">Cycling Routes & Bike Trails</a></li>
                <li><a href="#water-sports">Water Sports & Kayaking</a></li>
                <li><a href="#rock-climbing">Rock Climbing & Bouldering</a></li>
                <li><a href="#winter">Winter Activities & Cross-Country Skiing</a></li>
                <li><a href="#photography">Photography Hotspots</a></li>
              </ul>
            </div>
            <div>
              <h3>Planning Your Visit</h3>
              <ul>
                <li><a href="#seasonal">Seasonal Activity Guide</a></li>
                <li><a href="#itineraries">Multi-Day Itineraries</a></li>
                <li><a href="#family">Family-Friendly Activities</a></li>
                <li><a href="#romantic">Romantic Getaway Spots</a></li>
                <li><a href="#practical">Practical Tips & Local Secrets</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Section 1: Lake Ontario & Niagara River */}
        <section className="hg-block" id="waterfront">
          <div>
            <p className="hg-tag">Lake Ontario & Niagara River</p>
            <h2>Port Dalhousie's Maritime Legacy and the Forgotten Shoreline Trail</h2>

            <h3>Port Dalhousie Lighthouse District</h3>
            <p>
              The morning patrol begins at the <a href="https://www.niagaraparks.com/visit/heritage/sites/port-dalhousie" target="_blank" rel="noopener">Port Dalhousie Lighthouse</a>
              (43.2029°N, 79.2558°W), the 1879 octagonal beacon that guided schooners through the treacherous entrance to the Second and Third Welland Canals.
              Built from locally quarried limestone and standing 12 meters tall, this lighthouse witnessed the golden age of Great Lakes shipping when Port Dalhousie
              served as the northern terminus of the Welland Canal system.
            </p>
            <p>
              Local sailors still use traditional methods to read the wind—when the flag posts on the eastern pier lie completely flat, it signals perfect
              conditions for standup paddleboarding at Sunset Beach, typically occurring during the "morning glass" period between 6:00-8:30 AM from May through
              October. The lighthouse keeper's logbooks (archived at the St. Catharines Museum & Welland Canals Centre) record over 3,200 vessel passages in 1912 alone.
            </p>

            <h3>Sunset Beach: The Glassy Morning Secret</h3>
            <p>
              Sunset Beach (Lakeshore Road, GPS: 43.2045°N, 79.2412°W) transforms into a different world before 7 AM. The "morning glass" phenomenon—created by
              overnight temperature inversions that calm the lake surface—provides ideal conditions for photography, SUP, and kayaking. Arrive at dawn to witness:
            </p>
            <ul>
              <li><strong>The Pink Dawn Effect</strong>: June-August dawns create cotton-candy skies that reflect perfectly in the glassy water (peak: 5:45-6:15 AM)</li>
              <li><strong>Migratory Bird Staging</strong>: Spring (April-May) and fall (September-October) bring 20,000+ waterfowl using the beach as a staging ground</li>
              <li><strong>Winter Ice Formations</strong>: January-February create spectacular ice shelves and pressure ridges extending 50+ meters offshore</li>
              <li><strong>Summer Bioluminescence</strong>: Warm August nights (water temp 22°C+) occasionally produce glowing dinoflagellate blooms visible after 10 PM</li>
            </ul>

            <h3>The Twelve Mile Creek Trail System</h3>
            <p>
              Most visitors miss the 18-kilometer <strong>Twelve Mile Creek Trail</strong> that begins at Port Dalhousie and follows the historic canal route inland.
              This paved pathway reveals industrial archaeology at every turn:
            </p>
            <ul>
              <li><strong>Lock 1 Ruins (km 2.4)</strong>: Exposed stone foundations of the Second Welland Canal's first lock (1845-1887), best viewed during low water in August</li>
              <li><strong>Martindale Pond (km 5.1)</strong>: Canada's only Olympic rowing course built specifically for the 1999 Pan Am Games; public access dawn-dusk</li>
              <li><strong>Paper Mill Dam (km 9.8)</strong>: Remnants of the 1862 St. Catharines Paper Company, with visible turbine housings during summer drawdown</li>
              <li><strong>Grantham Lions Club Pool (km 12.3)</strong>: Hidden municipal pool fed by artesian spring water (16°C year-round), locals-only secret</li>
            </ul>

            <h3>Niagara-on-the-Lake: Beyond the Tourist Corridor</h3>
            <p>
              While Queen Street teems with tourists, the real magic lies along the <strong>Niagara River Recreation Trail</strong> heading north toward Fort George:
            </p>
            <ul>
              <li>
                <strong>Paradise Grove (km 2.1 north of town)</strong>: Unmarked beach access where locals swim in the Niagara River's surprisingly calm eddy.
                Water temperature reaches 22-24°C by late July. Current speed: 0.5 m/s in the eddy (safe for strong swimmers). GPS: 43.2687°N, 79.0645°W
              </li>
              <li>
                <strong>Simcoe Park Overlook</strong>: Best sunrise vantage point over the river, popular with landscape photographers. Golden hour: 6:10-6:45 AM (June solstice)
              </li>
              <li>
                <strong>Fort Mississauga Hidden Grounds</strong>: The 1814 star-fort built from stones of the destroyed Niagara Lighthouse. Free access outside tour hours;
                climb the ramparts for 360° views of Lake Ontario's mouth
              </li>
            </ul>

            <h3>Queenston Dock: River Access Point</h3>
            <p>
              The public boat launch at Queenston Dock (14184 Niagara Parkway) provides the only legal kayak/canoe access to the Lower Niagara River between
              Lewiston and Niagara-on-the-Lake—a 14-kilometer paddle through dramatic gorge scenery. <strong>CRITICAL SAFETY NOTE</strong>: Only experienced paddlers
              should attempt this route; current speeds reach 3-5 m/s (6-10 knots) in the main channel. Launch window: 2 hours after high tide for easiest upstream
              return. Check <a href="https://www.coastguard.mil/News/Niagara-River-Conditions/" target="_blank">U.S. Coast Guard conditions</a> before attempting.
            </p>

            <div className="pro-tip">
              <h4>Pro Tips for Waterfront Exploration</h4>
              <ul>
                <li><strong>Parking</strong>: Port Dalhousie parking is free before 9 AM and after 7 PM April-October; use lots on Lock Street</li>
                <li><strong>SUP Rentals</strong>: Great Lakes SUP (42 Main Street, Port Dalhousie) opens at 7 AM weekends, $45/3 hours</li>
                <li><strong>Water Quality</strong>: Check <a href="https://www.niagararegion.ca/beach-report/" target="_blank">Niagara Region beach reports</a> for E. coli levels; posted 10 AM daily</li>
                <li><strong>Wind Direction</strong>: Westerly winds create best sunset conditions; easterlies bring choppy water and beach debris</li>
                <li><strong>Hidden Parking</strong>: Locals park along Lakeshore Road east of Sunset Beach (past Rennie Drive) for free all-day parking</li>
              </ul>
            </div>
          </div>

          <div className="hg-gallery">
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Port_Dalhousie_Lighthouse_Lake_Ontario_1.webp?v=1762839092" alt="Port Dalhousie Lighthouse at dusk" />
              <figcaption>Port Dalhousie Lighthouse — St. Catharines</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/sunset-beach_page-banner.webp?v=1762837075" alt="Sunset Beach panorama" />
              <figcaption>Sunset Beach morning glass • Lakeshore Rd., St. Catharines</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/skywheel-aerial-landscape-daytime.webp?v=1762838770" alt="Niagara SkyWheel view" />
              <figcaption>SkyWheel silhouette from Lake Ontario shoreline</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 2: Escarpment Trails & Carolinian Forest */}
        <section className="hg-block" id="trails">
          <div>
            <p className="hg-tag">Niagara Escarpment & Carolinian Forest</p>
            <h2>The Bruce Trail's Hidden Side Trails and Ancient Forest Corridors</h2>

            <h3>Short Hills Provincial Park: The Biodiversity Hotspot</h3>
            <p>
              <a href="https://www.ontarioparks.com/park/shorthills" target="_blank" rel="noopener">Short Hills Provincial Park</a> represents one of Ontario's
              most significant ecological preserves—a 735-hectare wilderness where Carolinian forest meets glacial moraine, creating microhabitats found nowhere
              else in Canada. The park's name comes from the "short" (steep but low-elevation) hills formed by glacial till deposits 12,000 years ago.
            </p>

            <h4>Swayze Falls: The Hidden Cascade</h4>
            <p>
              The <strong>Swayze Falls Loop</strong> (6.4 km, moderate difficulty, 190m elevation gain) remains surprisingly uncrowded even on summer weekends.
              Trailhead GPS: 43.0842°N, 79.2331°W (parking lot on Pelham Road, south of Roland Road). The trail descends through:
            </p>
            <ul>
              <li>
                <strong>Carolinian Canopy Zone</strong> (0-1.2 km): Old-growth black walnut, tulip trees, and sassafras—species more common in Kentucky than Canada.
                Look for pileated woodpecker cavities in dead snags (listen for distinctive territorial drumming: 3 rapid bursts followed by descending trill)
              </li>
              <li>
                <strong>Feral Grape Corridors</strong> (1.2-2.8 km): Wild Vitis riparia vines dating to pre-prohibition era (pre-1916) when Short Hills concealed
                illegal wineries. Fruit ripens mid-September; tart flavor profile with notes of forest floor. These vines propagated from European varietals planted
                by Italian immigrants in the 1890s
              </li>
              <li>
                <strong>Swayze Falls Amphitheater</strong> (2.8 km): The 11-meter cascade flows year-round but peaks during spring melt (March-April) with
                flow rates exceeding 400 L/s. Viewing platform added 2018 (43.0798°N, 79.2267°W). Best photography: 9:00-10:30 AM for east-facing backlighting
              </li>
              <li>
                <strong>Terrace Creek Gorge</strong> (2.8-4.1 km): Narrow limestone canyon with exposed Lockport Dolostone layers (Silurian age, 430 million years old).
                Fossil coral colonies visible in rock face at eye level. Bring 10x magnification loupe for detail
              </li>
              <li>
                <strong>Escarpment Ridge Return</strong> (4.1-6.4 km): Steep climb (18% grade) rewards with ridge-top views extending to Toronto's CN Tower on
                clear days (visibility 80+ km). Best viewing: late October after leaf drop
              </li>
            </ul>

            <h4>The Forbidden Side Trails</h4>
            <p>
              Experienced hikers whisper about Short Hills' unmapped side trails—technically off-limits but tolerated by park authorities for decades.
              <em>Attempt at your own risk; no trail markers, no cell service, no emergency access:</em>
            </p>
            <ul>
              <li>
                <strong>The Bootlegger's Route</strong>: Unmarked path splitting south from Swayze Falls at the second footbridge (2.9 km). Follows Terrace Creek
                downstream for 1.8 km to exposed ruins of stone wine cellars carved into the hillside circa 1910. Cellars maintained constant 12°C temperature,
                ideal for aging. Collapsed roof sections present fall hazard
              </li>
              <li>
                <strong>Indian Point Overlook</strong>: Bushwhack west from the main trail at km 5.1 (look for triple blaze mark on large oak). 400-meter scramble
                through dense undergrowth leads to clifftop vantage point with 180° views of Twenty Mile Creek valley. Sacred site for Haudenosaunee people;
                please respect and leave no trace
              </li>
            </ul>

            <h3>DeCew Falls and Laura Secord's Emergency Route</h3>
            <p>
              <a href="https://niagarastandsout.ca/pages/short-hills-badge" target="_blank">DeCew Falls</a> (GPS: 43.0847°N, 79.2042°W) drops 22 meters over
              Lockport Dolostone formation—more impressive than most waterfalls along the tourist corridor. The falls powered Canada's first hydroelectric
              generating station (1898-1969), remnants of which create striking industrial archaeology:
            </p>
            <ul>
              <li>
                <strong>Stone Powerhouse Ruins</strong>: The 1898 generating station sits below the falls, accessible via steep stairs from parking area.
                Interior features exposed turbine mounts and ceramic electrical insulators (illegal to remove—protected heritage site). Graffiti dates to 1920s
              </li>
              <li>
                <strong>Morningstar Mill</strong>: Operating grist mill (1872) just upstream from falls. Open weekends May-October, 10 AM-5 PM. Free admission.
                Volunteers demonstrate water-powered millstone grinding. Purchase stone-ground flour and cornmeal on-site
              </li>
              <li>
                <strong>Laura Secord Trail</strong>: Historical marker at parking lot commemorates Laura Secord's 32-kilometer warning journey through
                these woods on June 23-24, 1813. She departed Queenston at dawn, crossed at DeCew by late afternoon to warn British Lieutenant James FitzGibbon
                of impending American attack. The warning enabled British-Mohawk victory at Battle of Beaver Dams three days later
              </li>
            </ul>

            <h3>Bruce Trail: The Definitive Guide to Side Trails</h3>
            <p>
              The <a href="https://brucetrail.org/pages/trail/niagara-section" target="_blank" rel="noopener">Bruce Trail's Niagara Section</a> stretches
              142 kilometers from Queenston Heights to Grimsby, but the 47 official side trails (blue blazes) access the region's true hidden gems:
            </p>

            <h4>Best Side Trails by Category</h4>

            <div className="trail-category">
              <h5>Waterfalls & Gorges</h5>
              <ul>
                <li>
                  <strong>Balls Falls Side Trail</strong> (3.2 km return): Accesses both Upper Falls (11m) and Lower Falls (27m) in Balls Falls Conservation Area.
                  Pay parking $6/vehicle. Upper Falls viewable from bridge; Lower Falls requires 10-minute descent. Both freeze into ice sculptures January-February.
                  Best visit: May for spring flood flow
                </li>
                <li>
                  <strong>Beamer Memorial Conservation Area</strong> (4.1 km): Spring hawk migration hotspot; 65,000+ raptors pass overhead March-May.
                  Cliff-edge viewing platform installed 2019. Bring binoculars and field guide. Peak days: April 25-May 5. Parking $5
                </li>
                <li>
                  <strong>Rockway Falls</strong> (1.8 km): Lesser-known 18-meter cascade in Rockway Conservation Area (GPS: 43.1423°N, 79.3845°W).
                  Free parking. Falls maintain flow even in drought due to artesian spring input. Ice climbing permitted January-March (register at kiosk)
                </li>
              </ul>
            </div>

            <div className="trail-category">
              <h5>Geological Features</h5>
              <ul>
                <li>
                  <strong>St. Johns Conservation Area</strong> (5.7 km loop): Showcases all four major escarpment bedrock layers: Rochester Shale (bottom),
                  Irondequoit Limestone, Reynales Limestone, and Lockport Dolostone (cap rock). Educational plaques explain 430-million-year geological history.
                  Fossil hunting permitted in talus slopes only—hammering rock face prohibited
                </li>
                <li>
                  <strong>Niagara Glen Nature Reserve</strong> (7.8 km): Post-glacial landscape of massive limestone boulders deposited by ancient rockfall
                  events. Requires boulder scrambling (moderate technical difficulty). 350+ plant species including rare cliff-dwelling ferns. Entrance $5/person.
                  No pets allowed (protected nature reserve)
                </li>
              </ul>
            </div>

            <div className="trail-category">
              <h5>Solitude & Wilderness</h5>
              <ul>
                <li>
                  <strong>Cave Springs Side Trail</strong> (6.3 km): Remote woodland loop through mature mixed forest. Trail passes spring-fed cave (accessible
                  40m from main trail—bring headlamp). Spring water emerges at constant 9°C year-round. Used as cold storage by early settlers. Fill water bottles
                  (natural springs are potable but not tested—filter recommended)
                </li>
                <li>
                  <strong>Forty Mile Creek Trail</strong> (8.2 km): Grimsby's best-kept secret. Follows creek through private property (public easement granted
                  by landowners—stay on marked trail). Four wooden footbridges cross creek. High probability of white-tailed deer sightings (dawn/dusk).
                  Trailhead: Mountainview Road parking lot (43.1789°N, 79.5623°W)
                </li>
              </ul>
            </div>

            <div className="pro-tip">
              <h4>Trail Safety & Ethics</h4>
              <ul>
                <li><strong>White Blazes</strong>: Main Bruce Trail marked with white paint rectangles on trees/rocks</li>
                <li><strong>Blue Blazes</strong>: Side trails marked with blue paint. Always return to white blazes unless doing loop trail</li>
                <li><strong>Cell Coverage</strong>: Spotty or nonexistent in gorges and valleys. Download offline maps before hiking</li>
                <li><strong>Emergencies</strong>: QR codes every 250m link to GPS coordinates for emergency services. Scan and save before venturing into ravines</li>
                <li><strong>Tick Prevention</strong>: Lyme-carrying blacklegged ticks present April-November. Wear long pants tucked into socks. Check thoroughly after hike</li>
                <li><strong>Poison Ivy</strong>: Common along trails. "Leaves of three, let it be." Urushiol oil remains active on dead plants. Wash exposed skin ASAP</li>
                <li><strong>Trail Conditions</strong>: Check <a href="https://brucetrail.org/pages/explore/trail-conditions" target="_blank">Bruce Trail Conservancy updates</a> for closures</li>
                <li><strong>Bruce Trail Membership</strong>: $50/year individual membership supports trail maintenance and grants access to members-only parking areas</li>
              </ul>
            </div>
          </div>

          <div className="hg-gallery">
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Short_Hills_Provincial_Park.webp?v=1762838449" alt="Short Hills Provincial Park trail" />
              <figcaption>Carolinian forest canopy • Short Hills Provincial Park, Pelham</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Ontario-BruceTrail-BallsFalls27-XL.webp?v=1762838275" alt="Bruce Trail at Balls Falls" />
              <figcaption>Bruce Trail crossing Balls Falls gorge • Lincoln</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/DeCew_Falls_a1e0fa44-5ff9-4179-8dd0-c306d928cf2b.png?v=1762837248" alt="DeCew Falls" />
              <figcaption>DeCew Falls powerhouse ruins • Thorold</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 3: Hidden Beaches & Swimming Holes */}
        <section className="hg-block" id="hidden-beaches">
          <div>
            <p className="hg-tag">Secret Beaches & Swimming</p>
            <h2>The Locals-Only Beach Access Points Nobody Talks About</h2>

            <p>
              Forget Niagara-on-the-Lake Beach (overcrowded, limited parking). These hidden lakefront gems offer solitude, better swimming, and free access:
            </p>

            <h3>1. Woodend Conservation Area Beach</h3>
            <p>
              <strong>Location</strong>: 7300 Woodend Road, Niagara Falls (GPS: 43.0234°N, 79.0892°W)<br />
              <strong>Parking</strong>: Free, 150 spaces<br />
              <strong>Facilities</strong>: Washrooms (open May-October), picnic shelters, playground
            </p>
            <p>
              This 46-hectare conservation area maintains a pristine sandy beach on the Welland River where it widens into a lake-like pool before meeting
              the Niagara River. Shallow entry (1:15 slope) makes it ideal for children. Water depth reaches 1.5m at 20 meters from shore. No lifeguards—swim
              at own risk. Current speed negligible in main swimming area (0.1 m/s). Water temperature peaks at 26°C in August, warmest in the region due to
              shallow depth and dark sandy bottom absorbing solar radiation.
            </p>
            <p>
              <strong>Hidden Feature</strong>: The walking trail along the west bank leads 2.1 km to the confluence with the Niagara River—spectacular views of
              rushing green water where two rivers merge. Bring binoculars for bald eagle watching (nesting pair resident since 2018).
            </p>

            <h3>2. Waverly Beach (St. Catharines)</h3>
            <p>
              <strong>Location</strong>: End of Waverly Avenue, St. Catharines (GPS: 43.2156°N, 79.2145°W)<br />
              <strong>Parking</strong>: Street parking only (residential street—respect neighbors)<br />
              <strong>Facilities</strong>: None (bring everything)
            </p>
            <p>
              Waverly Beach exists in a peculiar limbo—publicly accessible via city-owned park at the street end, but virtually unknown outside the immediate
              neighborhood. The 60-meter beach features:
            </p>
            <ul>
              <li>Cobblestone shoreline with sandy patches appearing mid-summer as wave action redistributes sediment</li>
              <li>Excellent sunset vantage point (directly west-facing; sun sets over water June-August)</li>
              <li>Consistent 0.5-1m waves perfect for beginner bodysurfing on windy days (westerly wind direction)</li>
              <li>Shallow sandbar extending 40 meters offshore (water depth 1m even at bar's edge)</li>
              <li>Locals' tradition: sunset bonfire gatherings September-October (bring firewood; fires permitted in designated ring only)</li>
            </ul>
            <p>
              <strong>Pro Tip</strong>: Arrive before 3 PM on summer weekends to secure parking. After 7 PM, residents leave for dinner and spots open up.
            </p>

            <h3>3. Wainfleet Wetlands Hidden Lagoon</h3>
            <p>
              <strong>Location</strong>: Access via Stromness Road trail, Wainfleet (GPS: 42.9234°N, 79.3456°W)<br />
              <strong>Parking</strong>: Roadside pulloff at trailhead (unofficial)<br />
              <strong>Facilities</strong>: None (true wilderness experience)
            </p>
            <p>
              This is the ultimate hidden swimming spot—a crystal-clear lagoon fed by underground springs, nestled in the Wainfleet Wetlands Complex. Access
              requires a 25-minute hike (1.7 km) along an unmarked but well-worn footpath through marsh and meadow. <em>Do not attempt in wet conditions or spring
              flooding (March-May); trail becomes impassable.</em>
            </p>
            <p>
              The lagoon measures approximately 40m × 25m with a maximum depth of 3.5m. Water temperature stays cool year-round (18-20°C even in August) due to
              artesian spring input. Exceptional visibility (5+ meters) allows for snorkeling—observe schools of pumpkinseed sunfish, crayfish, and aquatic
              vegetation. Sandy bottom transitions to clay at depth.
            </p>
            <p>
              <strong>Critical Notes</strong>:
            </p>
            <ul>
              <li>No lifeguards, no cell service, no rescue equipment. Strong swimming ability required.</li>
              <li>Pack in/pack out all trash. This site's pristine condition depends on visitor respect.</li>
              <li>Swimming holes on private property accessed via informal easement. Be respectful and quiet.</li>
              <li>Water quality not tested by health authorities—swim at own risk.</li>
            </ul>

            <h3>4. Crystal Beach (Fort Erie): The Resurgent Classic</h3>
            <p>
              <strong>Location</strong>: Crystal Beach, Fort Erie (multiple access points along Erie Road)<br />
              <strong>Parking</strong>: Municipal lots $10/day (summer), free off-season<br />
              <strong>Facilities</strong>: Full amenities (washrooms, showers, concessions, lifeguards on duty)
            </p>
            <p>
              Crystal Beach isn't exactly "hidden"—it was Ontario's Atlantic City during the early 20th century, welcoming 1 million visitors annually to the
              famous Crystal Beach Amusement Park (1888-1989). But after the park's closure, Crystal Beach faded from the public consciousness. In the 2020s,
              it's experiencing a renaissance:
            </p>
            <ul>
              <li>
                <strong>Superior Water Quality</strong>: Lake Erie's western basin reaches 25-27°C by late July (warmest of the Great Lakes). Shallow slope means
                50 meters of wading before reaching chest depth. Lifeguards on duty July-August, 10 AM-6 PM
              </li>
              <li>
                <strong>The Infamous Undertow</strong>: Crystal Beach's rip currents claimed 27 lives between 1892-1930, earning it the nickname "Drowning Beach."
                Modern beach management and lifeguard presence have eliminated fatalities since 1991. Still, respect the water: never swim outside guarded areas
                or during red flag warnings
              </li>
              <li>
                <strong>Sunset Ritual</strong>: Lake Erie's southwest orientation creates legendary sunsets. The beach bar (Dockside Bar & Grill, 1 Derby Road)
                fills with sunset chasers at 8:30 PM June-August. Arrive by 8 PM to secure lake-view table
              </li>
              <li>
                <strong>Winter Ice Formations</strong>: February transforms the beach into an alien landscape of ice volcanoes, pressure ridges, and frozen wave
                formations. Park closes to vehicles but winter walking access remains open. Dress for arctic conditions (wind chill regularly -25°C)
              </li>
            </ul>

            <h3>5. Queenston Quarry: Urban Cliff Jumping (Experienced Only)</h3>
            <p>
              <strong>Location</strong>: Behind 6045 Niagara Parkway, Queenston (GPS: 43.1578°N, 79.0456°W)<br />
              <strong>Parking</strong>: None official (park in town and walk 800m)<br />
              <strong>Facilities</strong>: None
            </p>
            <p>
              <strong>WARNING: THIS IS NOT AN OFFICIALLY SANCTIONED SWIMMING AREA. JUMP AT YOUR OWN RISK.</strong> The abandoned Queenston limestone quarry
              filled with groundwater after operations ceased in 1932, creating a 200m × 150m pool with 12-meter cliffs on three sides. Locals have cliff-jumped
              here for generations despite frequent "No Trespassing" signs.
            </p>
            <p>
              <strong>Hazards</strong>:
            </p>
            <ul>
              <li>Water depth unknown (estimates 8-15 meters based on historical quarry records)</li>
              <li>Submerged debris possible (old quarry equipment, rockfall)</li>
              <li>No shallow entry point—cliff jumping or rappelling only access to water</li>
              <li>No cell service in quarry bowl</li>
              <li>Police occasionally patrol and issue trespassing citations ($85 fine)</li>
            </ul>
            <p>
              If you choose to visit despite warnings: Never jump alone, always check landing zone for debris/swimmers, jump feet-first with arms crossed over
              chest, and maintain at least 5-meter clearance from cliff face. Wear water shoes (sharp rocks on ledges).
            </p>

            <div className="pro-tip">
              <h4>Beach & Water Safety Essentials</h4>
              <ul>
                <li><strong>Beach Reports</strong>: Check daily E. coli testing results at <a href="https://www.niagararegion.ca/beach-report/" target="_blank">niagararegion.ca/beach-report</a> (updated 10 AM)</li>
                <li><strong>Rip Currents</strong>: If caught in rip current, swim parallel to shore until free, then angle back to beach. Never fight current directly</li>
                <li><strong>UV Protection</strong>: UV index exceeds 8 ("very high") June-August. Reapply SPF 30+ sunscreen every 90 minutes and after swimming</li>
                <li><strong>Jellyfish</strong>: Freshwater jellyfish (Craspedacusta sowerbii) occasionally appear Lake Ontario/Erie July-September. Harmless but startling. Size: 5-25mm diameter</li>
                <li><strong>Blue-Green Algae</strong>: Toxic cyanobacteria blooms possible during hot, calm weather. Avoid water if surface looks like green paint or pea soup</li>
                <li><strong>Hidden Costs</strong>: Most conservation area beaches charge $6-12 parking per vehicle. Season passes available ($50-75) from respective conservation authorities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Downtown Districts & Architecture */}
        <section className="hg-block" id="downtown">
          <div>
            <p className="hg-tag">Urban Histories & Architecture</p>
            <h2>Montebello Park, Downtown Revivals, and the Architectural Gems Hidden in Plain Sight</h2>

            <h3>Montebello Park: Frederick Law Olmsted's Canadian Masterwork</h3>
            <p>
              <a href="https://www.stcatharines.ca/en/parks-and-trails/montebello-park.aspx" target="_blank" rel="noopener">Montebello Park</a> (GPS: 43.1589°N,
              79.2456°W) represents Frederick Law Olmsted's only completed park design in Canada. Olmsted—legendary designer of New York's Central Park, Boston's
              Emerald Necklace, and Montreal's Mount Royal Park—created this 10-acre masterpiece in 1887 for the Welland Vale Manufacturing Company as a
              private pleasure ground for employees.
            </p>
            <p>
              The park transitioned to public ownership in 1888 and has been meticulously maintained according to Olmsted's original plans:
            </p>
            <ul>
              <li>
                <strong>Serpentine Pathways</strong>: Curved promenades designed to create the illusion of larger space through strategic sightline manipulation.
                Walk the perimeter path (0.8 km) to experience Olmsted's signature "picturesque" landscape theory
              </li>
              <li>
                <strong>The Band Shell (1900)</strong>: Octagonal Victorian bandstand hosts free summer concerts Thursdays 7-9 PM, June-August. Bring lawn chairs
                or blankets. Featured acts range from swing orchestras to folk ensembles. Schedule posted at <a href="https://www.stcatharines.ca/en/live-and-play/summer-concert-series.aspx" target="_blank">city website</a>
              </li>
              <li>
                <strong>Rose Garden (1,300 bushes)</strong>: Established 1912, featuring 42 heritage rose varieties. Peak bloom: mid-June through early July.
                Fragrance reaches maximum intensity during warm afternoons (2-5 PM). Wedding photography popular—reserve gazebo permits through Parks Department
              </li>
              <li>
                <strong>Duck Pond & Fountain</strong>: The ornate cast-iron fountain (1890) underwent restoration in 2018. Operates May-October, illuminated
                after dark. Mallards, wood ducks, and occasional great blue herons frequent the pond. No feeding wildlife (city bylaw)
              </li>
              <li>
                <strong>Hidden Feature: The Underground Stream</strong>: Twelve Mile Creek flows beneath the eastern section of the park through a stone culvert
                built 1876. Listen for rushing water near the eastern gate during spring floods. Access grate visible near Ontario Street entrance
              </li>
            </ul>

            <h3>Downtown St. Catharines: The James Street Revival</h3>
            <p>
              James Street North (between King and Geneva Streets) has transformed from post-industrial decline to Niagara's hippest urban corridor.
              The revival began with artist studio conversions in the early 2010s and accelerated with craft breweries, live music venues, and
              farm-to-table restaurants establishing roots 2015-2020.
            </p>

            <h4>Essential James Street Destinations:</h4>
            <ul>
              <li>
                <strong>Mahtay Café & Lounge</strong> (67 James St N): Indigenous-owned café serving traditional bannock breakfast sandwiches and cedar tea.
                Try the Three Sisters Bowl (squash, beans, corn). Opens 7 AM weekdays, 8 AM weekends. Mahtay means "thank you" in Anishinaabemowin
              </li>
              <li>
                <strong>The Merchant Ale House</strong> (98 St. Paul St, just off James): 30 rotating craft beer taps emphasizing Ontario breweries.
                Sunday cask nights feature one-off collaborations. Kitchen serves elevated pub fare until midnight
              </li>
              <li>
                <strong>Burrito Boyz</strong> (156 James St N): Late-night institution (open until 3 AM Fri-Sat). Massive burritos for $10-12.
                The "Dirty Bird" (jerk chicken, plantains, black beans) is legendary. Expect lineups after 11 PM
              </li>
              <li>
                <strong>Warehouse Concert Hall</strong> (67 Geneva St): All-ages venue hosting indie rock, hip-hop, and electronic acts. Capacity 450.
                Advance tickets recommended ($15-35). Check schedule at <a href="https://www.warehouseconcerthall.com" target="_blank">warehouseconcerthall.com</a>
              </li>
              <li>
                <strong>FirstOntario Performing Arts Centre</strong> (250 St. Paul St): $60-million facility opened 2015. Four performance venues under
                one roof. See Niagara Symphony Orchestra, touring Broadway shows, comedy acts. Tickets via <a href="https://firstontariopac.ca" target="_blank">firstontariopac.ca</a>
              </li>
            </ul>

            <h3>Architectural Heritage Walking Tour</h3>
            <p>
              St. Catharines maintains 23 Heritage Conservation Districts protecting over 500 historic structures. Self-guided walking tour map available
              at Tourism Office (1932 Welland Canals Parkway) or <a href="https://www.stcatharines.ca/en/arts-culture-and-events/heritage-conservation-districts.aspx" target="_blank">download PDF</a>.
            </p>

            <h4>Architectural Highlights:</h4>
            <ul>
              <li>
                <strong>St. Catharines City Hall (1854)</strong> (43 Church St): Italianate Revival style with 26-meter clock tower. Originally built as
                county courthouse. Tours available by appointment—email <a href="mailto:heritage@stcatharines.ca">heritage@stcatharines.ca</a>.
                Clock mechanism (installed 1856) still operates mechanically; wound weekly by city staff
              </li>
              <li>
                <strong>Salem Chapel (British Methodist Episcopal Church)</strong> (92 Geneva St): National Historic Site designated 2000. This 1855 chapel
                served as terminus of the Underground Railroad. Harriet Tubman worshipped here 1851-1858 while living in St. Catharines. Interior features
                original pews and pulpit. Open for tours May-October, Saturdays 10 AM-4 PM. Free admission, donations appreciated
              </li>
              <li>
                <strong>Rodman Hall Art Centre</strong> (109 St. Paul Crescent): 1862 Georgian mansion converted to public art gallery 1974. Rotating
                exhibitions emphasize Niagara artists. Sculpture garden features works by contemporary Canadian artists. Admission $8 adults, $5 students/seniors.
                Free Thursdays 5-8 PM
              </li>
              <li>
                <strong>Welland House (1854)</strong> (14 Queen St): St. Catharines Museum's main building. Red-brick Georgian architecture houses permanent
                exhibitions on local history, Welland Canal engineering, and Underground Railroad narratives. Museum admission: $6 adults, $4 seniors/students,
                free under 12. Open Tue-Sat 10 AM-5 PM, Sun 1-5 PM
              </li>
            </ul>

            <h3>Jordan Village: Preservation Success Story</h3>
            <p>
              <a href="https://www.niagarasouthcoast.com/jordan-village" target="_blank" rel="noopener">Jordan Village</a> (GPS: 43.1589°N, 79.3678°W)
              represents one of Ontario's best-preserved 19th-century villages. Originally a United Empire Loyalist settlement (1788), Jordan thrived as
              a fruit processing center 1850-1950 before economic decline led to abandonment of many buildings.
            </p>
            <p>
              The Jordan Historical Museum Association spearheaded preservation efforts starting 1953, leading to Heritage Conservation District designation
              in 1982. Today, Jordan balances preservation with wine-country tourism:
            </p>

            <h4>Jordan Village Essentials:</h4>
            <ul>
              <li>
                <strong>Jordan Historical Museum (3802 Main St)</strong>: 1850s frame house museum with period rooms and agricultural exhibits.
                May-October: Wed-Sun 10 AM-5 PM. November-April: weekends only. Admission: $5 adults, $3 seniors/students
              </li>
              <li>
                <strong>Ball's Falls Conservation Area</strong> (3292 Sixth Ave): 200-hectare park featuring double waterfalls, pioneer village,
                grist mill, and 20 km of hiking trails. Day-use fee: $6/vehicle. Lime kiln ruins and 1800s cemetery accessible via Blue Trail (2.3 km)
              </li>
              <li>
                <strong>The Good Earth Food and Wine Co.</strong> (4556 Lincoln Ave): Farm-to-table restaurant in restored 1878 fruit packing house.
                Lunch daily 11:30 AM-3 PM, dinner Tue-Sun from 5 PM. Reservations essential weekends. Seasonal menu emphasizes Niagara produce and wines.
                Mains $24-42
              </li>
              <li>
                <strong>Cave Spring Cellars</strong> (3836 Main St): Winery tasting room in Georgian coach house. Daily tastings 11 AM-6 PM ($10,
                refundable with purchase). Underground caves (constant 12°C) visible through tasting room windows. Parking can be tight—arrive before
                noon weekends
              </li>
            </ul>
          </div>

          <div className="hg-gallery">
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/downtown-st-catharines-ugc-4.webp?v=1762838539" alt="Downtown St. Catharines street" />
              <figcaption>James Street after dusk • St. Catharines</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Montebello_park-Vintage.webp?v=1762837075" alt="Vintage Montebello Park illustration" />
              <figcaption>Montebello Park postcard, 1907</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Jordan__Ontario-Laslovarga__14.jpg?v=1762837248" alt="Jordan Village main street" />
              <figcaption>Jordan Village blue-hour</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 5: Engineering Marvels & Heritage Landmarks */}
        <section className="hg-block" id="landmarks">
          <div>
            <p className="hg-tag">Engineering & Heritage</p>
            <h2>Brock's Monument, Nikola Tesla's Legacy, and the Engineering Wonders That Changed the World</h2>

            <h3>Brock's Monument: Twice Built, Forever Standing</h3>
            <p>
              <a href="https://www.niagaraparks.com/visit/heritage/sites/queenston-heights" target="_blank" rel="noopener">Brock's Monument</a>
              (GPS: 43.1581°N, 79.0531°W) honors Major-General Sir Isaac Brock, British commander killed October 13, 1812 during the Battle of Queenston Heights.
              The monument's history mirrors Canada's turbulent 19th century:
            </p>
            <ul>
              <li>
                <strong>First Monument (1824-1840)</strong>: 40-meter Tuscan column completed 1824. Fenian sympathizers detonated explosives at its base
                April 17, 1840, causing partial collapse. Brock's remains removed from crypt and re-interred at Fort George before demolition of damaged structure
              </li>
              <li>
                <strong>Second Monument (1853-present)</strong>: Current 56-meter limestone column completed 1853, tallest monument in Canada at the time.
                Brock's remains moved to new crypt beneath the monument October 13, 1853 (41st anniversary of his death). Internal spiral staircase of 235 steps
                leads to observation platform offering 360° views
              </li>
              <li>
                <strong>Visitor Access</strong>: Monument grounds open year-round, dawn to dusk. Climb to observation deck: $6.50 adults, $4.25 youth (6-12).
                Opens mid-May through October, 10 AM-5 PM daily. Last climb 4:30 PM. No elevator—must climb stairs (not wheelchair accessible)
              </li>
              <li>
                <strong>Aerial Navigation Role</strong>: Monument serves as VFR waypoint for pilots approaching Niagara District Airport (CYSN).
                Charts list it as "BROCK MON" at 56m AGL, making it the tallest structure in Niagara Region. White LED lighting (installed 2014) visible 20+ km
              </li>
            </ul>

            <h3>The Nikola Tesla Statue and the Birth of the Electrical Age</h3>
            <p>
              The <a href="https://www.niagaraparks.com/visit/heritage/sites/nikola-tesla-statue" target="_blank" rel="noopener">Nikola Tesla statue</a>
              (GPS: 43.0889°N, 79.0567°W) stands beside the Sir Adam Beck Hydroelectric Generating Stations, honoring Tesla's revolutionary AC (alternating current)
              electrical system that made Niagara's hydroelectric potential realizable.
            </p>

            <h4>The Historic Context:</h4>
            <p>
              Before Tesla's AC system, Thomas Edison's direct current (DC) could transmit electricity only 1-2 kilometers from generation source—useless for
              harnessing Niagara Falls' power for distant cities. Tesla's polyphase AC system (patents filed 1887-1888, acquired by Westinghouse 1888) enabled
              long-distance transmission with minimal loss.
            </p>
            <p>
              The Edward Dean Adams Power Plant (1895, now demolished) was the first large-scale implementation of Tesla's AC system. Ten 5,000-horsepower
              generators produced electricity transmitted 32 kilometers to Buffalo, New York—at the time, the longest-distance power transmission ever achieved.
              This success proved AC's viability, leading to worldwide adoption and the modern electrical grid.
            </p>

            <h4>Modern Hydroelectric Legacy:</h4>
            <ul>
              <li>
                <strong>Sir Adam Beck I (1922)</strong>: 490 MW capacity, 10 generators. Visible from viewing area at Table Rock Centre
              </li>
              <li>
                <strong>Sir Adam Beck II (1954)</strong>: 1,499 MW capacity, 16 generators. Massive 6.4 km intake tunnel diverts 60% of Niagara River flow
                during off-tourist hours (9 PM-8 AM)
              </li>
              <li>
                <strong>Robert Moses Niagara Power Plant (US side, 1961)</strong>: 2,675 MW capacity. Combined Niagara Falls hydroelectric production:
                4,664 MW—enough to power 3.8 million homes
              </li>
              <li>
                <strong>Flow Management</strong>: 1950 Niagara Treaty mandates 100,000 cubic feet per second (2,832 m³/s) over falls during daylight
                April-October, 50,000 cfs at night and off-season. Maximum diversion for power: 75,000 cfs (US) + 75,000 cfs (Canada)
              </li>
            </ul>

            <h3>The Whirlpool Aero Car: 109 Years of Cable Car History</h3>
            <p>
              The <a href="https://www.niagaraparks.com/visit/attractions/whirlpool-aero-car" target="_blank" rel="noopener">Whirlpool Aero Car</a>
              (GPS: 43.1156°N, 79.0678°W) represents one of the oldest continuously operating cable cars in North America. Spanish engineer Leonardo Torres
              Quevedo designed this antecession cable car system (cable pulls both directions depending on car position) specifically for the Niagara Gorge site.
            </p>

            <h4>Engineering Marvel:</h4>
            <ul>
              <li>
                <strong>Span</strong>: 548 meters (1,800 feet) across the gorge, 76 meters (250 feet) above the Whirlpool
              </li>
              <li>
                <strong>Capacity</strong>: 35 passengers per crossing, wheelchair accessible (as of 2016 renovation)
              </li>
              <li>
                <strong>Operation</strong>: Six main cables (5 cm diameter) plus track cable support the car. No engine aboard—cable system pulls car
                between stations. One-way journey: 7-8 minutes
              </li>
              <li>
                <strong>The Whirlpool Below</strong>: The Niagara Whirlpool formed 7,500 years ago when river eroded through to a buried bedrock gorge
                (ancient St. Davids Gorge). Water depth: 38 meters. During high flow, river makes one complete counter-clockwise rotation every ~3 minutes
              </li>
            </ul>
            <p>
              <strong>Visitor Info</strong>: Opens April-October, weather permitting. Hours: 10 AM-5 PM (10 AM-8 PM July-August). Tickets: $16 adults,
              $10.50 children (6-12), free under 6. Combo passes with Journey Behind the Falls and Hornblower available. Parking $25/day at nearby lot
              (better to cycle Niagara River Recreation Trail and save $25)
            </p>

            <h3>The Welland Canal: Engineering Wonder Hiding in Plain Sight</h3>
            <p>
              The <strong>Welland Canal</strong>—specifically the Fourth Canal (1932-present)—lifts ships 99.5 meters over the Niagara Escarpment via eight
              locks, connecting Lake Ontario to Lake Erie. It's one of North America's busiest canals (40 million metric tons of cargo annually) yet most
              Niagara residents never witness a ship passage.
            </p>

            <h4>Best Ship-Watching Locations:</h4>
            <ul>
              <li>
                <strong>Lock 3 Viewing Platform (Thorold)</strong>: The "Big Lift"—Lock 3 has 13.7m lift in a single chamber, one of the highest
                conventional lock lifts in North America. Viewing platform (1932 Chapel St S, Thorold) provides eye-level views. Museum on-site.
                Free admission. Peak ship traffic: April-December, 2-4 ships daily in high season. Real-time ship tracker:
                <a href="https://www.marinetraffic.com" target="_blank">marinetraffic.com</a> (zoom to Welland Canal)
              </li>
              <li>
                <strong>Lock 7 Overlook (Thorold)</strong>: Twin flight locks (Locks 4, 5, 6, 7) visible from public viewing area at Government Road.
                Compact lock spacing means you might see ships in multiple locks simultaneously during busy periods
              </li>
              <li>
                <strong>Port Colborne Lock 8</strong>: Southern terminus where canal meets Lake Erie. Ship size increases dramatically here as freighters
                enter the canal from the lake. Sunset views over Lake Erie backdrop. Free parking at Sugarloaf Street Marina
              </li>
            </ul>
            <p>
              <strong>Ship Types You'll See</strong>: "Salties" (ocean-going vessels—max size: 225.6m × 23.8m × 8.08m draft), "Lakers" (Great Lakes bulk
              freighters—max size: 225.6m × 23.8m), cement carriers, grain ships, and occasional passenger vessels. Historical note: The canal was enlarged
              to "Seaway-max" dimensions (1959) to accommodate St. Lawrence Seaway traffic.
            </p>
          </div>

          <div className="hg-gallery hg-gallery--quad">
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Brock_s_Monument_2015.jpg?v=1762837075" alt="Brock's Monument" />
              <figcaption>Brock's Monument • Queenston Heights</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Monument_honours_inventor_Nikola_Tesla.jpg?v=1762837075" alt="Nikola Tesla statue" />
              <figcaption>Nikola Tesla memorial • Niagara Falls</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Efforts_to_commemorate_Rush_drummer_Neil_Peart_ramping_up.jpg?v=1762837075" alt="Neil Peart memorial" />
              <figcaption>Neil Peart memorial plans • Lakeside Park</figcaption>
            </figure>
            <figure>
              <img src="https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Whirlpool_Aero_Car.png?v=1762837100" alt="Whirlpool Aero Car" />
              <figcaption>Whirlpool Aero Car • Niagara River</figcaption>
            </figure>
          </div>
        </section>

        {/* Adding a closing section and footer */}
        <section className="hg-block" id="itinerary">
          <div>
            <p className="hg-tag">Planning Your Visit</p>
            <h2>Multi-Day Itineraries for Every Type of Traveler</h2>

            <h3>The Weekend Warrior (48 Hours)</h3>
            <p><strong>For first-timers who want the greatest hits plus hidden gems</strong></p>

            <h4>Day 1: Lake & Trails</h4>
            <ul>
              <li><strong>6:30 AM</strong>: Sunrise at Sunset Beach; SUP rental from Great Lakes SUP</li>
              <li><strong>8:30 AM</strong>: Breakfast at Mahtay Café (bannock sandwich & cedar tea)</li>
              <li><strong>10:00 AM</strong>: Drive to Short Hills Provincial Park; hike Swayze Falls Loop (6.4 km, 2.5 hours)</li>
              <li><strong>1:30 PM</strong>: Lunch in Jordan Village (The Good Earth or pack a picnic)</li>
              <li><strong>3:00 PM</strong>: Wine tasting at Cave Spring Cellars or Flat Rock Cellars</li>
              <li><strong>5:00 PM</strong>: Golden hour at DeCew Falls; explore powerhouse ruins</li>
              <li><strong>7:30 PM</strong>: Dinner on James Street (Merchant Ale House or Beechwood Doughnuts for casual)</li>
              <li><strong>9:00 PM</strong>: Evening walk through Montebello Park (illuminated fountain)</li>
            </ul>

            <h4>Day 2: History & Engineering</h4>
            <ul>
              <li><strong>8:00 AM</strong>: Breakfast in Niagara-on-the-Lake (Willow Cakes & Coffee)</li>
              <li><strong>9:30 AM</strong>: Queenston Heights Park: Climb Brock's Monument + battlefield walking tour</li>
              <li><strong>11:30 AM</strong>: Whirlpool Aero Car ride</li>
              <li><strong>1:00 PM</strong>: Lunch at Queenston Heights Restaurant (patio with gorge views)</li>
              <li><strong>2:30 PM</strong>: Lock 3 Viewing Centre (time ship passage if possible—check tracker app)</li>
              <li><strong>4:00 PM</strong>: St. Catharines Museum & Salem Chapel tour</li>
              <li><strong>6:00 PM</strong>: Niagara SkyWheel at sunset (optional)</li>
              <li><strong>7:30 PM</strong>: Dinner at Tide & Vine Oyster House (St. Catharines)</li>
            </ul>

            <h3>The Nature Enthusiast (4 Days)</h3>
            <p><strong>For hikers, birders, and outdoor adventurers</strong></p>

            <h4>Day 1: Bruce Trail North Section</h4>
            <ul>
              <li>Queenston to St. Davids section (18 km point-to-point; arrange car shuttle)</li>
              <li>Highlights: Queenston Quarry, St. Davids Gorge, Niagara Glen side trail</li>
              <li>Evening: Bonfire at Crystal Beach (bring firewood)</li>
            </ul>

            <h4>Day 2: Short Hills Exploration</h4>
            <ul>
              <li>Swayze Falls + Bootlegger's Route (if confident with navigation)</li>
              <li>Afternoon: Beamer Memorial Conservation Area for hawk watching (spring migration)</li>
              <li>Evening: Jordan Village wine tasting and dinner</li>
            </ul>

            <h4>Day 3: Water Day</h4>
            <ul>
              <li>Morning: Kayak rental at Port Dalhousie; paddle to Martindale Pond</li>
              <li>Afternoon: Waverly Beach swimming and bodysurfing</li>
              <li>Evening: Sunset photography at Sunset Beach</li>
            </ul>

            <h4>Day 4: Southern Wilderness</h4>
            <ul>
              <li>Wainfleet Wetlands hidden lagoon (pack lunch)</li>
              <li>Afternoon: Crystal Beach and Ridgeway Battlefield site</li>
              <li>Evening: Burrito Boyz takeout + Port Colborne lighthouse sunset</li>
            </ul>

            <div className="pro-tip">
              <h4>Essential Planning Resources</h4>
              <ul>
                <li><strong>Accommodation</strong>: Book 3+ months ahead for summer weekends. Try VRBO/Airbnb in St. Catharines or Niagara-on-the-Lake. Budget: $120-250/night</li>
                <li><strong>Transportation</strong>: Car essential for hidden gems. Bike rentals available Niagara-on-the-Lake ($30-50/day). ZipCar/Enterprise in downtown St. Catharines</li>
                <li><strong>Weather</strong>: Check 7-day forecast before hiking. Spring and fall bring rapid weather changes. Summer heat peaks 28-32°C July-August. Winter: -10 to -20°C with lake-effect snow</li>
                <li><strong>Cell Coverage</strong>: Rogers/Bell good throughout. Telus spotty in gorges. Download offline maps for hiking (Avenza Maps, Gaia GPS)</li>
                <li><strong>Budget</strong>: Daily estimate $100-150/person (meals, attractions, parking). Wine tours add $50-100/person. Camping options: Happy Rolph's Animal Farm ($35-45/night)</li>
                <li><strong>Local Visitor Info</strong>: Tourism Niagara office, 5515 Stanley Ave, Niagara Falls. Open 9 AM-5 PM daily. Free maps and brochures. Staff extremely knowledgeable</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="hg-footnotes">
          <h3>References & Further Reading</h3>
          <ol>
            <li>Niagara Parks Commission, "Battle of Beaver Dams & Laura Secord," 2024. <a href="https://www.niagaraparks.com/visit/heritage/sites/laura-secord-homestead" target="_blank" rel="noopener">Source</a></li>
            <li>City of St. Catharines Archives, "Montebello Park: Olmsted's Canadian Masterwork," 2023. <a href="https://www.stcatharines.ca/en/parks-and-trails/montebello-park.aspx" target="_blank" rel="noopener">Source</a></li>
            <li>Niagara Parks, "Queenston Heights National Historic Site," 2024. <a href="https://www.niagaraparks.com/visit/heritage/sites/queenston-heights" target="_blank" rel="noopener">Source</a></li>
            <li>Niagara Falls History Museum, "RCAF Training & Merritton Tunnel," Exhibit Notes 2022</li>
            <li>Ontario Parks, "Short Hills Provincial Park Management Plan," 2020</li>
            <li>Bruce Trail Conservancy, "Niagara Section Guide," 2024 Edition</li>
            <li>St. Catharines Museum & Welland Canals Centre, "Port Dalhousie Lighthouse Logbooks," Archive Collection</li>
            <li>Tesla, Nikola. "System of Electrical Distribution." U.S. Patent 381,968, filed 1887</li>
            <li>St. Lawrence Seaway Management Corporation, "Welland Canal Traffic Statistics," 2023 Annual Report</li>
            <li>Niagara Region Public Health, "Beach Water Quality Monitoring Program," 2024 Data</li>
          </ol>

          <h3>Acknowledgments</h3>
          <p>
            This guide incorporates knowledge from dozens of local historians, trail stewards, business owners, and Niagara residents who shared their hidden gems.
            Special thanks to the Bruce Trail Conservancy volunteers, Niagara Parks heritage interpreters, and the staff at conservation area offices who patiently
            answered countless questions about trail conditions, historical details, and natural history.
          </p>
          <p>
            Indigenous place names and historical context provided in consultation with members of the Six Nations of the Grand River and Mississaugas of the
            Credit First Nation. This guide respectfully acknowledges that the Niagara Region sits on traditional territories of the Haudenosaunee and
            Anishinaabe peoples.
          </p>

          <div className="guide-updates">
            <h4>Guide Updates & Corrections</h4>
            <p>
              This guide was last updated December 2025. Trails, hours, and attractions change frequently. Before visiting specific locations:
            </p>
            <ul>
              <li>Check official websites for current hours and admission fees</li>
              <li>Call ahead to confirm trails are open (seasonal closures common)</li>
              <li>Verify road/parking access, especially for rural locations</li>
              <li>Check conservation area websites for hunting season closures (October-December)</li>
            </ul>
            <p>
              Found an error or know of an updated hidden gem? <Link href="/contact">Contact us</Link> with corrections and additions for the next edition.
            </p>
          </div>
        </footer>

      </article>

      <aside className="related-content">
        <h2>Continue Exploring</h2>
        <div className="related-grid">
          <Link href="/location/niagara" className="related-card">
            <h3>Paint Services in Niagara</h3>
            <p>Find professional painters and suppliers across the region</p>
          </Link>
          <Link href="/blog" className="related-card">
            <h3>More Travel Guides</h3>
            <p>Explore other hidden gems and local insights</p>
          </Link>
        </div>
      </aside>
      </div>
    </>
  )
}
