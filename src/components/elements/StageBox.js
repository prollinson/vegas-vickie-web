import {useState} from 'react';

function StageBox({allStages}) {
  
  const nextStageAfter = (stageNum) => {
    const nextStage = allStages.find(stage => stage.stage == stageNum + 1);
    return nextStage;
  };

  const stageDescription = (stage) => {
    const now = new Date().getTime() / 1000;
    if(now < stage.startTime) {
      return 'Starts at ' + new Date(stage.startTime * 1000).toLocaleString();
    }
    
    let stageEnds = nextStageAfter(stage.stage) && nextStageAfter(stage.stage).startTime;
    if(stageEnds < now) {
      return 'Mint Complete';
    }

    return 'Currently Minting';
  }

  const stageStatus = (stage) => {
    const now = new Date().getTime() / 1000;
    if(now < stage.startTime) {
      return '';
    }
    
    let stageEnds = nextStageAfter(stage.stage) && nextStageAfter(stage.stage).startTime;
    if(stageEnds < now) {
      return 'Done';
    }

    return 'Live';
  }

  return (
    <div className="p-10">
      <h1 className="font-display uppercase text-white text-xl font-bold pb-4">Sale Stages</h1>

      <ul>
        { allStages.map(stage => (
          <li key={stage.stage} className="flex justify-items-start justify-start content-start">
            <div className='flex justify-center pl-10 pr-10'>
              <div className='flex w-1 h-full bg-stone-900 relative'>
                <span className={`absolute text-sm py-1 px-3 rounded-full top-0 left-1/2 -translate-x-1/2 font-display uppercase font-bold ${stageStatus(stage) === 'Live' ? 'bg-green-600 text-white' : 'bg-stone-900 text-stone-400'}`}>{stageStatus(stage)}</span>
              </div>
            </div>
            <div className="flex flex-col pb-6">
              <p className={`font-display uppercase text-white text-lg font-bold ${stageStatus(stage) === 'Done' ? 'line-through text-stone-500' : ''}`}>{stage.name} {stage.minimumRequiredTier && (<>(Tier {stage.minimumRequiredTier})</>)}</p>
              <p className={`font-gilroy text-white text-md mt-0 ${stageStatus(stage) === 'Done' ? 'line-through text-stone-500' : ''}`}>{stageDescription(stage)}</p>
            </div>
          </li>
        ))}
          <li key="last" className="flex justify-items-start justify-start content-start">
            <div className='flex justify-center pl-10 pr-10'>
              <div className='flex w-1 h-full relative'>
                <span className={`absolute text-stone-400 text-sm bg-stone-900 py-1 px-3 rounded-full top-0 left-1/2 -translate-x-1/2 font-display uppercase font-bold min-h-5`}>&nbsp;</span>
              </div>
            </div>
            <div className="flex flex-col pb-6">
              <p className="font-display uppercase text-white text-lg font-bold">Sale Closed</p>
              <p className="font-gilroy text-white text-md">Minting Closed</p>
            </div>
          </li>
      </ul>
{/* 
      { !currentStage() && (
        <p>Sale will start {nextStage().startTime.toString()}</p>
      )} */}
    </div> 
  )
}

export default StageBox;