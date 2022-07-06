

  let perks = [
    {
      name: 'Founders Suite for 3 Nights',
      description: 'Three-night stay in Circa\'s largest suite offering, the Founder\'s Suite, to be used at Summer Bash or within one year of purchase.'
    },
    {
      name: 'Limo Pick-up & Drop-off',
      description :'Round trip limo aitport transportation while in Las Vegas.'
    },
    {
      name: 'Welcome Cocktail',
      description :'Welcome cocktail at Vegas Vickies Cocktail Lounge.'
    },
    {
      name: 'Entry to Summer Bash + Cabana',
      description :'Stadium Swim Owner\'s Suite at Summer Bash with up to 20 of your favorite NFT Vegas Vickie friends'
    },
    {
      name: 'Welcome Reception + Open bar',
      description :'Open-bar reception for Summer Bash at Legacy Club, including an exclusive meet & greet with Circa\'s CEO Derek Stevens and Borbay'
    },
    {
      name: '$1000 Property Credit',
      description: '$1000 to spend on food & drinks anywhere on property during your stay.'
    },
    {
      name: 'Circa Coffee Table Book & Glass Print',
      description :'Circa coffee-table book and glass print of the Vegas Vickie painting'
    }
  ]

function Tier1Perks() {
  let sectionHeading2 = "text-md sm:text-md text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-md';

  return (
    <ul className="font-body text-white pt-4">
      {perks.map((perk, index) => (
        <li key={index} className="pt-3 pb-3">
          <h2 className={`${sectionHeading2}`}>{perk.name}</h2>
          <p className={`${bodyTextSmall}`}>{perk.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default Tier1Perks;