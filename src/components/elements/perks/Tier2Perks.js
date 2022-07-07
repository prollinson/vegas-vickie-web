

  let tier2Perks = [
    {
      name: 'Suite for 3 Nights',
      description: 'Three-night stay in a Circa suite, to be used at the Summer Bash or within a year of purchase'
    },
    {
      name: 'Limo Pick-up & Drop-off',
      description :'Round trip limo airport transportation while in Las Vegas.'
    },
    {
      name: 'Welcome Cocktail',
      description :'Welcome cocktail at Vegas Vickie\'s Cocktail lounge.'
    },
    {
      name: 'Entry to Summer Bash + Cabana',
      description :'Access to a Stadium Swim cabana at Summer Bash'
    },
    {
      name: 'Welcome Reception + Open bar',
      description :'Open-bar reception for Summer Bash at Legacy Club'
    },
    {
      name: '$500 Property Credit',
      description: '$500 to spend on food & drinks anywhere on the property during your stay.'
    },
    {
      name: 'Circa Coffee Table Book',
      description :''
    }
  ]

function Tier2Perks() {
  let sectionHeading2 = "text-sm sm:text-md text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-sm md:text-md';

  return (
    <ul className="font-body text-white pt-4">
      {tier2Perks.map((perk, index) => (
        <li key={index} className="pt-3 pb-3">
          <h2 className={`${sectionHeading2}`}>{perk.name}</h2>
          <p className={`${bodyTextSmall}`}>{perk.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default Tier2Perks;