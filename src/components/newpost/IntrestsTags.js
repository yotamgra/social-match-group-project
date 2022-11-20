import * as React from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function IntrestsTags() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Intrests</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => {
            console.log(option);
            return (
              <StyledTag
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            );
          })}

          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films =
  "3D printing|Acroyoga|Acting|Action figure|Aerospace|Air hockey|Air sports|Aircraft spotting|Airsoft|Amateur Radio|Amateur astronomy|Amateur geology|Amusement park visiting|Animal fancy|Animation|Anime|Ant-keeping|Antiquing|Antiquities|Aquascaping|Archaeology|Archery|Architecture|Art|Art collecting|Association football|Astrology|Astronomy|Audiophile|Australian rules football|Auto audiophilia|Auto detailing|Auto racing|Automobilism|Axe throwing|BASE jumping|BMX|Backgammon|Backpacking|Badminton|Baking|Ballet dancing|Ballroom dancing|Barbershop Music|Bartending|Baseball|Basket weaving|Basketball|Baton twirling|Beach volleyball|Beachcombing|Beatboxing|Beauty pageant|Beekeeping|Beer tasting|Bell ringing|Benchmarking|Billiards|Binge watching|Biology|Birdwatching|Blacksmith|Blacksmithing|Blogging|Board sports|Board/tabletop games|Bodybuilding|Bonsai|Book collecting|Book discussion club|Book folding|Book restoration|Botany|Bowling|Boxing|Brazilian jiu-jitsu|Breadmaking|Breakdancing|Bridge|Building|Bullet journaling|Bus riding|Bus spotting|Business|Butchering|Butterfly watching|Button collecting|Calligraphy|Camping|Candle making|Candy making|Canoeing|Canyoning|Car fixing & building|Car riding|Car spotting|Car tuning|Card games|Cardistry|Carrier pigeons|Cartophily|Caving|Ceramics|Chat|Checkers (draughts)|Cheerleading|Cheesemaking|Chemistry|Chess|City trip|Cleaning|Climbing|Clothesmaking|Coffee roasting|Coin collecting|Collecting|Color guard|Coloring|Comic book collecting|Communication|Community Radio|Community activism|Compact discs|Composting|Computer programming|Confectionery|Conlanging|Construction|Cooking|Cornhole|Cosplaying|Couponing|Craft|Creative writing|Cribbage|Cricket|Crocheting|Croquet|Cross-stitch|Crossword puzzles|Cryptography|Crystals|Cue sports|Curling|Cycling|DJing|Dairy Farming|Dance|Dancing|Dandy|Darts|Debate|Decorating|Decorative birds|Deltiology|Die-cast toy|Digital art|Digital hoarding|Dining|Diorama|Disc golf|Distro Hopping|Diving|Djembe|Do it yourself|Dodgeball|Dog sport|Dog training|Dog walking|Dolls|Dominoes|Dowsing|Drama|Drawing|Driving|Eating|Editing|Electronic games|Electronics|Element collecting|Embroidery|Engraving|Entertaining|Entrepreneurship|Ephemera collecting|Equestrianism|Esports|Everyday carry|Exhibition drill|Experimenting|Fantasy sport|Farming|Fashion|Fashion design|Fencing|Feng shui decorating|Field hockey|Figure Skating|Figure skating|Filmmaking|Films|Finance|Fingerpainting|Fingerprint collecting|Fishfarming|Fishing|Fishkeeping|Fitness|Flag football|Flower arranging|Flower collecting and pressing|Flower growing|Fly tying|Flying|Flying disc|Flying model planes|Footbag|Foraging|Foreign language learning|Fossicking|Fossil hunting|Freestyle football|Frisbee|Fruit picking|Furniture building|Fusilately|Gaming|Gardening|Genealogy|Geocaching|Geography|Ghost hunting|Gingerbread house making|Giving advice|Glassblowing|Go|Gold prospecting|Golf|Gongfu tea|Gongoozling|Graffiti|Graphic design|Groundhopping|Guerrilla gardening|Gunsmithing|Gymnastics|Hacking|Hairstyle|Handball|Hardware|Herbalism|Herp keeping|Herping|High-power rocketry|Hiking|History|Hobby horsing|Hobby tunneling|Home improvement|Homebrewing|Homing pigeons|Hooping|Horseback riding|Horsemanship|Horseshoes|Hula hooping|Hunting|Hydroponics|Ice hockey|Ice skating|Iceboat racing|Inline skating|Insect collecting|Inventing|Jewelry making|Jigsaw puzzle|Jogging|Journaling|Judo|Juggling|Jujitsu|Jukskei|Jumping rope|Kabaddi|Karaoke|Karate|Kart racing|Karting|Kayaking|Kendama|Kite flying|Kitesurfing|Knife collecting|Knife making|Knife throwing|Knitting|Knot tying|Knowledge/word games|Kombucha brewing|Kung fu|LARPing|Lace making|Lacrosse|Lapel pins|Lapidary|Laser tag|Learning|Leather crafting|Leaves|Lego building|Letterboxing|Life science|Linguistics|Listening to music|Listening to podcasts|Literature|Livestreaming|Lock picking|Lomography|Long-distance running|Longboarding|Lotology|Machining|Macrame|Magic|Magnet fishing|Mahjong|Makeup|Manga|Marbles|Marching band|Martial arts|Massaging|Mathematics|Mazes (indoor/outdoor)|Mechanics|Medical science|Meditation|Memory training|Metal detecting|Metalworking|Meteorology|Microbiology|Microscopy|Mineral collecting|Mini Golf|Miniature art|Minimalism|Model United Nations|Model aircraft|Model building|Model engineering|Modeling|Motor sports|Motorcycling|Mountain biking|Mountaineering|Movie memorabilia collecting|Museum visiting|Mushroom hunting|Music|Mycology|Nail art|Needlepoint|Netball|Neuroscience|Noodling|Nordic skating|Orienteering|Origami|Paintball|Painting|Paragliding|Parkour|Pen Spinning|People-watching|Performance|Perfume|Pet sitting|Philately|Phillumeny|Philosophy|Photography|Physics|Pickleball|Picnicking|Pilates|Pinball|Pipes|Planning|Plastic art|Playing musical instruments|Podcast hosting|Poetry|Poi|Poker|Pole dancing|Polo|Pool|Postcrossing|Pottery|Powerboat racing|Powerlifting|Practical jokes|Pressed flower craft|Proofreading and editing|Proverbs|Psychology|Public speaking|Public transport riding|Puppetry|Puzzle|Pyrography|Qigong|Quidditch|Quilling|Quilting|Quizzes|Race walking|Racquetball|Radio-controlled car racing|Radio-controlled model collecting|Radio-controlled model playing|Rafting|Rail transport modeling|Rail transport modelling|Railway journeys|Railway modelling|Railway studies|Rappelling|Rapping|Reading|Recipe creation|Record collecting|Refinishing|Reiki|Renaissance fair|Renovating|Research|Reviewing Gadgets|Road biking|Robot combat|Rock balancing|Rock climbing|Rock painting|Rock tumbling|Role-playing games|Roller derby|Roller skating|Roundnet|Rubik's Cube|Rugby|Rugby league football|Rughooking|Running|Safari|Sailing|Sand art|Satellite watching|Science and technology studies|Scouting|Scrapbooking|Scuba Diving|Scuba diving|Sculling|Sculpting|Scutelliphily|Sea glass collecting|Seashell collecting|Sewing|Shitposting|Shoemaking|Shoes|Shogi|Shooting|Shooting sports|Shopping|Shortwave listening|Shuffleboard|Singing|Skateboarding|Sketching|Skiing|Skimboarding|Skipping rope|Skydiving|Slacklining|Sled|Sled dog racing|Slot car|Slot car racing|Snorkeling|Snowboarding|Snowmobiling|Snowshoeing|Soapmaking|Soccer|Social media|Social studies|Sociology|Softball|Speed skating|Speedcubing|Speedrunning|Sport stacking|Sports memorabilia|Sports science|Spreadsheets|Squash|Stamp collecting|Stand-up comedy|Stone collecting|Stone skipping|Storm chasing|Story writing|Storytelling|Stretching|String Figures|Stripping|Stuffed toy collecting|Sudoku|Sun bathing|Surfing|Survivalism|Swimming|Table football|Table tennis|Table tennis playing|Taekwondo|Tai chi|Talking|Tapestry|Tarot|Tattoo|Taxidermy|Tea bag collecting|Teaching|Telling jokes|Tennis|Tennis polo|Tether car|Thrifting|Thru-hiking|Ticket collecting|Topiary|Tour skating|Tourism|Trade fair visiting|Trainspotting|Transit map collecting|Trapshooting|Travel|Triathlon|Ultimate frisbee|Unicycling|Upcycling|Urban exploration|VR gaming|Vacation|Vegetable farming|Vehicle restoration|Video editing|Video game collecting|Video game developing|Video gaming|Video making|Videography|Vintage cars|Vintage clothing|Vinyl records|Volleyball|Volunteering|Walking|Wargaming|Watch making|Watching documentaries|Watching movies|Watching television|Water polo|Water sports|Wax sealing|Waxing|Weaving|Web design|Webtoon|Weight training|Weightlifting|Welding|Whale watching|Whittling|Wikipedia editing|Wikipedia racing/Wikiracing|Wine tasting|Winemaking|Witchcraft|Wood carving|Woodworking|Word searches|Worldbuilding|Wrestling|Writing|Writing music|Yo-yoing|Yoga|Zoo visiting|Zumba".split(
    "|"
  );