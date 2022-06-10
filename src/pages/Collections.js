
import NftCollection from '../components/elements/NftCollection';
import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';

// Assets
import collectorNftImage from '../assets/collector_nft_preview.jpg';
import legendNftImage from '../assets/legend_nft_preview.jpg';
import maverickNftImage from '../assets/maverick_nft_preview.jpg';
import gamblerNftImage from '../assets/gambler_nft_preview.jpg';

function Collections() {
  
  let tier1CollectorPerks = [
    '(3) Night stay in a founder\'s suite to be used at the summer bash or within one year of purchase.',
    'Round trip limo transportation from the airport to Circa Resort & Casino.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with an Owner\'s Suite.',
    'Welcome reception at Legacy Club w/ a Derek & Borbay meet & greet.',
    'Open bar at the Legacy Club welcome reception.',
    'Circa Coffee Table Book.',
    '$1000 F&B Credit.',
    'Glass print.'
  ]

  let tier2CollectorPerks = [
    '(3) Night stay in a suite room to be used at the summer bash or within one year of purchase.',
    'Round trip limo transportation from the airport to Circa Resort & Casino.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with a paired cabana.',
    'Access to the Legacy Club welcome reception party with open bar',
    'Circa Coffee Table Book.',
    '$500 F&B Credit.',
  ]

  let tier3CollectorPerks = [
    '(3) Night stay in a standard room to be used at the summer bash or within one year of purchase.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with lounge chairs based on availability.',
    '$250 F&B Credit.',
  ]

  let tier4CollectorPerks = [
    'Digital artwork',
    'Invitation to the weekend & GA admission to the Vegas Vickie Summer Bash at Stadium Swim',
    'Welcome bag to be picked up at Club One',
    'Welcome cocktail at Vegas Vickies.',
  ]

  return (
    <>
      <Header />
      <PageHeader pageTitle="The Collections" />

      <NftCollection
        name="The One and Only"
        description=""
        nftImage={collectorNftImage}
        perks={tier1CollectorPerks}
        totalSupply={1}
        maxSupply={"1/1"}
        mintPrice={"TBD"}
      />

      <NftCollection
        name="Dealer's Choice"
        description=""
        nftImage={legendNftImage}
        perks={tier2CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"54"}
      />

      <NftCollection
        name="Neon Idol"
        description=""
        nftImage={maverickNftImage}
        perks={tier3CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"250"}
      />

      <NftCollection
        name="Off the Rack"
        description=""
        nftImage={gamblerNftImage}
        perks={tier4CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"2500"}
      />
    </>
  );
}

export default Collections;
