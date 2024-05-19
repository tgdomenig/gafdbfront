import { VideoLink } from "../../models";

export type ConcoursConfig = {
  Show: {
    Candidates?: boolean;
    Jury?: boolean;
    Schedule?: boolean;
    Prizes?: boolean;
    RoundOne?: boolean;
    RoundTwo?: boolean;
    RoundThree?: boolean;
    RoundFour?: boolean;
    LiveStream?: boolean;
    ShortPosts?: boolean;
    VotingScreen?: boolean;
    PerformancesBrowser?: boolean;
    PrizeWinner?: boolean;
  };
  LiveVideoLink: VideoLink;
  CurrentRound: string;
  CurrentSession: string;
};
