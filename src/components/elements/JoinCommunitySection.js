import discordLogo from '../../assets/discord-logo.svg';
import twitterLogo from '../../assets/twitter-logo.svg';

function JoinCommunitySection ({name, description, nftImage, availableText, perks, mintPrice, maxSupply, actionBox, bgPattern}) {

  let discordLink = 'https://discord.com/invite/vegasvickienft';
  let twitterLink = 'https://twitter.com/VegasVickie';

  let sectionHeading = "text-2xl sm:text-3xl text-white font-bold tracking-widest uppercase sm:text-center";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className={`col-span-12 ${bgPattern ? 'bg-center bg-pattern bg-center' : ''} py-16 sm:py-24 border-t border-[#1E1708]`}>
      <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:flex-col md:items-center md:justify-center md:align-start">
        <h2 className={sectionHeading}>Keep up-to-date &amp; Join Fellow Fans</h2>
        <p className={`${bodyTextSmall} pt-1`}>Follow &amp; Join the community so you don't miss out on mint information, allow list spots and giveaways.</p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-row flex-initial mt-10 justify-center mt-4 sm:mt-8 space-x-4">
        <p></p>
        <div className="flex flex-row flex-initial items-center space-x-4">
          <a href={discordLink} className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Join the Community</a>
          <a href={discordLink} className="block w-fit p-3 rounded-full bg-[#5865F2] aspect-square flex justify-center items-center">
            <img src={discordLogo} alt="Discord Logo" className="w-8"/>
          </a>
          <a href={twitterLink} className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
            <img src={twitterLogo} alt="Twitter logo" className="w-8"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunitySection;