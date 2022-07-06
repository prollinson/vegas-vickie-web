
let perks = [
  {
    name: 'Standard Room for 3 Nights',
    description: 'Three-night stay in a Circa standard room, to be used at the Summer Bash or within one year of purchase'
  },
  {
    name: 'Welcome Cocktail',
    description :'Welcome cocktail at Vegas Vickie\'s Cocktail Lounge.'
  },
  {
    name: 'Entry to Summer Bash + Lounge Chairs',
    description :'Complimentary access to the Summer Bash at Stadium Swim with lounge chairs, based on availability.'
  },
  {
    name: '$250 Food & Beverage Credit',
    description: '$250 to spend on food & drinks during your stay.'
  }
]

function Tier4Perks() {
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

export default Tier4Perks;