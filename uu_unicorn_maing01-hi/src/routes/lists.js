//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import RouteBar from "../core/route-bar.js";
import Config from "./config/config.js";
import { useJokes } from "../bricks/list-context.js";
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
    margin-top: 12px;
    margin-bottom: 24px;
    display: flex;
  }

  .lists-view {
    margin-top: px;
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
    const { remove, update, create } = useJokes();
    //console.log(currentListId);
    return (
      <>
        <RouteBar />
        <div className={Css.main()}>
          <div className="create-list-view">
            <CreateListView onCreate={create} />
          </div>
          <div className="lists-view">
            <ListsView onDelete={remove} onUpdate={update} />
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
