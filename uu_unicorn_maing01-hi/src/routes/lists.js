//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import RouteBar from "../core/route-bar.js";
import Config from "./config/config.js";
import { useJokes } from "../bricks/context-list.js";
import ListsView from "../bricks/lists/lists-view.js";
import CreateListView from "../bricks/lists/create-list-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
padding: 16px;
    max-width: 1200px;
    margin: auto;

    .create-list-view {
      margin-bottom: 24px;
      padding: 16px;
      border-bottom: 1px solid #ccc;
    }

    .lists-view {
      margin-top: px;
      // Ensure the width is flexible
      width: 100%;

      @media (max-width: 768px) {
        padding: 8px;
        // Adjust layout for smaller screens
      }
    }

    // Additional media query for very small screens
    @media (max-width: 480px) {
      .lists-view {
        // Further adjustments for smaller devices
      }
    }
  `,
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Lists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    const { jokeDataList, remove, update } = useJokes();
    //console.log(currentListId);
    return (
      <>
        <RouteBar />
        <div className={Css.main()}>
          <div className="create-list-view"></div>
          <h2>Lists</h2>
          <div className="lists-view">
            <ListsView />
          </div>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

Lists = withRoute(Lists, { authenticated: true });

//@@viewOn:exports
export { Lists };
export default Lists;
//@@viewOff:exports
